import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Shirt, Clock } from 'lucide-react';
import { FloralDivider } from './FloralOrnament';

export const CelebrationDetailsSection: React.FC = () => {
  const scheduleItems = [
    {
      time: '6:00 PM',
      title: 'Welcome Reception & Courtyard Welcome',
      titleAr: 'استقبال الضيوف وفتح الأبواب الملكية',
      description: 'Guests arrive to fragrant welcome refreshments and classical melodies.',
    },
    {
      time: '7:30 PM',
      title: 'The Grand Royal Zaffa Entrance',
      titleAr: 'الزفة الملكية ودخول العروسين',
      description: 'Traditional Egyptian zaffa fanfare welcoming Ahmed & Jana in majestic glory.',
    },
    {
      time: '8:30 PM',
      title: 'Grand Dinner Banquet',
      titleAr: 'مأدبة العشاء الفاخرة',
      description: 'An exquisite culinary feast served overlooking the Nile.',
    },
    {
      time: '10:00 PM',
      title: 'Cake Cutting & Midnight Festivities',
      titleAr: 'تقطيع كعكة الزفاف والاحتفال',
      description: 'Cutting of the wedding cake followed by joyous melodies and dancing.',
    },
  ];

  return (
    <section
      id="celebration-details-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-12 text-center w-full"
        >
          <FloralDivider className="mb-4" />

          <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#854d4a] font-semibold mb-2">
            The Itinerary &amp; Venue
          </span>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#202b26] tracking-wide mb-1">
            Evening Programme
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#32443c] font-bold mb-2">
            تفاصيل الحفل والبرنامج
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#42524a] max-w-md">
            A night of joy, music, and timeless memories as we celebrate our new beginning
          </p>
        </motion.div>

        {/* Timeline Items */}
        <div className="w-full max-w-2xl flex flex-col gap-4 sm:gap-6 mb-16 text-left">
          {scheduleItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sofitel-surface"
            >
              <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-[#32443c]/10 border border-[#51665c]/25 shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#854d4a] mb-0.5" />
                <span className="font-royal text-xs font-bold text-[#202b26] whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-royal text-sm sm:text-base font-bold text-[#202b26]">
                    {item.title}
                  </h3>
                  <span className="font-arabic text-xs sm:text-sm text-[#32443c] font-bold">
                    {item.titleAr}
                  </span>
                </div>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#42524a] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue & Dress Code row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl text-left items-stretch"
        >
          {/* Venue Card */}
          <div className="p-5 rounded-2xl sofitel-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#854d4a] mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-royal text-[11px] uppercase tracking-widest font-bold">
                  The Venue
                </span>
              </div>
              <h4 className="font-royal text-base font-bold text-[#202b26] mb-0.5">
                Sofitel Cairo Nile El Gezirah
              </h4>
              <p className="font-arabic text-sm text-[#32443c] font-bold mb-1.5">
                فندق سوفيتل القاهرة النيل الجزيرة
              </p>
              <p className="font-serif-luxury text-xs text-[#42524a]">
                El Gezirah Island, Zamalek, Cairo, Egypt
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Sofitel+Cairo+Nile+El+Gezirah"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#32443c] hover:bg-[#202b26] text-white font-royal text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-white" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Dress Code Card */}
          <div className="p-5 rounded-2xl sofitel-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#854d4a] mb-2">
                <Shirt className="w-4 h-4" />
                <span className="font-royal text-[11px] uppercase tracking-widest font-bold">
                  Dress Code
                </span>
              </div>
              <h4 className="font-royal text-base font-bold text-[#202b26] mb-0.5">
                Black Tie &amp; Formal Attire
              </h4>
              <p className="font-arabic text-sm text-[#32443c] font-bold mb-1.5">
                الزي الرسمي الفاخر
              </p>
              <p className="font-serif-luxury text-xs text-[#42524a]">
                Gentlemen in dark suits or tuxedos; Ladies in elegant evening gowns.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#51665c]/15 text-center font-royal text-[10px] uppercase tracking-widest text-[#854d4a] font-semibold">
              Adults Only Celebration
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
