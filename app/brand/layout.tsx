import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/brand-login')
  }
  
  // Get user role
  const { data: userData } = await supabase
    .from('User')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (userData?.role !== 'BRAND' && userData?.role !== 'ADMIN') {
    redirect('/discover')
  }
  
  // Get brand info
  const { data: brand } = await supabase
    .from('Brand')
    .select('id, name, slug, status')
    .eq('userId', user.id)
    .single()
  
  if (!brand) {
    // No brand yet - redirect to onboarding
    redirect('/brand/onboarding')
  }
  
  const menuItems = [
    { href: '/brand/dashboard', label: 'Dashboard', icon: '◫' },
    { href: '/brand/products', label: 'Products', icon: '▤' },
    { href: '/brand/orders', label: 'Orders', icon: '◳' },
    { href: '/brand/analytics', label: 'Analytics', icon: '◉' },
    { href: '/brand/profile', label: 'Profile', icon: '◐' },
    { href: '/brand/settings', label: 'Settings', icon: '⚙' },
  ]
  
  return (
    <div className="min-h-screen" style={{ background: '#FAF8F5' }}>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center" 
        style={{ background: 'rgba(250,248,245,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Link href="/" className="font-display text-xl font-bold tracking-[0.2em]" style={{ color: '#0A0A0A' }}>
          NEFER
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/marketplace" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#0A0A0A', opacity: 0.6 }}>Shop</Link>
          <Link href="/brands" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#0A0A0A', opacity: 0.6 }}>Brands</Link>
          <Link href="/brand/dashboard" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#C9A86C' }}>Brand Portal</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#5D5E61' }}>Brand</p>
                <p className="font-display font-semibold truncate" style={{ color: '#0A0A0A' }}>{brand.name}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                  brand.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {brand.status}
                </span>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-[#FAF8F5]"
                    style={{ color: '#0A0A0A' }}
                  >
                    <span style={{ color: '#C9A86C' }}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
