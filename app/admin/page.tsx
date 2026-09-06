'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 flex flex-col" style={{ background: 'var(--obsidian)' }}>
        <div className="p-6">
          <Link href="/" className="font-display text-lg font-bold tracking-[0.15em]" style={{ color: 'var(--warm-ivory)' }}>NEFER<span className="text-sand">.admin</span></Link>
        </div>
        
        <nav className="flex-1 px-4 py-4">
          {/* Commerce */}
          <div className="mb-8">
            <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--stone)' }}>Commerce</p>
            <Link href="/admin" className={`block px-4 py-3 rounded-lg text-sm ${activeTab === 'dashboard' ? 'bg-white/10' : ''}`} style={{ color: 'rgba(250,248,245,0.7)' }}>Dashboard</Link>
            <Link href="/admin/customers" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Customers <span className="float-right text-xs bg-white/10 px-2 py-0.5 rounded-full">1,247</span></Link>
            <Link href="/admin/orders" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Orders <span className="float-right text-xs bg-white/10 px-2 py-0.5 rounded-full">89</span></Link>
            <Link href="/admin/products" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Products</Link>
            <Link href="/admin/brands" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Brands</Link>
          </div>
          
          {/* Marketing */}
          <div className="mb-8">
            <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--stone)' }}>Marketing</p>
            <Link href="/admin/drops" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Drops</Link>
            <Link href="/admin/discounts" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Discounts</Link>
          </div>
          
          {/* Platform */}
          <div>
            <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--stone)' }}>Platform</p>
            <Link href="/admin/categories" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Categories</Link>
            <Link href="/admin/settings" className="block px-4 py-3 rounded-lg text-sm" style={{ color: 'rgba(250,248,245,0.7)' }}>Settings</Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--obsidian)' }}>Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--stone)' }}>Welcome back. Here's what's happening.</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium" style={{ background: 'var(--obsidian)', color: 'white' }}>+ Export</button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '€45.2k', change: '+12%', positive: true },
            { label: 'Orders', value: '156', change: '+8%', positive: true },
            { label: 'Customers', value: '1,247', change: '+24', positive: true },
            { label: 'Avg. Order', value: '€156', change: '-3%', positive: false },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6">
              <p className="text-xs uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--stone)' }}>{stat.label}</p>
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--obsidian)' }}>{stat.value}</p>
              <p className={`text-xs mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>{stat.change} vs last month</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: '#f0f0f0' }}>
            <h2 className="font-semibold" style={{ color: 'var(--obsidian)' }}>Recent Orders</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Order</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Customer</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Items</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Total</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--stone)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-089', customer: 'John Doe', items: '2', total: '€340', status: 'Processing', statusColor: 'text-amber-600 bg-amber-50' },
                { id: '#ORD-088', customer: 'Anna Smit', items: '1', total: '€295', status: 'Shipped', statusColor: 'text-blue-600 bg-blue-50' },
                { id: '#ORD-087', customer: 'Max Kennedy', items: '3', total: '€520', status: 'Delivered', statusColor: 'text-green-600 bg-green-50' },
                { id: '#ORD-086', customer: 'Lisa de Vries', items: '1', total: '€175', status: 'Cancelled', statusColor: 'text-red-600 bg-red-50' },
              ].map((order, i) => (
                <tr key={i} className="border-t" style={{ borderColor: '#f5f5f5' }}>
                  <td className="px-6 py-4 font-medium" style={{ color: 'var(--obsidian)' }}>{order.id}</td>
                  <td className="px-6 py-4" style={{ color: 'var(--obsidian)' }}>{order.customer}</td>
                  <td className="px-6 py-4" style={{ color: 'var(--stone)' }}>{order.items} items</td>
                  <td className="px-6 py-4 font-medium" style={{ color: 'var(--obsidian)' }}>{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--stone)' }}>Apr 19, 2026</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}