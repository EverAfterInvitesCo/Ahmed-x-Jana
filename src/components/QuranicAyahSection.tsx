import React from 'react';
import { motion } from 'motion/react';
import { FloralDivider } from './FloralOrnament';

export const QuranicAyahSection: React.FC = () => {
  return (
    <section
      id="quranic-ayah-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center z-10">
        {/* Decorative Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-8 w-full"
        >
          <FloralDivider className="mb-4" />

          <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#854d4a] font-semibold mb-3">
            In The Name of Allah
          </span>

          {/* Bismillah Calligraphy */}
          <h3 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#32443c] font-bold leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h3>
        </motion.div>

        {/* Noble Holy Ayah */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl flex flex-col items-center mb-10"
        >
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#202b26] font-bold leading-[2.2] text-center mb-6 px-2">
            « وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ »
          </p>

          <div className="flex items-center gap-3 text-[#51665c] mb-6">
            <div className="h-[1px] w-12 bg-[#51665c]/35" />
            <span className="font-serif-luxury text-sm tracking-wider font-semibold">
              سورة الروم · آية ٢١
            </span>
            <div className="h-[1px] w-12 bg-[#51665c]/35" />
          </div>

          {/* English Translation */}
          <p className="font-serif-luxury italic text-lg sm:text-xl md:text-2xl text-[#32443c] leading-relaxed max-w-xl text-center px-4">
            &ldquo;And among His signs is that He created for you spouses from among yourselves that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
          </p>

          <span className="font-royal text-[11px] uppercase tracking-[0.28em] text-[#854d4a] font-semibold mt-3">
            Surah Ar-Rum · Verse 21
          </span>
        </motion.div>

        {/* Families Invitation Note */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center text-center max-w-lg px-6 py-7 rounded-2xl sofitel-surface"
        >
          <h4 className="font-royal text-base sm:text-lg font-bold text-[#202b26] tracking-wide mb-2">
            With Joyful Hearts &amp; Grateful Souls
          </h4>

          <p className="font-serif-luxury italic text-sm sm:text-base text-[#42524a] leading-relaxed">
            Mr. Hossam &amp; Family and Mr. Mohamed &amp; Family cordially invite you to celebrate the marriage of their beloved children Ahmed &amp; Jana.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
