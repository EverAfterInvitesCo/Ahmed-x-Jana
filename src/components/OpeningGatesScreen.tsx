import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpenGates = () => {
    if (isOpening) return;
    setIsOpening(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => console.log('Video play error:', err));
    }

    // Trigger the audio event to start playing adele.mp3
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));

    // Wait for the gates video animation to finish before entering the site
    setTimeout(() => {
      onEnterWebsite();
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={handleOpenGates}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ee] overflow-hidden cursor-pointer"
    >
      {/* Background Video — autoPlay ensures mobile browsers render the first frame immediately */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={MEDIA_ASSETS.gatesVideo}
      />

      {/* Elegant raw text positioned in the sky */}
      {!isOpening && (
        <div className="absolute top-[16%] sm:top-[14%] z-10 flex flex-col items-center text-center px-4 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="font-royal text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] text-[#543b22]/90 font-medium drop-shadow-sm"
          >
            Tap to open the gate
          </motion.p>
        </div>
      )}
    </motion.div>
  );
};