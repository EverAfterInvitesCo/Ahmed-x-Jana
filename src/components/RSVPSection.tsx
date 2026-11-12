import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Send, Copy, Check } from 'lucide-react';
import { RSVPData } from '../types';
import { FloralDivider } from './FloralOrnament';

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState<RSVPData>({
    guestName: '',
    emailOrPhone: '',
    attendance: 'attending',
    numberOfGuests: 2,
    dietaryOrNote: '',
    createdAt: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('ahmed_jana_wedding_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setSubmitted(true);
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    const timestamp = new Date().toISOString();
    const finalData: RSVPData = {
      ...formData,
      createdAt: timestamp,
    };

    localStorage.setItem('ahmed_jana_wedding_rsvp', JSON.stringify(finalData));

    const newAdminRecord = {
      id: Date.now().toString(),
      name: finalData.guestName,
      attendance: finalData.attendance === 'attending' ? `Attending (${finalData.numberOfGuests} Guests)` : 'Declined',
      guestsCount: finalData.attendance === 'attending' ? finalData.numberOfGuests.toString() : '0',
      message: finalData.dietaryOrNote,
      timestamp: timestamp,
    };

    try {
      const existingRecords = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      const filtered = existingRecords.filter((r: { name: string }) => r.name.toLowerCase() !== finalData.guestName.toLowerCase());
      localStorage.setItem('wedding_rsvps', JSON.stringify([newAdminRecord, ...filtered]));
    } catch {
      localStorage.setItem('wedding_rsvps', JSON.stringify([newAdminRecord]));
    }

    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const copyConfirmation = () => {
    const text = `RSVP for Ahmed Hossam & Jana Mohamed's Wedding (7 January 2027 · Sofitel):\nGuest: ${formData.guestName}\nStatus: ${
      formData.attendance === 'attending' ? 'Attending (' + formData.numberOfGuests + ' guests)' : 'Regretfully Declining'
    }\nContact: ${formData.emailOrPhone}\nNote: ${formData.dietaryOrNote || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="rsvp-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-xl mx-auto w-full flex flex-col items-center z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 text-center w-full"
        >
          <FloralDivider className="mb-4" />

          <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#854d4a] font-semibold mb-2">
            Kindly Respond
          </span>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#202b26] tracking-wide mb-2">
            RSVP Confirmation
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#42524a]">
            Please reply by 20 December 2026 · 7 January 2027 at Sofitel
          </p>
        </motion.div>

        {/* Form or Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left p-6 sm:p-8 rounded-3xl sofitel-surface"
              >
                {/* Attendance Toggle */}
                <div>
                  <label className="block font-royal text-[11px] uppercase tracking-widest text-[#202b26] font-bold mb-2">
                    Will You Join Us? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border font-royal text-xs tracking-wider uppercase transition-all cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'bg-[#32443c] border-[#32443c] text-white font-semibold shadow-sm'
                          : 'bg-white/85 border-[#51665c]/30 text-[#32443c] hover:bg-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${formData.attendance === 'attending' ? 'text-[#e5c3bf]' : 'text-[#51665c]'}`} />
                      <span>Joyfully Accepts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border font-royal text-xs tracking-wider uppercase transition-all cursor-pointer ${
                        formData.attendance === 'declined'
                          ? 'bg-[#854d4a] border-[#854d4a] text-white font-semibold shadow-sm'
                          : 'bg-white/85 border-[#51665c]/30 text-[#32443c] hover:bg-white'
                      }`}
                    >
                      <XCircle className={`w-4 h-4 ${formData.attendance === 'declined' ? 'text-white' : 'text-[#854d4a]'}`} />
                      <span>Declines</span>
                    </button>
                  </div>
                </div>

                {/* Guest Name */}
                <div>
                  <label htmlFor="guestName" className="block font-royal text-[11px] uppercase tracking-widest text-[#202b26] font-bold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g., Mr. & Mrs. Tarek Hossam"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#51665c]/30 text-[#202b26] placeholder:text-[#7c8882] font-serif-luxury text-base focus:outline-none focus:border-[#b37874] focus:ring-1 focus:ring-[#b37874] transition-all"
                  />
                </div>

                {/* Phone / Email */}
                <div>
                  <label htmlFor="emailOrPhone" className="block font-royal text-[11px] uppercase tracking-widest text-[#202b26] font-bold mb-1.5">
                    Phone Number or Email
                  </label>
                  <input
                    id="emailOrPhone"
                    type="text"
                    placeholder="e.g., +20 100 000 0000 or email@example.com"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#51665c]/30 text-[#202b26] placeholder:text-[#7c8882] font-serif-luxury text-base focus:outline-none focus:border-[#b37874] focus:ring-1 focus:ring-[#b37874] transition-all"
                  />
                </div>

                {/* Guests Selector */}
                {formData.attendance === 'attending' && (
                  <div>
                    <div className="flex items-center justify-between font-royal text-[11px] uppercase tracking-widest text-[#202b26] font-bold mb-1.5">
                      <span>Number of Attending Guests</span>
                      <span className="text-[#854d4a] text-sm font-bold">{formData.numberOfGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, numberOfGuests: num })}
                          className={`flex-1 py-2.5 rounded-xl border font-royal text-sm font-bold transition-all cursor-pointer ${
                            formData.numberOfGuests === num
                              ? 'bg-[#b37874] border-[#b37874] text-white shadow-xs'
                              : 'bg-white/90 border-[#51665c]/25 text-[#32443c] hover:bg-[#ead4d1]/45'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note */}
                <div>
                  <label htmlFor="dietaryOrNote" className="block font-royal text-[11px] uppercase tracking-widest text-[#202b26] font-bold mb-1.5">
                    Blessing / Dietary / Special Notes
                  </label>
                  <textarea
                    id="dietaryOrNote"
                    rows={3}
                    placeholder="Leave a prayer or special message for the bride and groom..."
                    value={formData.dietaryOrNote}
                    onChange={(e) => setFormData({ ...formData, dietaryOrNote: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#51665c]/30 text-[#202b26] placeholder:text-[#7c8882] font-serif-luxury text-base focus:outline-none focus:border-[#b37874] focus:ring-1 focus:ring-[#b37874] resize-none transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#32443c] via-[#41574d] to-[#32443c] text-white font-royal text-sm font-semibold tracking-widest uppercase hover:brightness-110 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4 text-[#e5c3bf]" />
                  <span>Confirm RSVP</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl sofitel-surface"
              >
                <div className="w-16 h-16 rounded-full bg-[#32443c]/10 border border-[#51665c]/40 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#32443c]" />
                </div>

                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#202b26] mb-4">
                  Thank You, {formData.guestName}!
                </h3>

                <div className="w-full p-5 rounded-2xl bg-white/90 border border-[#51665c]/20 text-left my-3 flex flex-col gap-2 font-serif-luxury text-sm text-[#32443c]">
                  <div className="flex justify-between border-b border-[#51665c]/15 pb-2">
                    <span className="text-[#854d4a] font-royal uppercase text-xs font-bold">Status:</span>
                    <span className="font-semibold text-[#202b26]">
                      {formData.attendance === 'attending'
                        ? `Attending (${formData.numberOfGuests} Guests)`
                        : 'Regretfully Declining'}
                    </span>
                  </div>
                  {formData.emailOrPhone && (
                    <div className="flex justify-between border-b border-[#51665c]/15 pb-2">
                      <span className="text-[#854d4a] font-royal uppercase text-xs font-bold">Contact:</span>
                      <span className="text-[#202b26]">{formData.emailOrPhone}</span>
                    </div>
                  )}
                  {formData.dietaryOrNote && (
                    <div className="flex flex-col pt-1">
                      <span className="text-[#854d4a] font-royal uppercase text-xs font-bold">Note:</span>
                      <p className="italic text-[#42524a]">&ldquo;{formData.dietaryOrNote}&rdquo;</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={copyConfirmation}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#202b26] font-royal text-xs uppercase tracking-wider border border-[#51665c]/30 cursor-pointer shadow-xs hover:bg-[#ead4d1]/40 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#32443c]" /> : <Copy className="w-4 h-4 text-[#854d4a]" />}
                    <span>{copied ? 'Copied' : 'Copy Details'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-5 py-2.5 rounded-full border border-[#51665c]/30 text-[#32443c] font-royal text-xs uppercase tracking-wider cursor-pointer bg-white hover:bg-[#ead4d1]/40 transition-colors shadow-xs"
                  >
                    Edit RSVP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};