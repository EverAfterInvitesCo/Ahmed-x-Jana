import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleTapToEnter = () => {
    if (hasStarted) return;
    setHasStarted(true);

    // Start song synchronously within the user tap gesture
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        onEnterWebsite();
      });
    } else {
      onEnterWebsite();
    }
  };

  const handleVideoEnded = () => {
    onEnterWebsite();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
      onClick={handleTapToEnter}
      className="fixed inset-0 z-50 bg-[#202b26] overflow-hidden cursor-pointer"
    >
      {/* Static Nile Thumbnail shown immediately until tapped */}
      {!hasStarted && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={MEDIA_ASSETS.introThumb}
            alt="Nile sunset view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#18211c]/35 via-transparent to-[#18211c]/25 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <motion.p
              initial={{ opacity: 0.75 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="font-royal text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] text-[#fbf6f2] font-medium drop-shadow-[0_2px_12px_rgba(18,24,21,0.85)]"
            >
              Tap to enter
            </motion.p>
          </div>
        </div>
      )}

      {/* Preloaded Intro Video plays seamlessly once tapped */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200 ${
          hasStarted ? 'opacity-100' : 'opacity-0'
        }`}
        src={MEDIA_ASSETS.introVideo}
      />
    </motion.div>
  );
};