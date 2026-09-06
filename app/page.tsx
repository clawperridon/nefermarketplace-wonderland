import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#FDF6F0' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center" style={{ background: 'rgba(253,246,240,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <Link href="/" className="font-display text-xl font-bold tracking-[0.25em]" style={{ color: '#1E3A5F', fontFamily: 'Syne, sans-serif' }}>NEFER</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.7 }}>Shop</Link>
          <Link href="/brands" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.7 }}>Brands</Link>
          <Link href="/collections" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.7 }}>Collections</Link>
          <Link href="/brand/onboarding" className="text-xs tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>For Sellers</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/saved" className="text-xs" style={{ color: '#1E3A5F' }}>Saved</Link>
          <Link href="/checkout" className="relative">
            <span style={{ color: '#1E3A5F', fontSize: '12px' }}>Cart</span>
          </Link>
        </div>
      </nav>

      {/* Hero - Surreal Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Surreal background */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(180deg, #87CEEB 0%, #FFB5C5 50%, #FFF8DC 100%)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(152,217,130,0.4) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,160,220,0.4) 0%, transparent 50%)',
        }} />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: '#1E3A5F' }}>Discover</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6" style={{ color: '#1E3A5F', fontFamily: 'Syne, sans-serif', lineHeight: 0.95 }}>
            Show me<br/>
            <em style={{ fontStyle: 'italic', color: '#FF6B6B' }}>something new.</em>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#1E3A5F', opacity: 0.7 }}>
            A portal into emerging fashion worlds that exist just beyond the mainstream radar.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase" style={{ 
              background: '#FFB5C5', 
              color: '#1E3A5F',
              boxShadow: '0 4px 20px rgba(255,181,197,0.4)'
            }}>
              Enter the Garden
            </Link>
            <Link href="/brands" className="px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase" style={{ 
              border: '2px solid #1E3A5F', 
              color: '#1E3A5F' 
            }}>
              Explore Brands
            </Link>
          </div>
        </div>
        
        {/* Floating elements - surreal touch */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-30" style={{ background: '#98D982' }} />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-30" style={{ background: '#C9A0DC' }} />
      </section>

      {/* Featured - Color Cards */}
      <section className="py-24 px-6" style={{ background: '#FDF6F0' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-center mb-12" style={{ color: '#D4AF37' }}>Curated Selection</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Blush Pink */}
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: '#FFB5C5' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#1E3A5F', opacity: 0.6 }}>Explore</p>
                <h3 className="font-display text-3xl" style={{ color: '#1E3A5F' }}>Emerging<br/>Designers</h3>
                <Link href="/brands" className="mt-4 text-sm underline underline-offset-4" style={{ color: '#1E3A5F' }}>Discover →</Link>
              </div>
            </div>
            
            {/* Card 2 - Dream Blue */}
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: '#87CEEB' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#1E3A5F', opacity: 0.6 }}>New</p>
                <h3 className="font-display text-3xl" style={{ color: '#1E3A5F' }}>Spring<br/>Collection</h3>
                <Link href="/marketplace" className="mt-4 text-sm underline underline-offset-4" style={{ color: '#1E3A5F' }}>Shop Now →</Link>
              </div>
            </div>
            
            {/* Card 3 - Botanica Green */}
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: '#98D982' }}>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#1E3A5F', opacity: 0.6 }}>Join</p>
                <h3 className="font-display text-3xl" style={{ color: '#1E3A5F' }}>Become a<br/>Seller</h3>
                <Link href="/brand/onboarding" className="mt-4 text-sm underline underline-offset-4" style={{ color: '#1E3A5F' }}>Apply →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lavender Section */}
      <section className="py-24 px-6" style={{ background: '#F5EEF8' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A0DC' }}>The Experience</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6" style={{ color: '#1E3A5F' }}>
            Not just shopping.<br/><em style={{ fontStyle: 'italic' }}>A journey.</em>
          </h2>
          <p className="text-lg" style={{ color: '#1E3A5F', opacity: 0.7 }}>
            Every visit reveals something new. Not just new products, but new aesthetics, new narratives, new ways of seeing fashion.
          </p>
        </div>
      </section>

      {/* CTA - Coral */}
      <section className="py-20 px-6 text-center" style={{ background: '#FF6B6B' }}>
        <h2 className="font-display text-4xl mb-4" style={{ color: '#FFF8DC' }}>Ready to discover?</h2>
        <p className="mb-8 text-lg" style={{ color: '#FFF8DC', opacity: 0.8 }}>Join thousands of style explorers</p>
        <Link 
          href="/signup" 
          className="inline-block px-10 py-4 text-sm font-semibold uppercase tracking-widest"
          style={{ background: '#FFF8DC', color: '#1E3A5F' }}
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ background: '#FDF6F0', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-display text-xl font-bold tracking-[0.2em]" style={{ color: '#1E3A5F' }}>
            NEFER
          </Link>
          <div className="flex gap-8">
            <Link href="/legal/terms" className="text-xs" style={{ color: '#1E3A5F', opacity: 0.5 }}>Terms</Link>
            <Link href="/legal/privacy" className="text-xs" style={{ color: '#1E3A5F', opacity: 0.5 }}>Privacy</Link>
            <Link href="/help" className="text-xs" style={{ color: '#1E3A5F', opacity: 0.5 }}>Help</Link>
          </div>
          <p className="text-xs" style={{ color: '#1E3A5F', opacity: 0.3 }}>© 2026 NEFER</p>
        </div>
      </footer>
    </div>
  );
}
