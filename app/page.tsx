import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F1EA' }}>
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#5D6D7E' }}>Brand System</span>
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#5D6D7E' }}>DOCUMENT V1.0 · SEPTEMBER 2026</span>
      </nav>

      {/* Main Hero - Card with Gradient */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          {/* Hero Card - Left aligned with gradient */}
          <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[3rem] overflow-hidden" style={{ 
            background: 'linear-gradient(135deg, #1E3A5F 0%, #8B9DC3 25%, #E8B4B8 50%, #F5C4A0 75%, #F5E6C8 100%)'
          }}>
            {/* Celestial Orb */}
            <div className="absolute top-8 right-8 w-32 h-32 md:w-48 md:h-48 rounded-full" style={{ 
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(200,220,255,0.3), transparent)',
              boxShadow: '0 0 60px rgba(255,255,255,0.4)'
            }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              <div>
                {/* NEFER Wordmark - Bold gradient */}
                <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight leading-none" style={{ 
                  color: '#FFFFFF',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE4EC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  NEFER
                </h1>
                
                {/* Tagline */}
                <p className="mt-6 text-xl md:text-3xl font-display" style={{ color: '#FFFFFF' }}>
                  Show me something<br/>
                  <em style={{ fontStyle: 'italic' }}>you don't know yet.</em>
                </p>
              </div>
              
              {/* Dutch description */}
              <p className="text-sm md:text-base max-w-md" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif' }}>
                Een visuele uitwerking van het merksysteem: wereld, kleur, typografie, grafische taal, motion en UI — klaar om mee te bouwen.
              </p>
            </div>
          </div>
          
          {/* Navigation Links below card */}
          <div className="mt-8 flex flex-wrap gap-6 md:gap-12">
            <Link href="/marketplace" className="text-sm tracking-[0.15em] uppercase" style={{ color: '#1E3A5F' }}>
              Shop →
            </Link>
            <Link href="/brands" className="text-sm tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.6 }}>
              Brands
            </Link>
            <Link href="/collections" className="text-sm tracking-[0.15em] uppercase" style={{ color: '#1E3A5F', opacity: 0.6 }}>
              Collections
            </Link>
            <Link href="/brand/onboarding" className="text-sm tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>
              For Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: '#5D6D7E' }}>02 Colour</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Colors from gradient */}
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#1E3A5F' }}>
              <span className="text-white text-sm">Deep Navy</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#8B9DC3' }}>
              <span className="text-white text-sm">Periwinkle</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#E8B4B8' }}>
              <span style={{ color: '#1E3A5F' }}>Soft Pink</span>
            </div>
            <div className="aspect-square rounded-2xl flex items-end p-4" style={{ background: '#F5C4A0' }}>
              <span style={{ color: '#1E3A5F' }}>Peach</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: '#F5F1EA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#D4AF37' }}>03 Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6" style={{ color: '#1E3A5F' }}>
            Ready to explore?
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#1E3A5F', opacity: 0.7 }}>
            Discover emerging designers from around the world
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/marketplace" 
              className="px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-full"
              style={{ background: '#1E3A5F', color: '#FFFFFF' }}
            >
              Explore Now
            </Link>
            <Link 
              href="/brand/onboarding" 
              className="px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-full border-2"
              style={{ borderColor: '#1E3A5F', color: '#1E3A5F' }}
            >
              Join as Brand
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ background: '#1E3A5F' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-xl font-bold tracking-[0.2em]" style={{ color: '#FFFFFF' }}>NEFER</span>
          <div className="flex gap-6">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
