import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { FloralDivider } from './FloralOrnament';

const SOFITEL_MAPS_URL = 'https://maps.google.com/?q=Sofitel+Cairo+Nile+El+Gezirah';

export const SofitelVenueSection: React.FC = () => {
  return (
    <section
      id="sofitel-venue-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-2xl mx-auto w-full flex flex-col items-center z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 w-full"
        >
          <FloralDivider className="mb-4" />

          <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#854d4a] font-semibold mb-2">
            The Royal Reception
          </span>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#202b26] tracking-wide mb-1">
            Sofitel Cairo Nile El Gezirah
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#32443c] font-bold mb-2">
            فندق سوفيتل القاهرة النيل الجزيرة
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#42524a]">
            Thursday, 7 January 2027 · Cairo, Egypt
          </p>
        </motion.div>

        {/* Royal Venue Card with Google Maps Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="w-full p-6 sm:p-10 rounded-3xl sofitel-surface flex flex-col items-center text-center gap-6"
        >
          <div className="w-14 h-14 rounded-full bg-[#32443c]/10 border border-[#51665c]/30 flex items-center justify-center text-[#854d4a]">
            <MapPin className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-center gap-2 max-w-md">
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#202b26] tracking-wide">
              Sofitel
            </h3>
            <p className="font-serif-luxury text-base sm:text-lg text-[#32443c] leading-relaxed">
              3 El Thawra Council St, El Gezirah Island, Zamalek, Cairo, Egypt
            </p>
            <p className="text-xs sm:text-sm text-[#51665c] font-royal tracking-wider uppercase mt-1">
              Overlooking the Nile
            </p>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#51665c]/25 to-transparent" />

          <a
            href={SOFITEL_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#32443c] via-[#41574d] to-[#32443c] hover:brightness-110 text-[#fbf6f2] font-royal text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <Navigation className="w-4 h-4 text-[#e5c3bf]" />
            <span>Open Location in Google Maps</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
