'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AVATAR_COLORS = [
  '#2563EB', '#059669', '#7C3AED', '#DC2626',
  '#EA580C', '#1A355E', '#BE185D', '#0891B2',
];

const TRADES = ['All Trades', 'Electrical', 'HVAC', 'Plumbing', 'Landscaping', 'Roofing', 'Concrete', 'Cleaning', 'General'];

const contractors = [
  { id: '1', name: 'Marcus Thompson', trade: 'Electrical', rating: 4.8, reviews: 94, rateMin: 85, rateMax: 120, zip: '48201', city: 'Detroit' },
  { id: '2', name: 'Deja Williams',   trade: 'HVAC',       rating: 4.6, reviews: 61, rateMin: 75, rateMax: 110, zip: '48202', city: 'Detroit' },
  { id: '3', name: 'Ray Johnson',     trade: 'Plumbing',   rating: 4.9, reviews: 112, rateMin: 90, rateMax: 130, zip: '48226', city: 'Detroit' },
  { id: '4', name: 'Tamika Brooks',   trade: 'Landscaping',rating: 4.7, reviews: 78, rateMin: 55, rateMax: 80,  zip: '48201', city: 'Detroit' },
  { id: '5', name: 'Carlos Rivera',   trade: 'Roofing',    rating: 4.5, reviews: 55, rateMin: 70, rateMax: 100, zip: '48202', city: 'Detroit' },
  { id: '6', name: 'Antoine Davis',   trade: 'General',    rating: 4.8, reviews: 83, rateMin: 80, rateMax: 120, zip: '48226', city: 'Detroit' },
  { id: '7', name: 'Lisa Chen',       trade: 'Cleaning',   rating: 4.9, reviews: 136, rateMin: 45, rateMax: 65,  zip: '48201', city: 'Detroit' },
  { id: '8', name: 'James Porter',    trade: 'Concrete',   rating: 4.4, reviews: 42, rateMin: 65, rateMax: 95,  zip: '48202', city: 'Detroit' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.floor(rating) ? 'fill-gold text-gold' : 'text-gray-300 fill-gray-300'}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
    </div>
  );
}

function Initials({ name, color }: { name: string; color: string }) {
  const parts = name.split(' ');
  const initials = parts.map((p) => p[0]).join('').slice(0, 2);
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

const TRADE_COLORS: Record<string, string> = {
  Electrical: 'bg-blue-100 text-blue-800',
  HVAC:        'bg-cyan-100 text-cyan-800',
  Plumbing:    'bg-indigo-100 text-indigo-800',
  Landscaping: 'bg-green-100 text-green-800',
  Roofing:     'bg-orange-100 text-orange-800',
  Concrete:    'bg-stone-100 text-stone-800',
  Cleaning:    'bg-purple-100 text-purple-800',
  General:     'bg-gray-100 text-gray-800',
};

export default function ContractorsPage() {
  const [search, setSearch] = useState('');
  const [trade, setTrade] = useState('All Trades');
  const [zip, setZip] = useState('');

  const filtered = contractors.filter((c) => {
    const matchTrade = trade === 'All Trades' || c.trade === trade;
    const matchZip = !zip || c.zip.startsWith(zip);
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.trade.toLowerCase().includes(search.toLowerCase());
    return matchTrade && matchZip && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Find a Contractor</h1>
          <p className="text-gold font-semibold">Verified Detroit-area tradespeople, ready to work.</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Text search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or trade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm"
            />
          </div>
          {/* Trade dropdown */}
          <select
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            className="sm:w-48 px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm bg-white"
          >
            {TRADES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {/* Zip input */}
          <div className="relative sm:w-40">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Zip code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              maxLength={5}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm"
            />
          </div>
        </div>
      </div>

      {/* Contractor grid */}
      <main className="max-w-6xl mx-auto w-full px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-semibold">No contractors found.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((c, idx) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <Initials name={c.name} color={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                  <div>
                    <div className="font-bold text-navy leading-tight">{c.name}</div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${TRADE_COLORS[c.trade] ?? 'bg-gray-100 text-gray-700'}`}>
                      {c.trade}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <StarRating rating={c.rating} />
                <p className="text-xs text-gray-500 -mt-2">{c.reviews} reviews</p>

                {/* Rate */}
                <div className="text-sm font-semibold text-gray-700">
                  ${c.rateMin}–${c.rateMax}<span className="text-gray-400 font-normal">/hr</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} />
                  {c.city}, MI {c.zip}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
                  <Link
                    href={`/contractors/${c.id}`}
                    className="flex-1 text-center text-sm font-semibold text-navy border border-navy rounded-lg py-2 hover:bg-navy hover:text-white transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/post-job"
                    className="flex-1 text-center text-sm font-semibold bg-gold text-navy rounded-lg py-2 hover:bg-gold-dark transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-navy text-white/50 text-center text-sm py-6 mt-auto">
        &copy; {new Date().getFullYear()} The Big Pivot &mdash; Detroit, MI
      </footer>
    </div>
  );
}
