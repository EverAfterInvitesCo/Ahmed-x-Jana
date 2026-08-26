import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const QuranicAyahSection: React.FC = () => {
  return (
    <section
      id="quranic-ayah-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center z-10">
        {/* Decorative Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8a6514]" />
            <Sparkles className="w-4 h-4 text-[#8a6514]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold">
              In The Name of Allah
            </span>
            <Sparkles className="w-4 h-4 text-[#8a6514]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8a6514]" />
          </div>

          {/* Bismillah Calligraphy */}
          <h3 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#6b4e18] font-bold leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h3>
        </motion.div>

        {/* Noble Holy Ayah */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl flex flex-col items-center mb-10"
        >
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-[#2c1d0f] font-bold leading-[2.2] text-center drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] mb-6 px-2">
            « وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ »
          </p>

          <div className="flex items-center gap-3 text-[#8a6514] mb-6">
            <div className="h-[1px] w-12 bg-[#8a6514]/40" />
            <span className="font-serif-luxury text-sm tracking-wider font-semibold">
              سورة الروم • آية ٢١
            </span>
            <div className="h-[1px] w-12 bg-[#8a6514]/40" />
          </div>

          {/* English Translation */}
          <p className="font-serif-luxury italic text-lg sm:text-xl md:text-2xl text-[#44301d] leading-relaxed max-w-xl text-center px-4">
            "And among His signs is that He created for you spouses from among yourselves that you may find tranquility in them; and He placed between you affection and mercy."
          </p>

          <span className="font-royal text-[11px] uppercase tracking-widest text-[#7a581a] font-bold mt-3">
            Surah Ar-Rum • Verse 21
          </span>
        </motion.div>

        {/* Families Invitation Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="flex flex-col items-center text-center max-w-lg px-4"
        >
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#8a6514]/30 flex items-center justify-center mb-3 shadow-xs">
            <Heart className="w-4 h-4 text-[#8a6514]" />
          </div>

          <h4 className="font-royal text-base sm:text-lg font-bold text-[#2c1d0f] tracking-wide mb-1">
            With Joyful Hearts & Grateful Souls
          </h4>

          <p className="font-serif-luxury italic text-sm sm:text-base text-[#543b22] leading-relaxed">
            Mr. Hossam & Family and Mr. Mohamed & Family cordially invite you to celebrate the marriage of their beloved children Ahmed & Jana.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
