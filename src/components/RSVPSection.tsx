import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Send, Copy, Check, HeartHandshake } from 'lucide-react';
import { RSVPData } from '../types';

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

    // 1. Save single client session
    localStorage.setItem('ahmed_jana_wedding_rsvp', JSON.stringify(finalData));

    // 2. Format and push to the admin dashboard list (`wedding_rsvps`)
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
      // Filter out previous entry by same name if editing, or just prepend
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
    const text = `RSVP for Ahmed Hossam & Jana Mohamed's Wedding:\nGuest: ${formData.guestName}\nStatus: ${
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
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8a6514]" />
            <HeartHandshake className="w-4 h-4 text-[#8a6514]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold">
              Kindly Respond
            </span>
            <HeartHandshake className="w-4 h-4 text-[#8a6514]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8a6514]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c1d0f] tracking-wide mb-1">
            RSVP Confirmation
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#6b4e18] font-bold mb-2">
            يسعدنا تأكيد حضوركم ومشاركتنا الفرحة
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#543b22]">
            Please reply by 20 December 2026
          </p>
        </motion.div>

        {/* Form or Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay: 0.15 }}
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
                className="flex flex-col gap-4 text-left p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#8a6514]/30 shadow-[0_10px_30px_rgba(138,101,20,0.1)]"
              >
                {/* Attendance Toggle */}
                <div>
                  <label className="block font-royal text-[11px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-2">
                    Will You Join Us? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border font-royal text-xs tracking-wider uppercase transition-all cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'bg-[#8a6514] border-[#8a6514] text-white font-bold shadow-sm'
                          : 'bg-white/80 border-[#8a6514]/30 text-[#543b22] hover:bg-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${formData.attendance === 'attending' ? 'text-white' : 'text-[#8a7a6a]'}`} />
                      <span>Joyfully Accepts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border font-royal text-xs tracking-wider uppercase transition-all cursor-pointer ${
                        formData.attendance === 'declined'
                          ? 'bg-rose-700 border-rose-700 text-white font-bold shadow-sm'
                          : 'bg-white/80 border-[#8a6514]/30 text-[#543b22] hover:bg-white'
                      }`}
                    >
                      <XCircle className={`w-4 h-4 ${formData.attendance === 'declined' ? 'text-white' : 'text-[#8a7a6a]'}`} />
                      <span>Declines</span>
                    </button>
                  </div>
                </div>

                {/* Guest Name */}
                <div>
                  <label htmlFor="guestName" className="block font-royal text-[11px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g., Mr. & Mrs. Tarek Hossam"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-base focus:outline-none focus:border-[#8a6514] focus:ring-1 focus:ring-[#8a6514] transition-all"
                  />
                </div>

                {/* Phone / Email */}
                <div>
                  <label htmlFor="emailOrPhone" className="block font-royal text-[11px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1.5">
                    Phone Number or Email
                  </label>
                  <input
                    id="emailOrPhone"
                    type="text"
                    placeholder="e.g., +20 100 000 0000 or email@example.com"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-base focus:outline-none focus:border-[#8a6514] focus:ring-1 focus:ring-[#8a6514] transition-all"
                  />
                </div>

                {/* Guests Selector */}
                {formData.attendance === 'attending' && (
                  <div>
                    <div className="flex items-center justify-between font-royal text-[11px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1.5">
                      <span>Number of Attending Guests</span>
                      <span className="text-[#8a6514] text-sm font-bold">{formData.numberOfGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, numberOfGuests: num })}
                          className={`flex-1 py-2.5 rounded-xl border font-royal text-sm font-bold transition-all cursor-pointer ${
                            formData.numberOfGuests === num
                              ? 'bg-[#8a6514] border-[#8a6514] text-white shadow-xs'
                              : 'bg-white border-[#8a6514]/30 text-[#543b22] hover:bg-[#8a6514]/10'
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
                  <label htmlFor="dietaryOrNote" className="block font-royal text-[11px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1.5">
                    Blessing / Dietary / Special Notes
                  </label>
                  <textarea
                    id="dietaryOrNote"
                    rows={3}
                    placeholder="Leave a prayer or special message for the bride and groom..."
                    value={formData.dietaryOrNote}
                    onChange={(e) => setFormData({ ...formData, dietaryOrNote: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-base focus:outline-none focus:border-[#8a6514] focus:ring-1 focus:ring-[#8a6514] resize-none transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8a6514] via-[#a8822e] to-[#8a6514] text-white font-royal text-sm font-bold tracking-widest uppercase hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Royal RSVP</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-[#8a6514]/30 shadow-[0_10px_30px_rgba(138,101,20,0.12)]"
              >
                <div className="w-16 h-16 rounded-full bg-[#8a6514]/15 border border-[#8a6514] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#8a6514]" />
                </div>

                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#2c1d0f] mb-1">
                  Thank You, {formData.guestName}!
                </h3>

                <p className="font-arabic text-xl text-[#6b4e18] font-bold mb-4">
                  تم تسجيل تأكيد حضوركم بنجاح
                </p>

                <div className="w-full p-5 rounded-2xl bg-white border border-[#8a6514]/25 text-left my-3 flex flex-col gap-2 font-serif-luxury text-sm text-[#3b2a1a] shadow-xs">
                  <div className="flex justify-between border-b border-[#8a6514]/15 pb-2">
                    <span className="text-[#7a581a] font-royal uppercase text-xs font-bold">Status:</span>
                    <span className="font-semibold text-[#2c1d0f]">
                      {formData.attendance === 'attending'
                        ? `Attending (${formData.numberOfGuests} Guests)`
                        : 'Regretfully Declining'}
                    </span>
                  </div>
                  {formData.emailOrPhone && (
                    <div className="flex justify-between border-b border-[#8a6514]/15 pb-2">
                      <span className="text-[#7a581a] font-royal uppercase text-xs font-bold">Contact:</span>
                      <span className="text-[#2c1d0f]">{formData.emailOrPhone}</span>
                    </div>
                  )}
                  {formData.dietaryOrNote && (
                    <div className="flex flex-col pt-1">
                      <span className="text-[#7a581a] font-royal uppercase text-xs font-bold">Note:</span>
                      <p className="italic text-[#44301d]">"{formData.dietaryOrNote}"</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={copyConfirmation}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2c1d0f] font-royal text-xs uppercase tracking-wider border border-[#8a6514]/30 cursor-pointer shadow-xs hover:bg-[#8a6514]/10 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#8a6514]" />}
                    <span>{copied ? 'Copied' : 'Copy Details'}</span>
                  </button>

                  <button
                    onClick={handleEdit}
                    className="px-5 py-2.5 rounded-full border border-[#8a6514]/30 text-[#543b22] font-royal text-xs uppercase tracking-wider cursor-pointer bg-white hover:bg-[#8a6514]/10 transition-colors shadow-xs"
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