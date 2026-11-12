import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { FloralDivider } from './FloralOrnament';

export const WeddingFooter: React.FC = () => {
  return (
    <footer
      id="wedding-footer"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-8 text-center bg-transparent border-t border-[#51665c]/20"
    >
      <div className="relative max-w-2xl mx-auto flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#b37874]/45 bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_20px_rgba(32,43,38,0.08)] mb-6"
        >
          <span className="font-royal text-lg sm:text-xl font-bold text-[#32443c] tracking-widest">
            A &amp; J
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex flex-col items-center gap-1 mb-6"
        >
          <h4 className="font-royal text-base sm:text-lg font-bold text-[#202b26] tracking-wide">
            Ahmed Hossam &amp; Jana Mohamed
          </h4>
          <span className="font-royal text-xs uppercase tracking-widest text-[#854d4a] font-semibold">
            7 January 2027 · Sofitel, Cairo, Egypt
          </span>
        </motion.div>

        <FloralDivider className="my-3" />

        <p className="font-serif-luxury text-xs text-[#51665c] flex items-center justify-center gap-1.5 mt-2">
          <span>Crafted with love &amp; honor for Ahmed &amp; Jana&apos;s Wedding</span>
          <Heart className="w-3 h-3 text-[#b37874] fill-[#b37874]" />
        </p>
      </div>
    </footer>
  );
};
