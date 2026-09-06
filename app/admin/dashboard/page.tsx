import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Get platform stats
  const [
    brandsCount,
    productsCount,
    ordersCount,
    customersCount
  ] = await Promise.all([
    supabase.from('Brand').select('id', { count: 'exact', head: true }),
    supabase.from('Product').select('id', { count: 'exact', head: true }),
    supabase.from('Order').select('id', { count: 'exact', head: true }),
    supabase.from('User').select('id', { count: 'exact', head: true }).eq('role', 'CUSTOMER')
  ])
  
  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('Order')
    .select('*, customer:User!inner(email)')
    .order('createdAt', { ascending: false })
    .limit(5)
  
  // Get pending brands
  const { data: pendingBrands } = await supabase
    .from('Brand')
    .select('id, name, createdAt')
    .eq('status', 'PENDING')
    .order('createdAt', { ascending: false })
    .limit(3)
  
  // Get pending products
  const { data: pendingProducts } = await supabase
    .from('Product')
    .select('id, name, brand:Brand!inner(name)')
    .eq('status', 'PENDING_REVIEW')
    .order('createdAt', { ascending: false })
    .limit(5)
  
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>Admin Dashboard</h1>
        <p style={{ color: '#5D5E61' }}>Platform overview and management</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Total Brands</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {brandsCount?.count || 0}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Total Products</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {productsCount?.count || 0}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Total Orders</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {ordersCount?.count || 0}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5D5E61' }}>Customers</p>
          <p className="font-display text-4xl font-bold" style={{ color: '#0A0A0A' }}>
            {customersCount?.count || 0}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-xl" style={{ color: '#0A0A0A' }}>Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm" style={{ color: '#C9A86C' }}>View all →</Link>
          </div>
          
          {recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div>
                    <p className="font-medium" style={{ color: '#0A0A0A' }}>#{order.orderNumber}</p>
                    <p className="text-sm" style={{ color: '#5D5E61' }}>{order.customer?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium" style={{ color: '#0A0A0A' }}>€{order.total}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#5D5E61' }}>No orders yet</p>
          )}
        </div>
        
        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 className="font-display text-xl mb-4" style={{ color: '#0A0A0A' }}>Pending Approvals</h2>
          
          {/* Pending Brands */}
          {pendingBrands && pendingBrands.length > 0 && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: '#5D5E61' }}>Brands</p>
              {pendingBrands.map((brand) => (
                <div key={brand.id} className="flex justify-between items-center py-2">
                  <span style={{ color: '#0A0A0A' }}>{brand.name}</span>
                  <Link href={`/admin/brands/${brand.id}`} className="text-sm" style={{ color: '#C9A86C' }}>
                    Review →
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          {/* Pending Products */}
          {pendingProducts && pendingProducts.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: '#5D5E61' }}>Products</p>
              {pendingProducts.map((product: any) => (
                <div key={product.id} className="flex justify-between items-center py-2">
                  <span style={{ color: '#0A0A0A' }}>{product.name}</span>
                  <span className="text-sm" style={{ color: '#5D5E61' }}>by {product.brand?.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {!pendingBrands?.length && !pendingProducts?.length && (
            <p style={{ color: '#5D5E61' }}>No pending approvals</p>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/brands/new" className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="font-display text-lg" style={{ color: '#0A0A0A' }}>+ Brand</p>
        </Link>
        <Link href="/admin/collections" className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="font-display text-lg" style={{ color: '#0A0A0A' }}>Collections</p>
        </Link>
        <Link href="/admin/content" className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="font-display text-lg" style={{ color: '#0A0A0A' }}>Content</p>
        </Link>
        <Link href="/admin/analytics" className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p className="font-display text-lg" style={{ color: '#0A0A0A' }}>Analytics</p>
        </Link>
      </div>
    </div>
  )
}
