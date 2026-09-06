import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F1EA' }}>
      {/* Document Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between px-8 py-6" style={{ background: '#F5F1EA' }}>
        <span className="text-xs font-medium tracking-[0.25em]" style={{ color: '#1E3A5F' }}>BRAND SYSTEM & UI CONCEPT</span>
        <span className="text-xs font-medium tracking-[0.25em]" style={{ color: '#1E3A5F', opacity: 0.6 }}>DOCUMENT V1.0 · SEPTEMBER 2026</span>
      </header>

      {/* Main Content - Centered */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Card - Full width, rounded corners */}
          <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden" style={{ 
            background: 'linear-gradient(135deg, #1E3A5F 0%, #2E4A6F 20%, #8B9DC3 40%, #E8B4B8 60%, #F5C4A0 80%, #F5E6C8 100%)'
          }}>
            {/* Celestial Orb - Top Right */}
            <div className="absolute top-12 right-12 w-40 h-40 md:w-56 md:h-56 rounded-full" style={{ 
              background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.5) 30%, rgba(150,180,220,0.2) 60%, transparent 70%)',
              boxShadow: '0 0 80px rgba(255,255,255,0.5), inset 0 0 30px rgba(255,255,255,0.3)'
            }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-12 md:p-16">
              <div className="flex-1 flex flex-col justify-center">
                {/* NEFER Wordmark */}
                <h1 className="font-display text-7xl md:text-9xl font-bold tracking-tight" style={{ 
                  color: '#FFFFFF',
                }}>
                  NEFER
                </h1>
                
                {/* Tagline */}
                <p className="mt-8 text-3xl md:text-5xl font-display leading-tight" style={{ color: '#FFFFFF' }}>
                  Show me something<br/>
                  <em style={{ fontStyle: 'italic' }}>you don't know yet.</em>
                </p>
              </div>
              
              {/* Dutch Text */}
              <p className="text-base md:text-lg max-w-lg" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Een visuele uitwerking van het merksysteem: wereld, kleur, typografie, grafische taal, motion en UI — klaar om mee te bouwen.
              </p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="mt-8 flex flex-wrap gap-8 md:gap-12">
            <Link href="/marketplace" className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: '#1E3A5F' }}>
              Shop →
            </Link>
            <Link href="/brands" className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.5 }}>
              Brands
            </Link>
            <Link href="/collections" className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.5 }}>
              Collections
            </Link>
            <Link href="/brand/onboarding" className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>
              For Sellers
            </Link>
          </nav>
        </div>
      </main>

      {/* Color Palette Section */}
      <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: '#1E3A5F', opacity: 0.5 }}>02 Colour</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#1E3A5F' }}>
              <span className="text-white text-sm font-medium">Deep Navy</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#8B9DC3' }}>
              <span className="text-white text-sm font-medium">Periwinkle</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#E8B4B8' }}>
              <span className="text-sm font-medium" style={{ color: '#1E3A5F' }}>Soft Pink</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#F5C4A0' }}>
              <span className="text-sm font-medium" style={{ color: '#1E3A5F' }}>Peach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-24 px-6" style={{ background: '#F5F1EA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#D4AF37' }}>03 Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6" style={{ color: '#1E3A5F' }}>
            Ready to explore?
          </h2>
          <p className="text-lg mb-10" style={{ color: '#1E3A5F', opacity: 0.7 }}>
            Discover emerging designers from around the world
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/marketplace" 
              className="px-10 py-4 text-sm font-semibold uppercase tracking-widest rounded-full"
              style={{ background: '#1E3A5F', color: '#FFFFFF' }}
            >
              Explore Now
            </Link>
            <Link 
              href="/brand/onboarding" 
              className="px-10 py-4 text-sm font-semibold uppercase tracking-widest rounded-full border-2"
              style={{ borderColor: '#1E3A5F', color: '#1E3A5F' }}
            >
              Join as Brand
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-display text-xl font-bold tracking-[0.2em]" style={{ color: '#FFFFFF' }}>NEFER</span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
