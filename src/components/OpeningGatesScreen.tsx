import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpenGates = () => {
    if (isPlayingVideo) return;
    setIsPlayingVideo(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => console.log('Video play error:', err));
    }

    // Trigger audio playback instantly on user touch
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));
  };

  const handleVideoEnded = () => {
    // Automatically enter the website once the gates video finishes playing
    onEnterWebsite();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={handleOpenGates}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ee] overflow-hidden cursor-pointer"
    >
      {/* 1. Static Image Thumbnail (Shown immediately on mobile without blank loading lags) */}
      {!isPlayingVideo && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={`${import.meta.env.BASE_URL === '/' ? '/gate-thumb.png' : import.meta.env.BASE_URL + 'gate-thumb.png'}`}
            alt="Gates Thumbnail"
            className="w-full h-full object-cover"
          />
          {/* Elegant raw text positioned in the sky */}
          <div className="absolute top-[16%] sm:top-[14%] inset-x-0 z-10 flex flex-col items-center text-center px-4 pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="font-royal text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] text-[#543b22]/90 font-medium drop-shadow-sm"
            >
              Tap to open the gate
            </motion.p>
          </div>
        </div>
      )}

      {/* 2. Actual Video (Swaps in and plays seamlessly the moment the user taps) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
          isPlayingVideo ? 'opacity-100' : 'opacity-0'
        }`}
        src={MEDIA_ASSETS.gatesVideo}
      />
    </motion.div>
  );
};