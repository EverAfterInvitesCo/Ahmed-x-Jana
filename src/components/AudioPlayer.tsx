import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Construct robust path for GitHub Pages subpath and local development
    const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
    const audioPath = `${basePath.endsWith('/') ? basePath.slice(0, -1) : basePath}/adele.mp3`;

    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleFirstUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Audio autoplay blocked or waiting for interaction:', err);
          });
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);
    window.addEventListener('keydown', handleFirstUserInteraction);

    return () => {
      cleanupListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Playback failed:', err);
        });
    }
  };

  return (
    <aside
      id="audio-controller-widget"
      aria-label="Wedding Music Player"
      className="fixed top-5 right-5 z-40"
    >
      <button
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Mute wedding music' : 'Play wedding music'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/85 hover:bg-white text-[#44301d] font-royal text-xs tracking-wider border border-[#8a6514]/30 shadow-[0_4px_16px_rgba(138,101,20,0.15)] backdrop-blur-md transition-all duration-300 cursor-pointer select-none"
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#8a6514]" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8a6514] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8a6514]"></span>
              </span>
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-[#8a7a6a]" />
          )}
        </div>

        <span className="hidden sm:inline font-medium text-[11px] uppercase tracking-wider text-[#543b22]">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-0.5">
            <span className="w-0.5 h-2.5 bg-[#8a6514] animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#8a6514] animate-pulse delay-75" />
            <span className="w-0.5 h-2 bg-[#8a6514] animate-pulse delay-150" />
          </div>
        )}
      </button>
    </aside>
  );
};