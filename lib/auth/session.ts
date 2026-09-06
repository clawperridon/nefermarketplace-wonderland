import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export type UserRole = 'CUSTOMER' | 'BRAND' | 'ADMIN'

export interface SessionUser {
  id: string
  email: string
  role: UserRole
  brandId?: string
  brandSlug?: string
}

// Get current user from session
export async function getSession(): Promise<SessionUser | null> {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  // Get user metadata including role
  const { data: userData } = await supabase
    .from('User')
    .select('id, email, role')
    .eq('id', user.id)
    .single()
  
  if (!userData) {
    return null
  }
  
  // If BRAND role, get their brand
  let brandId: string | undefined
  let brandSlug: string | undefined
  
  if (userData.role === 'BRAND') {
    const { data: brand } = await supabase
      .from('Brand')
      .select('id, slug')
      .eq('userId', user.id)
      .single()
    
    if (brand) {
      brandId = brand.id
      brandSlug = brand.slug
    }
  }
  
  return {
    id: userData.id,
    email: userData.email,
    role: userData.role as UserRole,
    brandId,
    brandSlug,
  }
}

// Check if user has specific role
export async function requireRole(roles: UserRole[]): Promise<SessionUser> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  if (!roles.includes(session.role)) {
    throw new Error('Forbidden')
  }
  
  return session
}

// Check if user can access brand data
export async function canAccessBrand(brandId: string): Promise<boolean> {
  const session = await getSession()
  
  if (!session) return false
  if (session.role === 'ADMIN') return true
  if (session.role === 'BRAND' && session.brandId === brandId) return true
  
  return false
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const session = await getSession()
  return session?.role === 'ADMIN'
}

// Middleware helper for route protection
export async function authGuard(requiredRoles: UserRole[]) {
  const session = await getSession()
  
  if (!session) {
    return { authorized: false, reason: 'not_authenticated' }
  }
  
  if (!requiredRoles.includes(session.role)) {
    return { authorized: false, reason: 'forbidden' }
  }
  
  return { authorized: true, session }
}
