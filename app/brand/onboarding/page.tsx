'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface BrandFormData {
  name: string
  slug: string
  description: string
  story: string
  website: string
  email: string
  instagram: string
  tiktok: string
  country: string
  city: string
}

export default function BrandOnboarding() {
  const router = useRouter()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<BrandFormData>({
    name: '',
    slug: '',
    description: '',
    story: '',
    website: '',
    email: '',
    instagram: '',
    tiktok: '',
    country: '',
    city: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/brand-login')
        return
      }

      // Create brand
      const { data: brand, error: brandError } = await supabase
        .from('Brand')
        .insert({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          story: formData.story,
          website: formData.website,
          email: formData.email,
          instagram: formData.instagram,
          tiktok: formData.tiktok,
          country: formData.country,
          city: formData.city,
          userId: user.id,
          status: 'PENDING',
        })
        .select()
        .single()

      if (brandError) throw brandError

      // Update user role to BRAND
      await supabase
        .from('User')
        .update({ role: 'BRAND' })
        .eq('id', user.id)

      // Add user as brand owner
      await supabase
        .from('BrandMember')
        .insert({
          userId: user.id,
          brandId: brand.id,
          role: 'OWNER',
          status: 'ACTIVE',
          acceptedAt: new Date().toISOString(),
        })

      router.push('/brand/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF8F5' }}>
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s ? 'bg-[#C9A86C] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C9A86C] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h1 className="font-display text-2xl mb-2" style={{ color: '#0A0A0A' }}>
            {step === 1 && 'Tell us about your brand'}
            {step === 2 && 'How can customers find you?'}
            {step === 3 && 'Almost done!'}
          </h1>
          <p className="mb-6" style={{ color: '#5D5E61' }}>
            {step === 1 && 'Share your brand story and identity'}
            {step === 2 && 'Add your social media and contact details'}
            {step === 3 && 'Review and submit your application'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="e.g., ATLAS"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="atlas"
                  />
                  <p className="text-xs mt-1" style={{ color: '#5D5E61' }}>
                    nefer.com/brands/{formData.slug || 'your-brand'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="Brief description of your brand..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    Brand Story
                  </label>
                  <textarea
                    name="story"
                    value={formData.story}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="Share your brand's story and values..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    >
                      <option value="">Select</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                      placeholder="Amsterdam"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="https://yourbrand.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="hello@yourbrand.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                      placeholder="@yourbrand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                      TikTok
                    </label>
                    <input
                      type="text"
                      name="tiktok"
                      value={formData.tiktok}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                      placeholder="@yourbrand"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-[#FAF8F5] rounded-xl p-4">
                  <h3 className="font-medium mb-3" style={{ color: '#0A0A0A' }}>Review Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span style={{ color: '#5D5E61' }}>Brand:</span> <strong>{formData.name}</strong></p>
                    <p><span style={{ color: '#5D5E61' }}>Slug:</span> <strong>{formData.slug}</strong></p>
                    <p><span style={{ color: '#5D5E61' }}>Description:</span> {formData.description}</p>
                    {formData.website && <p><span style={{ color: '#5D5E61' }}>Website:</span> {formData.website}</p>}
                    {formData.email && <p><span style={{ color: '#5D5E61' }}>Email:</span> {formData.email}</p>}
                  </div>
                </div>

                <p className="text-sm" style={{ color: '#5D5E61' }}>
                  After submitting, your brand will be reviewed by our team. This typically takes 1-2 business days.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 rounded-xl border hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex-1 px-6 py-3 rounded-xl text-white font-medium"
                  style={{ background: '#C9A86C' }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl text-white font-medium disabled:opacity-50"
                  style={{ background: '#C9A86C' }}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
