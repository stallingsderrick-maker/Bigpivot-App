import Link from 'next/link';
import { CheckCircle, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const trades = [
  { emoji: '❄️', name: 'HVAC', desc: 'Heating & Cooling' },
  { emoji: '⚡', name: 'Electrical', desc: 'Wiring & Panels' },
  { emoji: '🔧', name: 'Plumbing', desc: 'Pipes & Fixtures' },
  { emoji: '🌿', name: 'Landscaping', desc: 'Lawn & Garden' },
  { emoji: '🏠', name: 'Roofing', desc: 'Shingles & Gutters' },
  { emoji: '🧱', name: 'Concrete', desc: 'Pours & Flatwork' },
  { emoji: '🧹', name: 'Cleaning', desc: 'Residential & Commercial' },
  { emoji: '🔨', name: 'General', desc: 'Handyman & Repairs' },
];

const requirements = [
  'State-issued trade license verified on file',
  'General liability insurance — minimum $1M coverage',
  'Background check completed within the last 12 months',
  'Three professional references checked and confirmed',
  'Portfolio of completed work reviewed by our team',
];

const steps = [
  {
    num: '01',
    title: 'Post Your Job',
    desc: 'Describe what you need in minutes. Include location, timeline, and budget.',
  },
  {
    num: '02',
    title: 'Get Matched',
    desc: 'Receive bids from verified, local contractors who specialize in your trade.',
  },
  {
    num: '03',
    title: 'Hire with Confidence',
    desc: 'Review profiles, ratings, and work history. Pay only when the job is done right.',
  },
];

const testimonials = [
  {
    name: 'Renee Jackson',
    location: 'East English Village, Detroit',
    text: "Found an electrician in under an hour. No runaround, no ghosting — Marcus showed up on time, did clean work, and the price matched the quote. Big Pivot is the real deal.",
    rating: 5,
    trade: 'Electrical',
  },
  {
    name: 'Darius Owens',
    location: 'Midtown, Detroit',
    text: "I posted a roofing job Friday night and had three bids by Saturday morning. Went with Carlos — professional all the way. My crew will be using this for every project going forward.",
    rating: 5,
    trade: 'Roofing',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-navy text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Stop Chasing Work.<br className="hidden sm:block" /> Start Winning Contracts.
          </h1>
          <p className="text-gold text-lg sm:text-xl font-semibold mb-10 max-w-2xl mx-auto">
            The Detroit marketplace that connects verified tradespeople with homeowners and businesses who need real work done — fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/post-job"
              className="bg-gold text-navy font-bold px-8 py-4 rounded-xl text-lg hover:bg-gold-dark transition-colors shadow-lg"
            >
              Post a Job
            </Link>
            <Link
              href="/contractors"
              className="bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-colors"
            >
              Find a Contractor
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-gold py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-navy">
          {[
            { value: '2,400+', label: 'Verified Contractors' },
            { value: '14,800+', label: 'Jobs Completed' },
            { value: '4.8 / 5.0', label: 'Avg Contractor Rating' },
            { value: 'Metro Detroit', label: 'Service Area' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold">{value}</div>
              <div className="text-sm font-semibold mt-1 opacity-80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trade Categories ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-3">Browse by Trade</h2>
          <p className="text-gray-500 text-center mb-12">Find the right professional for any project.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {trades.map((trade) => (
              <Link
                key={trade.name}
                href={`/contractors?trade=${trade.name.toLowerCase()}`}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-gold hover:shadow-md transition-all group bg-white"
              >
                <span className="text-4xl">{trade.emoji}</span>
                <span className="font-bold text-navy group-hover:text-gold transition-colors">{trade.name}</span>
                <span className="text-xs text-gray-500 text-center">{trade.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── No Jack Legs ── */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-3">No Jack Legs. Period.</h2>
          <p className="text-gold font-semibold mb-10 text-lg">
            Every contractor on Big Pivot clears five checkpoints before their first bid.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-2xl mx-auto">
            {requirements.map((req) => (
              <div key={req} className="flex items-start gap-3">
                <CheckCircle className="text-gold shrink-0 mt-0.5" size={20} />
                <span className="text-sm leading-relaxed text-white/90">{req}</span>
              </div>
            ))}
          </div>
          <Link
            href="/contractors"
            className="inline-block mt-12 bg-gold text-navy font-bold px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-colors"
          >
            Browse Verified Contractors
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-3">How It Works</h2>
          <p className="text-gray-500 text-center mb-14">Three steps from idea to hired.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-navy text-gold font-extrabold text-xl flex items-center justify-center mb-5 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-14">What Detroit Is Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-navy">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location} · {t.trade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-navy text-white mt-auto py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20 mb-10">
            {/* Brand */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-navy text-lg select-none">
                  BP
                </div>
                <span className="font-bold text-lg">The Big Pivot</span>
              </div>
              <p className="text-white/60 text-sm max-w-xs leading-relaxed">
                Detroit&apos;s trusted marketplace for skilled tradespeople and the clients who need them.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm text-white/70">
              <Link href="/contractors" className="hover:text-gold transition-colors">Find Contractors</Link>
              <Link href="/post-job" className="hover:text-gold transition-colors">Post a Job</Link>
              <Link href="/dashboard" className="hover:text-gold transition-colors">Dashboard</Link>
              <Link href="/" className="hover:text-gold transition-colors">About</Link>
              <Link href="/" className="hover:text-gold transition-colors">Contact</Link>
              <Link href="/" className="hover:text-gold transition-colors">Privacy Policy</Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
            &copy; {new Date().getFullYear()} The Big Pivot. Detroit, MI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
