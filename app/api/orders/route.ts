import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/orders - Get user's orders
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { data: orders, error } = await supabase
    .from('Order')
    .select(`
      *,
      items:OrderItem(*),
      payment:Payment(*)
    `)
    .eq('customerId', user.id)
    .order('createdAt', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ orders })
}

// POST /api/orders - Create order (checkout)
export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const { items, shippingAddress, shippingMethod } = body
  
  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
  }
  
  // Group items by brand
  const itemsByBrand: Record<string, typeof items> = {}
  
  for (const item of items) {
    if (!itemsByBrand[item.brandId]) {
      itemsByBrand[item.brandId] = []
    }
    itemsByBrand[item.brandId].push(item)
  }
  
  // Calculate totals
  let subtotal = 0
  for (const item of items) {
    subtotal += item.price * item.quantity
  }
  
  const shippingCost = shippingMethod === 'express' ? 9.99 : 4.99
  const taxAmount = subtotal * 0.21 // 21% VAT
  const total = subtotal + shippingCost + taxAmount
  
  // Generate order number
  const orderNumber = `NEF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  
  // Create order
  const { data: order, error } = await supabase
    .from('Order')
    .insert({
      orderNumber,
      customerId: user.id,
      subtotal,
      shippingCost,
      taxAmount,
      total,
      shippingAddress,
      shippingMethod,
      status: 'PENDING',
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Create order items
  for (const item of items) {
    await supabase.from('OrderItem').insert({
      orderId: order.id,
      productId: item.productId,
      productName: item.name,
      productImage: item.imageUrl,
      variantId: item.variantId,
      brandId: item.brandId,
      brandName: item.brandName,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
    })
  }
  
  // In production, create Stripe payment intent here
  
  return NextResponse.json({ 
    order,
    clientSecret: 'pi_demo_secret' // In production, from Stripe
  })
}
