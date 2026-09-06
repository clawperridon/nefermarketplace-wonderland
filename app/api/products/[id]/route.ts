import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/products/[id] - Get single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params
  
  const { data: product, error } = await supabase
    .from('Product')
    .select(`
      *,
      brand:Brand(id, name, slug, logoUrl, coverImageUrl, description),
      category:Category(name, slug),
      images:ProductImage(url, altText, position),
      variants:ProductVariant(id, sku, size, color, price, isActive)
    `)
    .eq('id', id)
    .eq('isActive', true)
    .single()
  
  if (error || !product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  
  // Get inventory for variants
  if (product.variants?.length) {
    const variantIds = product.variants.map((v: any) => v.id)
    const { data: inventory } = await supabase
      .from('Inventory')
      .select('*')
      .in('variantId', variantIds)
    
    if (inventory) {
      product.variants = product.variants.map((v: any) => ({
        ...v,
        inventory: inventory.find((inv) => inv.variantId === v.id) || null
      }))
    }
  }
  
  return NextResponse.json({ product })
}

// PUT /api/products/[id] - Update product (brand only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
  
  // Verify ownership
  const { data: product } = await supabase
    .from('Product')
    .select('brandId')
    .eq('id', id)
    .single()
  
  if (!product || product.brandId !== brand.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const body = await request.json()
  
  const { data: updated, error } = await supabase
    .from('Product')
    .update(body)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ product: updated })
}

// DELETE /api/products/[id] - Delete product (brand only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
  
  // Verify ownership
  const { data: product } = await supabase
    .from('Product')
    .select('brandId')
    .eq('id', id)
    .single()
  
  if (!product || product.brandId !== brand.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const { error } = await supabase
    .from('Product')
    .delete()
    .eq('id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
