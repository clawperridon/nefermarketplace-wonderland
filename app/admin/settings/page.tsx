'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AdminSettings {
  pointsPerEuro: number;
  pointsRedemptionRate: number;
  minPointsToRedeem: number;
  welcomePoints: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    pointsPerEuro: 1,
    pointsRedemptionRate: 1.0,
    minPointsToRedeem: 100,
    welcomePoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('AdminSettings')
      .select('*')
      .single();
    
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    
    const { error } = await supabase
      .from('AdminSettings')
      .upsert({
        id: 'default',
        ...settings,
        updatedAt: new Date().toISOString(),
      });

    setSaving(false);
    if (error) {
      setMessage('Error saving settings');
    } else {
      setMessage('Settings saved!');
      setTimeout(() => setMessage(''), 3000);
    }
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
        <div className="max-w-2xl">
          <h1 className="font-semibold text-3xl mb-2" style={{ color: '#1A2B3C' }}>
            Points System Settings
          </h1>
          <p className="mb-8" style={{ color: '#7A8B9A' }}>
            Configure how customers earn and spend points
          </p>

          <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {/* Points per Euro */}
            <div className="mb-6">
              <label className="block font-medium mb-2" style={{ color: '#1A2B3C' }}>
                Points earned per €1 spent
              </label>
              <input
                type="number"
                value={settings.pointsPerEuro}
                onChange={(e) => setSettings({ ...settings, pointsPerEuro: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                min="1"
              />
              <p className="text-sm mt-1" style={{ color: '#7A8B9A' }}>
                Customers earn {settings.pointsPerEuro} point for every €1 they spend
              </p>
            </div>

            {/* Points Redemption Rate */}
            <div className="mb-6">
              <label className="block font-medium mb-2" style={{ color: '#1A2B3C' }}>
                Discount value per point (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.pointsRedemptionRate}
                onChange={(e) => setSettings({ ...settings, pointsRedemptionRate: parseFloat(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                min="0.01"
              />
              <p className="text-sm mt-1" style={{ color: '#7A8B9A' }}>
                1 point = €{settings.pointsRedemptionRate.toFixed(2)} discount
              </p>
            </div>

            {/* Minimum Points to Redeem */}
            <div className="mb-6">
              <label className="block font-medium mb-2" style={{ color: '#1A2B3C' }}>
                Minimum points required to redeem
              </label>
              <input
                type="number"
                value={settings.minPointsToRedeem}
                onChange={(e) => setSettings({ ...settings, minPointsToRedeem: parseInt(e.target.value) || 100 })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                min="1"
              />
              <p className="text-sm mt-1" style={{ color: '#7A8B9A' }}>
                Customers need at least {settings.minPointsToRedeem} points to get a discount
              </p>
            </div>

            {/* Welcome Points */}
            <div className="mb-6">
              <label className="block font-medium mb-2" style={{ color: '#1A2B3C' }}>
                Welcome points for new customers
              </label>
              <input
                type="number"
                value={settings.welcomePoints}
                onChange={(e) => setSettings({ ...settings, welcomePoints: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: '#E8E5E0', background: '#FAFAFA' }}
                min="0"
              />
              <p className="text-sm mt-1" style={{ color: '#7A8B9A' }}>
                New customers get {settings.welcomePoints} points when they sign up
              </p>
            </div>

            {/* Example */}
            <div className="p-4 rounded-lg mb-6" style={{ background: '#F8F5ED' }}>
              <h3 className="font-medium mb-2" style={{ color: '#1A2B3C' }}>Example</h3>
              <p className="text-sm" style={{ color: '#7A8B9A' }}>
                Customer spends €100 → earns {100 * settings.pointsPerEuro} points<br/>
                Customer uses {settings.minPointsToRedeem} points → gets €{(settings.minPointsToRedeem * settings.pointsRedemptionRate).toFixed(2)} discount
              </p>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 rounded-full font-medium text-white disabled:opacity-50"
                style={{ background: '#5D5E61' }}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
              {message && (
                <span style={{ color: message.includes('Error') ? '#DC2626' : '#10B981' }}>
                  {message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
