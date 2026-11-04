'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: Briefcase, label: 'My Jobs', href: '/dashboard', active: false },
  { icon: DollarSign, label: 'Earnings', href: '/dashboard', active: false },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard', active: false },
  { icon: Star, label: 'Reviews', href: '/dashboard', active: false },
  { icon: Settings, label: 'Settings', href: '/dashboard', active: false },
];

const STAT_CARDS = [
  { label: 'Active Bids', value: '3', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
  { label: 'Jobs This Month', value: '2', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Earnings MTD', value: '$4,250', icon: DollarSign, color: 'bg-gold/10 text-yellow-700' },
  { label: 'Rating', value: '4.8', icon: Star, color: 'bg-purple-50 text-purple-600' },
];

const JOB_OPPORTUNITIES = [
  {
    title: 'Panel Upgrade — Eastside Home',
    trade: 'Electrical',
    address: '14520 Gratiot Ave, Detroit, MI 48205',
    zip: '48205',
    budget: '$1,500–$2,500',
    posted: '2 hours ago',
    urgent: true,
  },
  {
    title: 'Full Rewire — Historic Boston-Edison Home',
    trade: 'Electrical',
    address: '1740 Longfellow Ave, Detroit, MI 48206',
    zip: '48206',
    budget: '$3,000–$5,500',
    posted: '1 day ago',
    urgent: false,
  },
  {
    title: 'Commercial Outlet Install — Midtown Office',
    trade: 'Electrical',
    address: '4201 Cass Ave, Detroit, MI 48201',
    zip: '48201',
    budget: '$800–$1,400',
    posted: '2 days ago',
    urgent: false,
  },
];

const EARNINGS_ROWS = [
  { client: 'Sarah Mitchell', job: 'Electrical Install', date: 'Nov 1, 2026', amount: '$1,750', status: 'Paid' },
  { client: 'Detroit Realty Group', job: 'Panel Upgrade', date: 'Oct 28, 2026', amount: '$2,500', status: 'Paid' },
  { client: 'James Henderson', job: 'Outlet Installation', date: 'Oct 25, 2026', amount: '$750', status: 'Paid' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy-dark text-white z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center font-bold text-navy text-sm select-none">
              BP
            </div>
            <span className="font-bold text-sm">The Big Pivot</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User profile block */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
              MT
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">Marcus Thompson</div>
              <span className="inline-block bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">
                Active Subscriber
              </span>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${active ? 'bg-gold text-navy' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between bg-navy text-white px-4 py-3 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-white/10 rounded-lg">
            <Menu size={20} />
          </button>
          <span className="font-bold text-sm">Dashboard</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-5xl w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-navy">Welcome back, Marcus 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with your account.</p>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={20} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Job Opportunities ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-navy">Job Opportunities Near You</h2>
              <Link href="/contractors" className="text-sm font-semibold text-gold hover:text-gold-dark flex items-center gap-1">
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {JOB_OPPORTUNITIES.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold/50 hover:bg-gold/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{job.title}</span>
                      {job.urgent && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">Urgent</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                      <MapPin size={11} /> {job.address}
                    </div>
                    <div className="text-xs text-gray-400">Posted {job.posted}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm">{job.budget}</div>
                      <div className="text-xs text-gray-400">Budget</div>
                    </div>
                    <Link
                      href="/post-job"
                      className="bg-navy text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors whitespace-nowrap"
                    >
                      Submit Bid
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Earnings Table ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy mb-5">Recent Earnings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 pb-3 pr-6">Client</th>
                    <th className="text-left text-xs font-semibold text-gray-500 pb-3 pr-6">Job</th>
                    <th className="text-left text-xs font-semibold text-gray-500 pb-3 pr-6">Date</th>
                    <th className="text-right text-xs font-semibold text-gray-500 pb-3 pr-6">Amount</th>
                    <th className="text-right text-xs font-semibold text-gray-500 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {EARNINGS_ROWS.map((row) => (
                    <tr key={row.client + row.date} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 pr-6 font-semibold text-gray-900">{row.client}</td>
                      <td className="py-3.5 pr-6 text-gray-600">{row.job}</td>
                      <td className="py-3.5 pr-6 text-gray-500">{row.date}</td>
                      <td className="py-3.5 pr-6 text-right font-bold text-gray-900">{row.amount}</td>
                      <td className="py-3.5 text-right">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
