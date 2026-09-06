import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // Get user role
  const { data: userData } = await supabase
    .from('User')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (userData?.role !== 'ADMIN') {
    redirect('/discover')
  }
  
  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '◫' },
    { href: '/admin/brands', label: 'Brands', icon: '◈' },
    { href: '/admin/products', label: 'Products', icon: '▤' },
    { href: '/admin/orders', label: 'Orders', icon: '◳' },
    { href: '/admin/customers', label: 'Customers', icon: '◐' },
    { href: '/admin/collections', label: 'Collections', icon: '▦' },
    { href: '/admin/content', label: 'Content', icon: '▧' },
    { href: '/admin/analytics', label: 'Analytics', icon: '◉' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙' },
  ]
  
  return (
    <div className="min-h-screen flex" style={{ background: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0" style={{ background: '#0A0A0A', borderRight: '1px solid rgba(201,168,108,0.1)' }}>
        <div className="p-6">
          <Link href="/" className="font-display text-xl font-bold tracking-[0.2em] block mb-8" style={{ color: '#FAF8F5' }}>
            NEFER
          </Link>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
                style={{ color: 'rgba(250,248,245,0.6)' }}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/" className="text-xs" style={{ color: 'rgba(250,248,245,0.4)' }}>
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto" style={{ background: '#FAF8F5' }}>
        {children}
      </main>
    </div>
  )
}
