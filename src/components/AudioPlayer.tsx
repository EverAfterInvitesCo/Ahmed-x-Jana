import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MEDIA_ASSETS } from '../utils/media';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Soft, elegant background volume

    // Listen for the custom event fired when the guest clicks the opening gates
    const handleSiteEntered = () => {
      if (audio.paused) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay blocked by browser policy:', err));
      }
    };

    window.addEventListener('wedding-site-entered', handleSiteEntered);

    return () => {
      window.removeEventListener('wedding-site-entered', handleSiteEntered);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Playback error:', err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MEDIA_ASSETS.audioTrack}
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#8a6514] border border-[#8a6514]/30 shadow-[0_4px_16px_rgba(138,101,20,0.15)] backdrop-blur-md transition-all duration-300 cursor-pointer group"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse" />
            {/* Subtle animated sound wave rings */}
            <span className="absolute inset-0 rounded-full border border-[#8a6514]/40 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
          </>
        ) : (
          <VolumeX className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </>
  );
};