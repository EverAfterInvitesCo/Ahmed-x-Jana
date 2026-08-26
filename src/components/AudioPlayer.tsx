import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  // Gentle romantic harp & piano generative melody synthesizer
  const playRomanticChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;
      }

      // Romantic chord progressions in D Major / F# Minor (Fairytale classical wedding mood)
      const chordNotes = [
        [146.83, 220.00, 277.18, 369.99, 440.00], // D3, A3, C#4, F#4, A4
        [185.00, 220.00, 277.18, 329.63, 440.00], // F#3, A3, C#4, E4, A4
        [196.00, 246.94, 293.66, 369.99, 493.88], // G3, B3, D4, F#4, B4
        [220.00, 277.18, 329.63, 440.00, 554.37], // A3, C#4, E4, A4, C#5
      ];

      let chordIndex = 0;

      const triggerArpeggio = () => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const startTime = ctx.currentTime + idx * 0.35;
          const duration = 3.5;

          noteGain.gain.setValueAtTime(0.0001, startTime);
          noteGain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), startTime + 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

          osc.connect(noteGain);
          noteGain.connect(gainNodeRef.current!);

          osc.start(startTime);
          osc.stop(startTime + duration);
        });
      };

      triggerArpeggio();

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      intervalIdRef.current = window.setInterval(triggerArpeggio, 4000);
      setIsPlaying(true);
      setAudioInitialized(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playRomanticChords();
    }
  };

  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!audioInitialized) {
        playRomanticChords();
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);

    return () => {
      stopAudio();
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [audioInitialized]);

  return (
    <aside
      id="audio-controller-widget"
      aria-label="Wedding Music Player"
      className="fixed top-5 right-5 z-40"
    >
      <button
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Mute romantic wedding music' : 'Play romantic wedding music'}
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
