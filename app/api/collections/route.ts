import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/collections - List collections
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  
  const featured = searchParams.get('featured') === 'true'
  const limit = parseInt(searchParams.get('limit') || '20')
  
  let query = supabase
    .from('Collection')
    .select('*')
    .eq('status', 'PUBLISHED')
    .order('position', { ascending: true })
    .limit(limit)
  
  if (featured) {
    query = query.eq('isFeatured', true)
  }
  
  const { data: collections, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Get products for each collection
  const collectionsWithProducts = await Promise.all(
    collections.map(async (collection) => {
      const { data: products } = await supabase
        .from('CollectionProduct')
        .select(`
          product:Product(
            id, name, slug, price, "imageUrl",
            brand:Brand(name, slug)
          )
        `)
        .eq('collectionId', collection.id)
        .limit(8)
      
      return {
        ...collection,
        products: products?.map((p: any) => p.product) || []
      }
    })
  )
  
  return NextResponse.json({ collections: collectionsWithProducts })
}
