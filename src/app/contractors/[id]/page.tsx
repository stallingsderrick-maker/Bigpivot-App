import Link from 'next/link';
import { Star, CheckCircle, MapPin, Clock, Briefcase, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Props {
  params: Promise<{ id: string }>;
}

const skills = [
  'Panel Upgrades', '200A Service', 'Residential Rewire', 'Commercial Fit-out',
  'EV Charger Install', 'Outlet & Switch', 'Lighting Design', 'Generator Hook-up',
  'Code Compliance', 'Smart Home Wiring',
];

const reviews = [
  {
    name: 'Renee Jackson',
    location: '48201',
    date: 'October 2026',
    rating: 5,
    text: 'Marcus upgraded our panel from 100A to 200A. Arrived on time, cleaned up after himself, and passed inspection on the first visit. Would absolutely hire again.',
  },
  {
    name: 'Detroit Realty Group',
    location: '48226',
    date: 'September 2026',
    rating: 5,
    text: 'We hired Marcus for a full electrical fit-out on a commercial renovation downtown. Finished ahead of schedule and communicated every step. Priced fairly.',
  },
  {
    name: 'James Henderson',
    location: '48202',
    date: 'September 2026',
    rating: 4,
    text: 'Solid electrician. Installed EV charger in the garage without any issues. Would have been 5 stars but scheduling took a couple days to lock in.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= Math.floor(rating) ? 'fill-gold text-gold' : 'text-gray-300 fill-gray-300'}
        />
      ))}
      <span className="ml-1.5 font-bold text-white">{rating}</span>
    </div>
  );
}

export default async function ContractorProfile({ params }: Props) {
  await params; // resolve async params (data is static for this demo)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Profile Header ── */}
      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-extrabold shrink-0">
            MT
          </div>

          {/* Name & trade */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold">Marcus Thompson</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Electrical</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={4.8} />
              <span className="text-white/60 text-sm">(94 reviews)</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Licensed Electrician',
                'Fully Insured',
                'Background Checked',
                'References Verified',
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-green-300">
                  <CheckCircle size={14} className="text-green-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <main className="max-w-5xl mx-auto w-full px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: About + Skills + Reviews */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* About */}
          <section className="bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="text-xl font-bold text-navy mb-4">About Marcus</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Licensed Master Electrician with 14 years of experience across residential, commercial, and light industrial projects in Metro Detroit. I take pride in clean installs, transparent pricing, and showing up when I say I will.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Based in Midtown Detroit and serving Wayne, Oakland, and Macomb counties. IBEW Local 58 member. All work is code-compliant and permitted where required.
            </p>
          </section>

          {/* Skills */}
          <section className="bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="text-xl font-bold text-navy mb-5">Skills & Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="text-xl font-bold text-navy mb-6">Reviews</h2>
            <div className="flex flex-col gap-6">
              {reviews.map((r) => (
                <div key={r.name} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {r.location} · {r.date}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={13} className={i <= r.rating ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Rate + CTA */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-navy mb-1">
              $85<span className="text-lg font-semibold text-gray-500">–</span>$120
              <span className="text-base font-medium text-gray-500">/hr</span>
            </div>
            <p className="text-xs text-gray-500 mb-5">Rate varies by project scope</p>
            <Link
              href="/post-job"
              className="block w-full text-center bg-gold text-navy font-bold py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-base shadow"
            >
              Request a Quote
            </Link>
            <div className="flex gap-3 mt-3">
              <a href="tel:+13135550142" className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Phone size={14} /> Call
              </a>
              <a href="mailto:marcus@example.com" className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Mail size={14} /> Email
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-navy mb-4">Quick Stats</h3>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { icon: <Briefcase size={15} />, label: 'Jobs Completed', value: '127' },
                { icon: <Star size={15} className="fill-gold text-gold" />, label: 'Avg Rating', value: '4.8 / 5.0' },
                { icon: <Clock size={15} />, label: 'Response Time', value: 'Under 2 hours' },
                { icon: <MapPin size={15} />, label: 'Service Area', value: 'Wayne, Oakland, Macomb' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-500">{icon} {label}</span>
                  <span className="font-semibold text-gray-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-navy mb-3">Availability</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-green-700">Available Now</span>
            </div>
            <p className="text-xs text-gray-500">Mon–Fri 7 AM–6 PM · Sat 8 AM–2 PM</p>
            <p className="text-xs text-gray-500 mt-1">Emergency calls available 24/7</p>
          </div>

          {/* Service Area */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-navy mb-3">Service Area</h3>
            <div className="flex flex-wrap gap-2">
              {['48201', '48202', '48226', '48234', '48235', '48207', '48209'].map((z) => (
                <span key={z} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {z}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">+ surrounding Metro Detroit</p>
          </div>
        </aside>
      </main>

      <footer className="bg-navy text-white/50 text-center text-sm py-6 mt-auto">
        &copy; {new Date().getFullYear()} The Big Pivot &mdash; Detroit, MI
      </footer>
    </div>
  );
}
