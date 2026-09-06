import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function MarketplaceHome() {
  const supabase = await createClient()
  
  // Fetch featured brands
  const { data: brands } = await supabase
    .from('Brand')
    .select('*')
    .eq('status', 'APPROVED')
    .eq('isFeatured', true)
    .limit(8)
  
  // Fetch featured products
  const { data: products } = await supabase
    .from('Product')
    .select(`
      *,
      brand:Brand(name, slug, logoUrl)
    `)
    .eq('status', 'APPROVED')
    .eq('isActive', true)
    .eq('isFeatured', true)
    .limit(12)
  
  // Fetch collections
  const { data: collections } = await supabase
    .from('Collection')
    .select('*')
    .eq('status', 'PUBLISHED')
    .eq('isFeatured', true)
    .limit(4)
  
  // Fetch banners
  const { data: banners } = await supabase
    .from('Banner')
    .select('*')
    .eq('isActive', true)
    .limit(1)
  
  // Fetch story of the week
  const { data: story } = await supabase
    .from('StoryOfWeek')
    .select('*')
    .eq('isActive', true)
    .limit(1)
    .single()
  
  return (
    <div className="min-h-screen" style={{ background: '#FAF8F5' }}>
      {/* Hero Banner */}
      {banners && banners.length > 0 && (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${banners[0].imageUrl})`,
              filter: 'brightness(0.4)'
            }}
          />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              {banners[0].title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              {banners[0].subtitle}
            </p>
            <Link 
              href="/marketplace" 
              className="inline-block px-8 py-4 text-sm uppercase tracking-widest"
              style={{ background: '#C9A86C', color: '#0A0A0A' }}
            >
              Explore
            </Link>
          </div>
        </section>
      )}
      
      {/* Featured Brands */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>Featured Brands</h2>
            <p style={{ color: '#5D5E61' }}>Discover emerging designers</p>
          </div>
          <Link href="/brands" className="text-sm" style={{ color: '#C9A86C' }}>
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands && brands.length > 0 ? (
            brands.map((brand: any) => (
              <Link 
                key={brand.id} 
                href={`/brands/${brand.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-white">
                  {brand.coverImageUrl ? (
                    <img 
                      src={brand.coverImageUrl} 
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: '#F5F0E8' }}>
                      <span className="font-display text-4xl" style={{ color: '#C9A86C' }}>
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg" style={{ color: '#0A0A0A' }}>{brand.name}</h3>
                <p className="text-sm" style={{ color: '#5D5E61' }}>{brand.city}, {brand.country}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12" style={{ color: '#5D5E61' }}>
              No featured brands yet
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-3xl mb-2" style={{ color: '#FAF8F5' }}>New Arrivals</h2>
              <p style={{ color: 'rgba(250,248,245,0.6)' }}>Fresh drops from your favorite brands</p>
            </div>
            <Link href="/marketplace" className="text-sm" style={{ color: '#C9A86C' }}>
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.id}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-white">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: '#F5F0E8' }}>
                        <span style={{ color: '#C9A86C' }}>📦</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C9A86C' }}>
                        {product.brand?.name}
                      </p>
                      <h3 className="font-medium" style={{ color: '#FAF8F5' }}>{product.name}</h3>
                    </div>
                    <p className="font-medium" style={{ color: '#FAF8F5' }}>€{product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12" style={{ color: 'rgba(250,248,245,0.6)' }}>
                No products available yet
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Collections */}
      {collections && collections.length > 0 && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-3xl mb-2" style={{ color: '#0A0A0A' }}>Collections</h2>
              <p style={{ color: '#5D5E61' }}>Curated selections</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection: any) => (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="group block relative aspect-[21/9] rounded-2xl overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${collection.coverImageUrl || '/images/collection.jpg'})` }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display text-2xl text-white mb-1">{collection.name}</h3>
                  <p className="text-sm text-white/80">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Story of the Week */}
      {story && (
        <section className="py-20 px-6" style={{ background: '#F5F0E8' }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#C9A86C' }}>Story of the Week</p>
            <h2 className="font-display text-4xl mb-6" style={{ color: '#0A0A0A' }}>{story.title}</h2>
            {story.brandName && (
              <p className="text-lg mb-6" style={{ color: '#5D5E61' }}>Featuring {story.brandName}</p>
            )}
            {story.description && (
              <p className="text-lg mb-8" style={{ color: '#5D5E61' }}>{story.description}</p>
            )}
            <Link 
              href="/discover" 
              className="inline-block px-6 py-3 border rounded-full"
              style={{ borderColor: '#0A0A0A', color: '#0A0A0A' }}
            >
              Read More
            </Link>
          </div>
        </section>
      )}
      
      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-display text-3xl mb-4" style={{ color: '#0A0A0A' }}>Are you a brand?</h2>
        <p className="mb-8" style={{ color: '#5D5E61' }}>Join NEFER and reach thousands of customers</p>
        <Link 
          href="/brand/onboarding" 
          className="inline-block px-8 py-4 text-sm uppercase tracking-widest"
          style={{ background: '#0A0A0A', color: '#FAF8F5' }}
        >
          Apply Now
        </Link>
      </section>
    </div>
  )
}
