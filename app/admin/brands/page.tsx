import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminBrands() {
  const supabase = await createClient()
  
  // Get all brands
  const { data: brands } = await supabase
    .from('Brand')
    .select('*, user:User(email)')
    .order('createdAt', { ascending: false })
  
  // Get counts
  const { count: pendingCount } = await supabase
    .from('Brand')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING')
  
  const { count: approvedCount } = await supabase
    .from('Brand')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'APPROVED')
  
  const { count: totalProducts } = await supabase
    .from('Product')
    .select('*', { count: 'exact', head: true })
  
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>Brands</h1>
          <p style={{ color: '#5D5E61' }}>Manage brand applications and approvals</p>
        </div>
        <Link href="/admin/brands/new" className="btn btn-primary">
          + Add Brand
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Total</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#0A0A0A' }}>{brands?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Pending</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#F59E0B' }}>{pendingCount || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Approved</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#22C55E' }}>{approvedCount || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Products</p>
          <p className="font-display text-2xl font-bold" style={{ color: '#0A0A0A' }}>{totalProducts || 0}</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2">
        <Link href="/admin/brands?status=all" className="px-4 py-2 rounded-lg bg-white text-sm">
          All
        </Link>
        <Link href="/admin/brands?status=PENDING" className="px-4 py-2 rounded-lg bg-yellow-100 text-sm" style={{ color: '#B45309' }}>
          Pending ({pendingCount || 0})
        </Link>
        <Link href="/admin/brands?status=APPROVED" className="px-4 py-2 rounded-lg bg-green-100 text-sm" style={{ color: '#15803D' }}>
          Approved
        </Link>
        <Link href="/admin/brands?status=REJECTED" className="px-4 py-2 rounded-lg bg-red-100 text-sm" style={{ color: '#B91C1C' }}>
          Rejected
        </Link>
      </div>
      
      {/* Brands Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Brand</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Owner</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Location</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Status</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Featured</th>
              <th className="text-right px-6 py-4 text-xs uppercase tracking-wider" style={{ color: '#5D5E61' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands && brands.length > 0 ? (
              brands.map((brand: any) => (
                <tr key={brand.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.name} className="w-10 h-10 object-cover rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center">
                          <span style={{ color: '#C9A86C' }}>{brand.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium" style={{ color: '#0A0A0A' }}>{brand.name}</p>
                        <p className="text-sm" style={{ color: '#5D5E61' }}>/{brand.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: '#0A0A0A' }}>{brand.user?.email || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: '#5D5E61' }}>{brand.city || '—'}{brand.country ? `, ${brand.country}` : ''}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      brand.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      brand.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      brand.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {brand.isFeatured ? (
                      <span style={{ color: '#C9A86C' }}>★</span>
                    ) : (
                      <span style={{ color: '#D1D5DB' }}>☆</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {brand.status === 'PENDING' && (
                        <form action={`/admin/api/brands/${brand.id}/approve`} method="POST">
                          <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Approve
                          </button>
                        </form>
                      )}
                      <Link href={`/admin/brands/${brand.id}`} className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50">
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center" style={{ color: '#5D5E61' }}>
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
