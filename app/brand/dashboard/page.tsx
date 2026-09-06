import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function BrandDashboard() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return <div>Please log in</div>
  }
  
  // Get brand info
  const { data: brand } = await supabase
    .from('Brand')
    .select('*')
    .eq('userId', user.id)
    .single()
  
  if (!brand) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h1 className="font-display text-2xl mb-4" style={{ color: '#0A0A0A' }}>Welcome to NEFER</h1>
        <p className="mb-6" style={{ color: '#5D5E61' }}>You haven&apos;t set up your brand yet.</p>
        <Link href="/brand/onboarding" className="btn btn-primary">
          Create Your Brand
        </Link>
      </div>
    )
  }
  
  // Get stats
  const [productsCount, ordersCount] = await Promise.all([
    supabase.from('Product').select('id', { count: 'exact', head: true }).eq('brandId', brand.id),
    supabase.from('OrderItem').select('id', { count: 'exact', head: true }).eq('brandId', brand.id)
  ])
  
  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('OrderItem')
    .select('*, order:Order!inner(orderNumber, createdAt, customer:User!inner(email))')
    .eq('brandId', brand.id)
    .order('createdAt', { ascending: false })
    .limit(5)
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>
            Welcome back, {brand.name}
          </h1>
          <p style={{ color: '#5D5E61' }}>Here&apos;s what&apos;s happening with your store.</p>
        </div>
        <Link href="/brand/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Products</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {productsCount?.count || 0}
          </p>
          <Link href="/brand/products" className="text-sm mt-2 inline-block" style={{ color: '#C9A86C' }}>
            View all →
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Orders</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {ordersCount?.count || 0}
          </p>
          <Link href="/brand/orders" className="text-sm mt-2 inline-block" style={{ color: '#C9A86C' }}>
            View all →
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Status</p>
          <p className="font-display text-4xl font-bold" style={{ color: brand.status === 'APPROVED' ? '#22C55E' : '#F59E0B' }}>
            {brand.status}
          </p>
          {brand.status !== 'APPROVED' && (
            <p className="text-sm mt-2" style={{ color: '#5D5E61' }}>
              Awaiting approval
            </p>
          )}
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h2 className="font-display text-xl mb-4" style={{ color: '#0A0A0A' }}>Recent Orders</h2>
        
        {recentOrders && recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <p className="font-medium" style={{ color: '#0A0A0A' }}>{item.productName}</p>
                  <p className="text-sm" style={{ color: '#5D5E61' }}>
                    Order #{item.order?.orderNumber} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium" style={{ color: '#0A0A0A' }}>€{item.totalPrice}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.fulfillmentStatus === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    item.fulfillmentStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.fulfillmentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#5D5E61' }}>No orders yet. Share your products to start selling!</p>
        )}
        
        <Link href="/brand/orders" className="btn btn-secondary mt-4">
          View All Orders
        </Link>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/brand/products/new" className="bg-white rounded-2xl p-6 block" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 className="font-display text-lg mb-2" style={{ color: '#0A0A0A' }}>Add New Product</h3>
          <p style={{ color: '#5D5E61' }}>List a new product in your store.</p>
        </Link>
        
        <Link href="/brand/profile" className="bg-white rounded-2xl p-6 block" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 className="font-display text-lg mb-2" style={{ color: '#0A0A0A' }}>Update Brand Profile</h3>
          <p style={{ color: '#5D5E61' }}>Edit your brand details and images.</p>
        </Link>
      </div>
    </div>
  )
}
