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
      // 1. Set section background to white
      className="relative min-h-[92vh] w-full flex flex-col items-center justify-between pt-12 sm:pt-16 pb-8 px-4 text-center overflow-hidden bg-white"
    >
      {/* Background Video - Full Opacity, set to object-cover */}
      <video
        ref={videoRef}
        src={MEDIA_ASSETS.dovesVideo}
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
      />

      {/* 2. Blended Text Container - ADD THE CLASS BELOW */}
      <div
        className="w-full max-w-2xl mx-auto text-center flex flex-col items-center my-auto z-10 px-4 py-6"
        style={{ mixBlendMode: 'multiply' }} // This is the magic CSS line
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Upper Title - Change all text to black */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-black" />
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-black font-bold">
              The Royal Wedding
            </span>
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-black" />
          </div>

          {/* Arabic Names - Black Text */}
          <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-black font-bold leading-relaxed mb-2">
            أحمد حسام & جنى محمد
          </p>

          {/* English Names - Black Text */}
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-semibold tracking-wide mb-3">
            Ahmed Hossam <span className="font-serif-luxury italic font-light text-black text-2xl sm:text-3xl md:text-4xl">&</span> Jana Mohamed
          </h1>

          {/* Invitation Statement - Black Text */}
          <p className="font-serif-luxury italic text-base sm:text-lg text-black max-w-lg mb-4 leading-relaxed">
            Together with their families, request the honour of your presence to celebrate their holy union
          </p>

          {/* Date & City Badge - Black Text */}
          <div className="px-5 py-2 rounded-full bg-black/5 border border-black/10 text-black font-royal text-xs sm:text-sm font-bold tracking-widest">
            Thursday, 21 January 2027 • Cairo, Egypt
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator - Black Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="flex flex-col items-center z-10"
        style={{ mixBlendMode: 'multiply' }} // Blend the bottom text too
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll to wedding invitation details"
          className="flex flex-col items-center gap-1.5 text-black hover:opacity-70 transition-opacity duration-300 cursor-pointer"
        >
          <span className="font-royal text-[10px] uppercase tracking-[0.3em] font-semibold">
            Scroll To Read
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-black" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};