import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function BrandProducts() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return <div>Please log in</div>
  }
  
  // Get brand
  const { data: brand } = await supabase
    .from('Brand')
    .select('*')
    .eq('userId', user.id)
    .single()
  
  if (!brand) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h1 className="font-display text-2xl mb-4" style={{ color: '#0A0A0A' }}>Products</h1>
        <p className="mb-6" style={{ color: '#5D5E61' }}>You need to set up your brand first.</p>
        <Link href="/brand/onboarding" className="btn btn-primary">
          Create Your Brand
        </Link>
      </div>
    )
  }
  
  // Get products
  const { data: products } = await supabase
    .from('Product')
    .select('*')
    .eq('brandId', brand.id)
    .order('createdAt', { ascending: false })
  
  // Get stats
  const { count: activeCount } = await supabase
    .from('Product')
    .select('*', { count: 'exact', head: true })
    .eq('brandId', brand.id)
    .eq('isActive', true)
  
  const { count: pendingCount } = await supabase
    .from('Product')
    .select('*', { count: 'exact', head: true })
    .eq('brandId', brand.id)
    .eq('status', 'PENDING_REVIEW')
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>
            Products
          </h1>
          <p style={{ color: '#5D5E61' }}>Manage your product catalog</p>
        </div>
        <Link href="/brand/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Total</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#0A0A0A' }}>{products?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Active</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#22C55E' }}>{activeCount || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Pending Review</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#F59E0B' }}>{pendingCount || 0}</p>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Product</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Price</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Status</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Featured</th>
              <th className="text-right px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span style={{ color: '#5D5E61' }}>📦</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium" style={{ color: '#0A0A0A' }}>{product.name}</p>
                        <p className="text-sm" style={{ color: '#5D5E61' }}>{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium" style={{ color: '#0A0A0A' }}>€{product.price}</p>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <p className="text-sm line-through" style={{ color: '#5D5E61' }}>€{product.compareAtPrice}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      product.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                      product.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.isFeatured ? (
                      <span style={{ color: '#C9A86C' }}>★</span>
                    ) : (
                      <span style={{ color: '#D1D5DB' }}>☆</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/brand/products/${product.id}`} className="text-sm mr-3" style={{ color: '#C9A86C' }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center" style={{ color: '#5D5E61' }}>
                  <p className="mb-2">No products yet</p>
                  <Link href="/brand/products/new" className="text-sm" style={{ color: '#C9A86C' }}>
                    + Add your first product
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
