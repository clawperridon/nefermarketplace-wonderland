'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkUrl: string | null;
  linkText: string | null;
  position: number;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    linkUrl: '',
    linkText: '',
    position: 1,
    backgroundColor: '#1A2B3C',
    textColor: '#FFFFFF',
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('Banner')
      .select('*')
      .order('position', { ascending: true });

    setBanners(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch('/api/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({
      title: '',
      subtitle: '',
      imageUrl: '',
      linkUrl: '',
      linkText: '',
      position: 1,
      backgroundColor: '#1A2B3C',
      textColor: '#FFFFFF',
    });
    setShowForm(false);
    setSaving(false);
    loadBanners();
  };

  const toggleBanner = async (bannerId: string, currentStatus: boolean) => {
    await fetch('/api/banners', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bannerId, isActive: !currentStatus }),
    });
    loadBanners();
  };

  const deleteBanner = async (bannerId: string) => {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/banners?id=${bannerId}`, { method: 'DELETE' });
    loadBanners();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F5ED' }}>
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F5ED', paddingTop: '80px' }}>
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-semibold text-3xl mb-2" style={{ color: '#1A2B3C' }}>Homepage Banners</h1>
            <p style={{ color: '#7A8B9A' }}>Manage your homepage banner slides</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-full font-medium text-white"
            style={{ background: '#5D5E61' }}
          >
            {showForm ? 'Cancel' : '+ New Banner'}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 mb-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 className="font-semibold text-xl mb-4" style={{ color: '#1A2B3C' }}>Add New Banner</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Image URL *</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Link URL</label>
                  <input
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    placeholder="/marketplace"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    placeholder="Shop Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Position</label>
                  <input
                    type="number"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="w-12 h-12 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-lg border"
                      style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A2B3C' }}>Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                      className="w-12 h-12 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-lg border"
                      style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-full font-medium text-white disabled:opacity-50"
                style={{ background: '#1A2B3C' }}
              >
                {saving ? 'Creating...' : 'Create Banner'}
              </button>
            </form>
          </div>
        )}

        {/* Preview */}
        <div className="mb-8">
          <h3 className="font-medium mb-4" style={{ color: '#1A2B3C' }}>Preview</h3>
          <div className="grid gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative rounded-xl overflow-hidden aspect-[21/9]"
                style={{ backgroundColor: banner.backgroundColor }}
              >
                <img src={banner.imageUrl} alt={banner.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-lg">
                    <h4 className="text-2xl font-bold mb-2" style={{ color: banner.textColor }}>{banner.title}</h4>
                    {banner.subtitle && <p style={{ color: banner.textColor, opacity: 0.8 }}>{banner.subtitle}</p>}
                  </div>
                </div>
              </div>
            ))}
            {banners.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl" style={{ background: '#EDE8E0' }}>
                <p style={{ color: '#7A8B9A' }}>No banners yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>

        {/* Banners List */}
        {banners.length > 0 && (
          <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="p-4 border-b" style={{ borderColor: '#E8E5E0' }}>
              <h3 className="font-medium" style={{ color: '#1A2B3C' }}>All Banners</h3>
            </div>
            <div className="divide-y" style={{ borderColor: '#E8E5E0' }}>
              {banners.map((banner) => (
                <div key={banner.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-12 rounded-lg overflow-hidden">
                      <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1A2B3C' }}>{banner.title}</p>
                      <p className="text-sm" style={{ color: '#7A8B9A' }}>Position: {banner.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => toggleBanner(banner.id, banner.isActive)}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{ borderColor: '#E8E5E0', color: '#7A8B9A' }}
                    >
                      {banner.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="px-3 py-1 rounded-full text-xs font-medium text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
