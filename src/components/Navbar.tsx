'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-navy text-lg select-none">
              BP
            </div>
            <span className="font-bold text-lg hidden sm:block tracking-tight">The Big Pivot</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/contractors" className="hover:text-gold transition-colors">
              Find Contractors
            </Link>
            <Link href="/post-job" className="hover:text-gold transition-colors">
              Post a Job
            </Link>
            <Link href="/dashboard" className="hover:text-gold transition-colors">
              Dashboard
            </Link>
            <Link
              href="/post-job"
              className="bg-gold text-navy font-semibold px-5 py-2 rounded-lg hover:bg-gold-dark transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-navy-dark border-t border-white/10 px-4 py-5 flex flex-col gap-4 text-sm font-medium">
          <Link href="/contractors" onClick={() => setOpen(false)} className="hover:text-gold transition-colors">
            Find Contractors
          </Link>
          <Link href="/post-job" onClick={() => setOpen(false)} className="hover:text-gold transition-colors">
            Post a Job
          </Link>
          <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:text-gold transition-colors">
            Dashboard
          </Link>
          <Link
            href="/post-job"
            onClick={() => setOpen(false)}
            className="bg-gold text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-dark transition-colors text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
