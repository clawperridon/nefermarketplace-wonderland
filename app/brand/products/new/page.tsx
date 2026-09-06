'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface ProductFormData {
  name: string
  slug: string
  description: string
  materials: string
  price: string
  compareAtPrice: string
  categoryId: string
  isFeatured: boolean
  isActive: boolean
  images: string[]
}

export default function NewProduct() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    materials: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    isFeatured: false,
    isActive: true,
    images: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleImageAdd = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }))
  }

  const handleImageChange = (index: number, url: string) => {
    const newImages = [...formData.images]
    newImages[index] = url
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get current user and brand
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/brand-login')
        return
      }

      // Get brand
      const { data: brand } = await supabase
        .from('Brand')
        .select('id')
        .eq('userId', user.id)
        .single()

      if (!brand) {
        throw new Error('No brand found')
      }

      // Create product
      const { data: product, error: productError } = await supabase
        .from('Product')
        .insert({
          brandId: brand.id,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          materials: formData.materials,
          price: parseFloat(formData.price) || 0,
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
          categoryId: formData.categoryId || null,
          isFeatured: formData.isFeatured,
          isActive: formData.isActive,
          imageUrl: formData.images[0] || null,
          images: formData.images.filter(Boolean),
          status: 'PENDING_REVIEW', // Requires approval
        })
        .select()
        .single()

      if (productError) throw productError

      // Create product images
      for (let i = 0; i < formData.images.length; i++) {
        if (formData.images[i]) {
          await supabase.from('ProductImage').insert({
            productId: product.id,
            url: formData.images[i],
            position: i,
          })
        }
      }

      router.push('/brand/products')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/brand/products" className="text-sm" style={{ color: '#C9A86C' }}>
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h1 className="font-display text-2xl mb-2" style={{ color: '#0A0A0A' }}>Add New Product</h1>
        <p className="mb-6" style={{ color: '#5D5E61' }}>Products require approval before going live.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="font-medium mb-4" style={{ color: '#0A0A0A' }}>Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                  placeholder="e.g., Oversized Wool Blazer"
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
                  placeholder="oversized-wool-blazer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                  placeholder="Describe your product..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                  Materials
                </label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                  placeholder="e.g., 100% Organic Cotton"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="font-medium mb-4" style={{ color: '#0A0A0A' }}>Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                  Price (EUR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
                  Compare at Price
                </label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0A0A0A' }}>
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
            >
              <option value="">Select category</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="outerwear">Outerwear</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
              <option value="bags">Bags</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#0A0A0A' }}>
              Images
            </label>
            <div className="space-y-2">
              {formData.images.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border bg-[#FAF8F5] focus:outline-none focus:border-[#C9A86C]"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleImageAdd}
                className="text-sm px-4 py-2 rounded-xl border border-dashed"
                style={{ borderColor: '#C9A86C', color: '#C9A86C' }}
              >
                + Add Image URL
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span style={{ color: '#0A0A0A' }}>Active</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span style={{ color: '#0A0A0A' }}>Featured</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 rounded-xl border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl text-white font-medium disabled:opacity-50"
              style={{ background: '#C9A86C' }}
            >
              {loading ? 'Saving...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
