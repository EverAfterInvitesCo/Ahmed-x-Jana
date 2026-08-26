import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Sparkles, Shirt, Clock } from 'lucide-react';

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
      description: 'An exquisite royal culinary feast served in honor of our esteemed guests.',
    },
    {
      time: '10:00 PM',
      title: 'Cake Cutting & Midnight Festivities',
      titleAr: 'تقطيع كعكة الزفاف والاحتفال',
      description: 'Cutting of the wedding cake followed by joyous melodies and dancing.',
    },
  ];

  const handleOpenMap = () => {
    window.open(
      'https://maps.google.com/?q=The+Grand+Nile+Palace+Cairo+Egypt',
      '_blank',
      'noopener,noreferrer'
    );
  };

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
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8a6514]" />
            <Sparkles className="w-4 h-4 text-[#8a6514]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold">
              The Itinerary & Venue
            </span>
            <Sparkles className="w-4 h-4 text-[#8a6514]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8a6514]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c1d0f] tracking-wide mb-1">
            Evening Programme
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#6b4e18] font-bold mb-2">
            تفاصيل الحفل والبرنامج
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#543b22] max-w-md">
            A night of joy, music, and timeless memories as we celebrate our new beginning
          </p>
        </motion.div>

        {/* Timeline Items (Unboxed consecutive flow) */}
        <div className="w-full max-w-2xl flex flex-col gap-4 sm:gap-6 mb-16 text-left">
          {scheduleItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: idx * 0.1 }}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#8a6514]/20 shadow-[0_4px_16px_rgba(138,101,20,0.06)]"
            >
              {/* Time Column */}
              <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-[#8a6514]/15 border border-[#8a6514]/30 shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#8a6514] mb-0.5" />
                <span className="font-royal text-xs font-bold text-[#2c1d0f] whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              {/* Text Column */}
              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-royal text-sm sm:text-base font-bold text-[#2c1d0f]">
                    {item.title}
                  </h3>
                  <span className="font-arabic text-xs sm:text-sm text-[#6b4e18] font-bold">
                    {item.titleAr}
                  </span>
                </div>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#543b22] leading-relaxed">
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
          transition={{ duration: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl text-left"
        >
          {/* Venue Card */}
          <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#8a6514]/25 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#8a6514] mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-royal text-[11px] uppercase tracking-widest font-bold">
                  The Royal Venue
                </span>
              </div>
              <h4 className="font-royal text-base font-bold text-[#2c1d0f] mb-0.5">
                The Grand Nile Palace Ballroom
              </h4>
              <p className="font-arabic text-sm text-[#6b4e18] font-bold mb-1.5">
                قصر النيل الملكي — القاهرة
              </p>
              <p className="font-serif-luxury text-xs text-[#543b22]">
                Corniche El Nile, Garden City, Cairo, Egypt
              </p>
            </div>

            <button
              onClick={handleOpenMap}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#8a6514] hover:bg-[#70510e] text-white font-royal text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-white" />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Dress Code Card */}
          <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#8a6514]/25 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#8a6514] mb-2">
                <Shirt className="w-4 h-4" />
                <span className="font-royal text-[11px] uppercase tracking-widest font-bold">
                  Dress Code
                </span>
              </div>
              <h4 className="font-royal text-base font-bold text-[#2c1d0f] mb-0.5">
                Black Tie & Royal Formal
              </h4>
              <p className="font-arabic text-sm text-[#6b4e18] font-bold mb-1.5">
                الزي الرسمي الملكي الفاخر
              </p>
              <p className="font-serif-luxury text-xs text-[#543b22]">
                Gentlemen in dark suits or tuxedos; Ladies in elegant evening gowns.
              </p>
            </div>

            <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#8a6514]/10 border border-[#8a6514]/20 text-center font-royal text-[10px] uppercase tracking-widest text-[#7a581a] font-bold">
              Adults Only Celebration
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
