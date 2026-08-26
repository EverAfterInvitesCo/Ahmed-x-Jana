import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [gatesOpening, setGatesOpening] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: waiting for user tap anywhere on screen
        });
      }
    }
  }, []);

  const handleOpenGates = () => {
    if (gatesOpening) return;
    setGatesOpening(true);
    setTimeout(() => {
      onEnterWebsite();
    }, 1000); // 1s seamless cinematic crossfade
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      // Smoothly initiate transition in the last 0.6 seconds of the video
      if (video.currentTime >= video.duration - 0.6 && !gatesOpening) {
        handleOpenGates();
      }
    }
  };

  return (
    <motion.div
      id="opening-gates-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: gatesOpening ? 0 : 1 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleOpenGates}
      className="fixed inset-0 z-50 w-full h-full bg-[#120f0c] overflow-hidden select-none cursor-pointer flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={MEDIA_ASSETS.gatesVideo}
        playsInline
        muted
        autoPlay
        preload="auto"
        onEnded={handleOpenGates}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover object-center"
      />
    </motion.div>
  );
};

