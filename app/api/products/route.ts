import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/products - List products
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  
  const brandId = searchParams.get('brandId')
  const categoryId = searchParams.get('categoryId')
  const featured = searchParams.get('featured') === 'true'
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  let query = supabase
    .from('Product')
    .select(`
      *,
      brand:Brand(name, slug, logoUrl),
      category:Category(name, slug),
      images:ProductImage(url, position)
    `)
    .eq('status', 'APPROVED')
    .eq('isActive', true)
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (brandId) {
    query = query.eq('brandId', brandId)
  }
  
  if (categoryId) {
    query = query.eq('categoryId', categoryId)
  }
  
  if (featured) {
    query = query.eq('isFeatured', true)
  }
  
  const { data: products, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ products })
}

// POST /api/products - Create product (brand only)
export async function POST(request: Request) {
  const supabase = await createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check brand role
  const { data: userData } = await supabase
    .from('User')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (userData?.role !== 'BRAND' && userData?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Get user's brand
  const { data: brand } = await supabase
    .from('Brand')
    .select('id')
    .eq('userId', user.id)
    .single()
  
  if (!brand) {
    return NextResponse.json({ error: 'No brand found' }, { status: 400 })
  }
  
  const body = await request.json()
  
  const { data: product, error } = await supabase
    .from('Product')
    .insert({
      ...body,
      brandId: brand.id,
      status: 'PENDING_REVIEW',
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ product })
}
