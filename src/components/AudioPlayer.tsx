import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MEDIA_ASSETS } from '../utils/media';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MEDIA_ASSETS.audioTrack);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handleSiteEntered = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback prevented by browser policy:', err));
    };

    window.addEventListener('wedding-site-entered', handleSiteEntered);

    return () => {
      window.removeEventListener('wedding-site-entered', handleSiteEntered);
      audio.pause();
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
    <button
      onClick={togglePlay}
      aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
      title={isPlaying ? 'Mute Music' : 'Play Music'}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#fdf9f7]/90 hover:bg-white text-[#32443c] border border-[#51665c]/30 shadow-[0_4px_16px_rgba(32,43,38,0.12)] backdrop-blur-md transition-all duration-200 cursor-pointer group"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#854d4a]" />
      ) : (
        <VolumeX className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
};