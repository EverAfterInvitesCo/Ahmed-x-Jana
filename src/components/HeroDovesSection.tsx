import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
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
      className="relative min-h-[94vh] w-full flex flex-col items-center justify-between pt-16 sm:pt-20 pb-12 px-4 text-center overflow-hidden bg-[#202b26]"
    >
      {/* Background Venue Video */}
      <video
        ref={videoRef}
        src={MEDIA_ASSETS.venueVideo}
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-95 pointer-events-none"
      />

      {/* Measured contrast scrim + seamless blend into porcelain-blush page canvas */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(25, 34, 29, 0.72) 0%, rgba(36, 26, 27, 0.44) 48%, rgba(25, 34, 29, 0.70) 84%, #f8f3f0 100%)',
        }}
      />

      {/* Hero Typography */}
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center my-auto z-10 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Upper Kicker */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#e5c3bf]/80" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#f2dad7] font-semibold">
              Together Forever
            </span>
            <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#e5c3bf]/80" />
          </div>

          {/* Couple Names */}
          <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl text-[#fbf6f2] font-semibold tracking-wide mb-4 drop-shadow-[0_2px_14px_rgba(18,24,21,0.55)] text-balance">
            Ahmed Hossam{' '}
            <span className="font-serif-luxury italic font-light text-[#e5c3bf] text-2xl sm:text-4xl md:text-5xl mx-1">
              &amp;
            </span>{' '}
            Jana Mohamed
          </h1>

          {/* Invitation Statement */}
          <p className="font-serif-luxury italic text-base sm:text-xl text-[#f5eae7] max-w-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(18,24,21,0.6)]">
            Together with their families, request the honour of your presence to celebrate their holy union
          </p>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.7 }}
        className="flex flex-col items-center z-10 pb-2"
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll to wedding invitation details"
          className="flex flex-col items-center gap-1.5 text-[#32443c] hover:text-[#854d4a] transition-colors duration-200 cursor-pointer"
        >
          <span className="font-royal text-[10px] uppercase tracking-[0.3em] font-semibold">
            Scroll To Read
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};