import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/brands - List all approved brands
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  
  const featured = searchParams.get('featured') === 'true'
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  let query = supabase
    .from('Brand')
    .select('*')
    .eq('status', 'APPROVED')
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (featured) {
    query = query.eq('isFeatured', true)
  }
  
  const { data: brands, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ brands })
}
