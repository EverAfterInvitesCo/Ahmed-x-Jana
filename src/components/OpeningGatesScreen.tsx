import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../utils/media';

interface OpeningGatesScreenProps {
  onEnterWebsite: () => void;
}

export const OpeningGatesScreen: React.FC<OpeningGatesScreenProps> = ({ onEnterWebsite }) => {
  const [gatesOpening, setGatesOpening] = useState<boolean>(false);

  const handleScreenClick = () => {
    if (gatesOpening) return;
    setGatesOpening(true);

    // Unlocks browser audio playback policy on user tap/click anywhere
    window.dispatchEvent(new CustomEvent('wedding-site-entered'));

    setTimeout(() => {
      onEnterWebsite();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ee] overflow-hidden cursor-pointer"
    >
      {/* Background Video (Gates Animation) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={MEDIA_ASSETS.gatesVideo}
      />
    </motion.div>
  );
};