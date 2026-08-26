import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { MEDIA_ASSETS } from '../utils/media';

export const HeroDovesSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback handler
        });
      }
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('quranic-ayah-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-doves-section"
      className="relative min-h-[92vh] w-full flex flex-col items-center justify-between pt-12 sm:pt-16 pb-8 px-4 text-center overflow-hidden bg-black"
    >
      {/* Background Video - Increased opacity for clear visibility */}
      <video
        ref={videoRef}
        src={MEDIA_ASSETS.dovesVideo}
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
      />

      {/* Lighter, subtle dark overlay so the white/gold text stands out sharply against the video */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Top Monogram Seal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center z-10"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#f3e5ab]/60 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <span className="font-royal text-base sm:text-lg font-bold text-[#f3e5ab] tracking-widest">
            A & J
          </span>
        </div>
      </motion.div>

      {/* Center Main Royal Welcome */}
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center my-auto z-10 px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Upper Title */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#f3e5ab]" />
            <Sparkles className="w-3.5 h-3.5 text-[#f3e5ab]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#f3e5ab] font-bold">
              The Royal Wedding
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f3e5ab]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#f3e5ab]" />
          </div>

          {/* Arabic Names */}
          <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#fef0cd] font-bold leading-relaxed mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            أحمد حسام & جنى محمد
          </p>

          {/* English Names */}
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-3">
            Ahmed Hossam <span className="font-serif-luxury italic font-light text-[#f3e5ab] text-2xl sm:text-3xl md:text-4xl">&</span> Jana Mohamed
          </h1>

          {/* Invitation Statement */}
          <p className="font-serif-luxury italic text-base sm:text-lg text-[#f3efe6] max-w-lg mb-4 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Together with their families, request the honour of your presence to celebrate their holy union
          </p>

          {/* Date & City Badge */}
          <div className="px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-[#f3e5ab]/50 text-[#fef0cd] font-royal text-xs sm:text-sm font-bold tracking-widest shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Thursday, 21 January 2027 • Cairo, Egypt
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="flex flex-col items-center z-10"
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll to wedding invitation details"
          className="flex flex-col items-center gap-1.5 text-[#f3e5ab] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="font-royal text-[10px] uppercase tracking-[0.3em] font-semibold drop-shadow">
            Scroll To Read
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#f3e5ab]" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};