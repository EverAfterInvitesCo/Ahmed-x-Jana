import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video
      .play()
      .then(() => {
        window.dispatchEvent(new CustomEvent('wedding-site-entered'));
      })
      .catch(() => {
        // Fallback: if browser restricts autoplay, user tap will start playback
      });
  }, []);

  const handleVideoPlay = () => {
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));
  };

  const handleTap = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {
        onEnterWebsite();
      });
    }
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));
  };

  const handleVideoEnded = () => {
    onEnterWebsite();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
      onClick={handleTap}
      className="fixed inset-0 z-50 bg-[#202b26] overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={handleVideoPlay}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover pointer-events-none"
        src={MEDIA_ASSETS.introVideo}
      />
    </motion.div>
  );
};