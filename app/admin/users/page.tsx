import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'



export default async function AdminUsersPage() {
  const supabase = await createClient()
  // Get current user
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Check if admin
  const { data: currentUser } = await supabase
    .from('User')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  if (currentUser?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get all users
  const { data: users } = await supabase
    .from('User')
    .select(`
      *,
      brandProfile:BrandProfile(brandName)
    `)
    .order('createdAt', { ascending: false })

  return (
    <div className="min-h-screen" style={{ background: '#F8F5ED' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold" style={{ color: '#1A2B3C' }}>
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all registered users
          </p>
        </div>

        {/* Users Table */}
        {users && users.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Brand</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{user.email}</span>
                      {user.id === session.user.id && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                          You
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                        user.role === 'BRAND' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role || 'CONSUMER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.brandProfile?.[0]?.brandName || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}
