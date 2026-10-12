import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, MapPin, Mail, User } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showroomLocation, setShowroomLocation] = useState('Monaco Concierge Atelier');
  const [preferredDate, setPreferredDate] = useState('2026-11-15');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please provide your full legal name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please provide a valid corporate or personal email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-[#0f0f12] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle orange accent glow at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500 flex items-center justify-center text-orange-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display uppercase text-white">
              Allocation Inquiry Received
            </h3>
            <p className="mt-3 text-sm text-neutral-300 max-w-md">
              Thank you, <strong className="text-white">{fullName}</strong>. Your confidential reservation request for the <strong className="text-orange-400">ITZFIZZ GT-01 Prototype</strong> has been logged.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-left w-full space-y-2 text-neutral-300">
              <div className="flex justify-between">
                <span>Selected Atelier:</span>
                <span className="text-white">{showroomLocation}</span>
              </div>
              <div className="flex justify-between">
                <span>Preferred Review:</span>
                <span className="text-white">{preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Dispatch Contact:</span>
                <span className="text-orange-400">{email}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-8 px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase tracking-wider font-display text-sm rounded-lg transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400">
                Bespoke Order Process
              </div>
              <h3 className="text-2xl font-extrabold font-display uppercase text-white mt-1">
                ITZFIZZ GT-01 Private Allocation
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Each unit is crafted strictly on bespoke order with personal factory delivery.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Full Name / Entity *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sahithi Gullipalli"
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Direct Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@domain.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Atelier Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select
                      value={showroomLocation}
                      onChange={(e) => setShowroomLocation(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Monaco Concierge Atelier">Monaco Atelier</option>
                      <option value="Modena Factory Studio">Modena Factory</option>
                      <option value="Silverstone Track Lounge">Silverstone Circuit</option>
                      <option value="Dubai Design District">Dubai Showroom</option>
                      <option value="Beverly Hills Concierge">Los Angeles Concierge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Preferred Review Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Customization Requests / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify custom interior stitch, telemetry packages, or track-day logistics..."
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase tracking-wider font-display text-base rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Allocation Inquiry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
