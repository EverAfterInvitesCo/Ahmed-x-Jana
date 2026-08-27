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
      // Play the video on user interaction
      video.play().catch((err) => console.log('Video play error:', err));
    }

    // Trigger the audio event instantly
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));

    // Wait for the gates video to open before entering the site
    setTimeout(() => {
      onEnterWebsite();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={handleOpenGates}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ee] overflow-hidden cursor-pointer group"
    >
      {/* Background Video (Paused initially on frame 0) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={MEDIA_ASSETS.gatesVideo}
      />

      {/* Elegant instruction text positioned in the upper sky area of the video */}
      <div className="absolute top-[18%] sm:top-[15%] z-10 flex flex-col items-center text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          className="px-6 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-[#8a6514]/30 shadow-[0_4px_20px_rgba(138,101,20,0.2)]"
        >
          <span className="font-royal text-xs sm:text-sm uppercase tracking-[0.3em] text-[#6b4e18] font-bold">
            Tap anywhere to open gates
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};