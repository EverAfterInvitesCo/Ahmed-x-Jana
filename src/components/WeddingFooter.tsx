import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export const WeddingFooter: React.FC = () => {
  return (
    <footer
      id="wedding-footer"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-8 text-center bg-transparent border-t border-[#8a6514]/20"
    >
      <div className="relative max-w-2xl mx-auto flex flex-col items-center z-10">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#8a6514]/40 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_20px_rgba(138,101,20,0.12)] mb-6"
        >
          <span className="font-royal text-lg sm:text-xl font-bold text-[#6b4e18] tracking-widest">
            A & J
          </span>
        </motion.div>

        {/* Closing Islamic Prayer */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="font-arabic text-2xl sm:text-3xl text-[#6b4e18] font-bold leading-loose mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
        >
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="font-serif-luxury italic text-base sm:text-lg text-[#543b22] mb-6 max-w-md"
        >
          "May Allah bless you, shower His blessings upon you, and join you both in goodness and peace."
        </motion.p>

        {/* Names & Forever Date */}
        <div className="flex flex-col items-center gap-1 mb-6">
          <h4 className="font-royal text-base sm:text-lg font-bold text-[#2c1d0f] tracking-wide">
            Ahmed Hossam & Jana Mohamed
          </h4>
          <span className="font-royal text-xs uppercase tracking-widest text-[#7a581a] font-semibold">
            21 January 2027 • Cairo, Egypt
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-[#8a6514]/40 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#8a6514]/40" />
          <span className="text-xs">❦</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#8a6514]/40" />
        </div>

        {/* Signature */}
        <p className="font-serif-luxury text-xs text-[#8a7a6a] flex items-center justify-center gap-1.5 mt-2">
          <span>Crafted with love & honor for Ahmed & Jana's Wedding</span>
          <Heart className="w-3 h-3 text-[#8a6514] fill-[#8a6514]" />
        </p>
      </div>
    </footer>
  );
};
