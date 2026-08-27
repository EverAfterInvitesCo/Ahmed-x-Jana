import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [gatesOpening, setGatesOpening] = useState<boolean>(false);

  const handleOpenGates = () => {
    if (gatesOpening) return;
    setGatesOpening(true);

    // This user interaction instantly unlocks browser audio autoplay policies
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));

    // Wait for the opening transition/animation to finish before removing from DOM
    setTimeout(() => {
      onEnterWebsite();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ee] overflow-hidden text-[#2c1d0f]"
    >
      {/* Background Wallpaper/Pattern matching the site */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL === '/' ? '/bg.png' : import.meta.env.BASE_URL + 'bg.png'})`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md mx-auto">
        {/* Decorative Top Sparkle / Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="w-16 h-16 rounded-full bg-[#8a6514]/10 border border-[#8a6514]/30 flex items-center justify-center mb-6 shadow-sm"
        >
          <Sparkles className="w-7 h-7 text-[#8a6514]" />
        </motion.div>

        {/* Invitation Lead */}
        <motion.span
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-royal text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold mb-3"
        >
          The Wedding Invitation Of
        </motion.span>

        {/* Couple Names */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.35 }}
          className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#2c1d0f] tracking-wide mb-3"
        >
          Ahmed & Jana
        </motion.h1>

        {/* Arabic Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="font-arabic text-xl sm:text-2xl text-[#6b4e18] font-bold mb-6"
        >
          يسعدنا حضوركم ومشاركتنا فرحتنا
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-[#8a6514]/50 w-48 mb-8"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#8a6514]/50" />
          <span className="text-xs tracking-widest">❦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#8a6514]/50" />
        </motion.div>

        {/* Enter Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.75 }}
          onClick={handleOpenGates}
          disabled={gatesOpening}
          className={`relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8a6514] via-[#a8822e] to-[#8a6514] text-white font-royal text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_10px_25px_rgba(138,101,20,0.25)] hover:brightness-110 active:scale-98 transition-all cursor-pointer ${
            gatesOpening ? 'opacity-75 cursor-wait' : ''
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {gatesOpening ? 'Opening Gates...' : 'Open Invitation'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};