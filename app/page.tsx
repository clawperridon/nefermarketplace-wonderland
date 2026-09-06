import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center" style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,108,0.1)' }}>
        <Link href="/" className="font-display text-xl font-bold tracking-[0.25em]" style={{ color: '#FAF8F5', fontFamily: 'Syne, sans-serif' }}>NEFER</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#FAF8F5', opacity: 0.7 }}>Shop</Link>
          <Link href="/brands" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#FAF8F5', opacity: 0.7 }}>Brands</Link>
          <Link href="/collections" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#FAF8F5', opacity: 0.7 }}>Collections</Link>
          <Link href="/brand/onboarding" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#C9A86C' }}>For Sellers</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/saved" className="text-xs" style={{ color: '#FAF8F5' }}>Saved</Link>
          <Link href="/checkout" className="relative">
            <span style={{ color: '#FAF8F5', fontSize: '12px' }}>Cart</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(180deg, #0A0A0A 0%, #1a1512 50%, #0A0A0A 100%)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(201,168,108,0.15) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(201,168,108,0.1) 0%, transparent 40%)',
        }} />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: '#C9A86C' }}>Curated Fashion</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6" style={{ color: '#FAF8F5', fontFamily: 'Syne, sans-serif', lineHeight: 0.95 }}>
            New Season.<br/>
            <em style={{ fontStyle: 'italic', color: '#C9A86C' }}>New You.</em>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#FAF8F5', opacity: 0.6 }}>
            Discover the latest arrivals from the world's most exciting emerging designers.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase" style={{ 
              background: 'linear-gradient(135deg, #C9A86C 0%, #a88a54 100%)', 
              color: '#0A0A0A',
              boxShadow: '0 4px 20px rgba(201,168,108,0.3)'
            }}>
              Shop Now
            </Link>
            <Link href="/brands" className="px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase" style={{ 
              border: '1px solid rgba(201,168,108,0.3)', 
              color: '#FAF8F5' 
            }}>
              Explore Brands
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: 'rgba(201,168,108,0.3)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: '#C9A86C' }} />
          </div>
        </div>
      </section>

      {/* Featured Section - Color Cards */}
      <section className="py-24 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Terracotta */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #C4846A 0%, #a86b52 100%)' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest mb-2 text-white/70">Discover</p>
                <h3 className="font-display text-2xl text-white">Emerging<br/>Designers</h3>
                <Link href="/brands" className="mt-4 text-sm text-white/80 underline underline-offset-4">Explore →</Link>
              </div>
            </div>
            
            {/* Card 2 - Gold */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #C9A86C 0%, #a88a54 100%)' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest mb-2 text-black/50">New</p>
                <h3 className="font-display text-2xl text-black">Spring<br/>Collection</h3>
                <Link href="/marketplace" className="mt-4 text-sm text-black/70 underline underline-offset-4">Shop Now →</Link>
              </div>
            </div>
            
            {/* Card 3 - Deep */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #0A0A0A 100%)' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest mb-2 text-white/50">Join</p>
                <h3 className="font-display text-2xl text-white">Become a<br/>Seller</h3>
                <Link href="/brand/onboarding" className="mt-4 text-sm text-white/70 underline underline-offset-4">Apply →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 text-center" style={{ background: '#C9A86C' }}>
        <h2 className="font-display text-4xl mb-4" style={{ color: '#0A0A0A' }}>Ready to discover?</h2>
        <p className="mb-8 text-lg" style={{ color: '#0A0A0A', opacity: 0.7 }}>Join thousands of fashion-forward individuals</p>
        <Link 
          href="/signup" 
          className="inline-block px-10 py-4 text-sm font-semibold uppercase tracking-widest"
          style={{ background: '#0A0A0A', color: '#FAF8F5' }}
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,108,0.1)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-display text-xl font-bold tracking-[0.2em]" style={{ color: '#FAF8F5' }}>
            NEFER
          </Link>
          <div className="flex gap-8">
            <Link href="/legal/terms" className="text-xs" style={{ color: '#FAF8F5', opacity: 0.5 }}>Terms</Link>
            <Link href="/legal/privacy" className="text-xs" style={{ color: '#FAF8F5', opacity: 0.5 }}>Privacy</Link>
            <Link href="/help" className="text-xs" style={{ color: '#FAF8F5', opacity: 0.5 }}>Help</Link>
          </div>
          <p className="text-xs" style={{ color: '#FAF8F5', opacity: 0.3 }}>© 2026 NEFER</p>
        </div>
      </footer>
    </div>
  );
}
