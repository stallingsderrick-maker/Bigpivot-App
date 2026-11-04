'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const TRADES = ['Select a trade', 'Electrical', 'HVAC', 'Plumbing', 'Landscaping', 'Roofing', 'Concrete', 'Cleaning', 'General'];

interface FormData {
  title: string;
  trade: string;
  description: string;
  address: string;
  zip: string;
  startDate: string;
  endDate: string;
  budgetMin: string;
  budgetMax: string;
  paymentType: string;
}

const EMPTY: FormData = {
  title: '',
  trade: '',
  description: '',
  address: '',
  zip: '',
  startDate: '',
  endDate: '',
  budgetMin: '',
  budgetMax: '',
  paymentType: 'fixed',
};

const STEP_LABELS = ['Job Details', 'Budget', 'Review & Submit'];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                ${i + 1 <= step ? 'bg-gold text-navy' : 'bg-gray-200 text-gray-500'}`}
            >
              {i + 1 < step ? <CheckCircle size={18} /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i + 1 <= step ? 'text-navy' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Progress line */}
      <div className="relative mx-5">
        <div className="h-1 bg-gray-200 rounded-full" />
        <div
          className="absolute top-0 left-0 h-1 bg-gold rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / (STEP_LABELS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-gray-700 mb-1.5">{children}</label>;
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm"
    />
  );
}

export default function PostJobPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const canAdvanceStep1 =
    form.title.trim() &&
    form.trade &&
    form.trade !== 'Select a trade' &&
    form.description.trim() &&
    form.address.trim() &&
    form.zip.trim();

  const canAdvanceStep2 = form.budgetMin && form.budgetMax;

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md w-full shadow-lg">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-extrabold text-navy mb-3">Job Posted!</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">&ldquo;{form.title}&rdquo;</span> is now live.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              We&apos;re notifying matching contractors in your area right now. Expect bids within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard" className="bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-dark transition-colors text-sm">
                View Dashboard
              </Link>
              <button
                onClick={() => { setForm(EMPTY); setStep(1); setSubmitted(false); }}
                className="border border-navy text-navy font-bold px-6 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors text-sm"
              >
                Post Another Job
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Post a Job</h1>
          <p className="text-gold font-semibold">Get bids from verified Detroit contractors.</p>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-7 sm:p-10 shadow-sm">
          <ProgressBar step={step} />

          {/* ── Step 1: Job Details ── */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-navy mb-2">Tell us about the job</h2>

              <div>
                <FieldLabel>Job Title *</FieldLabel>
                <Input value={form.title} onChange={set('title')} placeholder="e.g. Panel Upgrade — 200A Service" />
              </div>

              <div>
                <FieldLabel>Trade *</FieldLabel>
                <select
                  value={form.trade}
                  onChange={(e) => set('trade')(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm bg-white"
                >
                  {TRADES.map((t) => (
                    <option key={t} disabled={t === 'Select a trade'}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Job Description *</FieldLabel>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description')(e.target.value)}
                  placeholder="Describe the work needed, current conditions, any special requirements..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm resize-none"
                />
              </div>

              <div>
                <FieldLabel>Street Address *</FieldLabel>
                <Input value={form.address} onChange={set('address')} placeholder="e.g. 2140 Woodward Ave" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Zip Code *</FieldLabel>
                  <Input value={form.zip} onChange={set('zip')} placeholder="48201" />
                </div>
                <div>{/* spacer */}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Start Date</FieldLabel>
                  <Input type="date" value={form.startDate} onChange={set('startDate')} />
                </div>
                <div>
                  <FieldLabel>End Date</FieldLabel>
                  <Input type="date" value={form.endDate} onChange={set('endDate')} />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canAdvanceStep1}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-navy-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Budget <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* ── Step 2: Budget ── */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-navy mb-2">Set your budget</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Min Budget ($) *</FieldLabel>
                  <Input type="number" value={form.budgetMin} onChange={set('budgetMin')} placeholder="500" />
                </div>
                <div>
                  <FieldLabel>Max Budget ($) *</FieldLabel>
                  <Input type="number" value={form.budgetMax} onChange={set('budgetMax')} placeholder="2000" />
                </div>
              </div>

              <div>
                <FieldLabel>Payment Type *</FieldLabel>
                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  {[
                    { value: 'fixed', label: 'Fixed Price', desc: 'Agree on total before work begins' },
                    { value: 'hourly', label: 'Hourly', desc: 'Pay by the hour' },
                    { value: 'negotiable', label: 'Negotiable', desc: 'Open to contractor suggestions' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex-1 flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-colors
                        ${form.paymentType === opt.value ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value={opt.value}
                        checked={form.paymentType === opt.value}
                        onChange={() => set('paymentType')(opt.value)}
                        className="sr-only"
                      />
                      <span className="font-semibold text-navy text-sm">{opt.label}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{opt.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canAdvanceStep2}
                  className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-navy-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-navy mb-2">Review Your Posting</h2>

              <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-4 text-sm">
                <Row label="Job Title" value={form.title} />
                <Row label="Trade" value={form.trade} />
                <Row label="Description" value={form.description} />
                <Row label="Address" value={`${form.address}, Detroit MI ${form.zip}`} />
                {form.startDate && <Row label="Start Date" value={form.startDate} />}
                {form.endDate && <Row label="End Date" value={form.endDate} />}
                <Row label="Budget" value={`$${form.budgetMin} – $${form.budgetMax}`} />
                <Row
                  label="Payment Type"
                  value={form.paymentType.charAt(0).toUpperCase() + form.paymentType.slice(1)}
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gold text-navy font-bold py-3.5 rounded-xl hover:bg-gold-dark transition-colors shadow"
                >
                  Submit Job Posting
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-navy text-white/50 text-center text-sm py-6 mt-auto">
        &copy; {new Date().getFullYear()} The Big Pivot &mdash; Detroit, MI
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-gray-500 w-32 shrink-0 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold flex-1">{value}</span>
    </div>
  );
}
