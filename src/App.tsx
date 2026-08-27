import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { OpeningGatesScreen } from './components/OpeningGatesScreen';
import { HeroDovesSection } from './components/HeroDovesSection';
import { QuranicAyahSection } from './components/QuranicAyahSection';
import { CountdownSection } from './components/CountdownSection';
import { RSVPSection } from './components/RSVPSection';
import { FallingLeavesCanvas } from './components/FallingLeavesCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { AdminRSVPModal } from './components/AdminRSVPModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleEnterWebsite = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen text-[#2c1d0f] selection:bg-[#8a6514]/25 selection:text-[#2c1d0f] overflow-x-hidden font-serif-luxury">
      {/* Background Wallpaper Fixed Across Entire Page */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL === '/' ? '/bg.png' : import.meta.env.BASE_URL + 'bg.png'})`,
        }}
      />

      {/* Unified Gentle Luminous Layer (No harsh section barriers) */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[rgba(250,245,238,0.35)]" />

      {/* Background Falling Golden Leaves & Rose Petals */}
      <FallingLeavesCanvas />

      {/* Floating Top Controls */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          aria-label="Organizer Portal"
          title="Organizer Portal"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#8a6514] border border-[#8a6514]/30 shadow-[0_4px_16px_rgba(138,101,20,0.15)] backdrop-blur-md transition-all duration-300 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
        </button>
        <AudioPlayer />
      </div>

      {/* Opening Screen — Fullscreen Gates */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningGatesScreen onEnterWebsite={handleEnterWebsite} />
        )}
      </AnimatePresence>

      {/* Private Admin Modal */}
      <AdminRSVPModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Main Continuous Seamless Scroll Site */}
      <motion.main
        id="main-wedding-experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="relative w-full flex flex-col items-center z-10 pb-12 bg-transparent"
      >
        {/* 1. Hero Welcome */}
        <HeroDovesSection />

        {/* 2. Holy Quranic Ayah */}
        <QuranicAyahSection />

        {/* 3. Live Countdown & Calendar Sync */}
        <CountdownSection targetDate="2027-01-21T18:00:00" />

        {/* 4. Royal RSVP Form */}
        <RSVPSection />

        {/* Footer with Transparent/Soft Blend */}
        <footer className="w-full py-16 mt-16 flex flex-col items-center justify-center gap-6 text-center px-4 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center gap-3 max-w-xl mx-auto mb-2"
          >
            <p className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#6b4e18] font-bold leading-relaxed drop-shadow-sm">
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمْ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#543b22]/90">
              "May Allah bless you, shower His blessings upon you, and join you both in goodness and peace."
            </p>
          </motion.div>

          <div className="flex items-center gap-3 text-[#8a6514]/60 w-48">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#8a6514]/40" />
            <span className="text-[10px] tracking-widest uppercase font-royal">Ever After Invites</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#8a6514]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#543b22] font-serif tracking-wide">
            Made with love by <span className="font-semibold text-[#2c1d0f]">Ever After Invites</span>
          </p>

          <div className="flex items-center gap-6 text-xs font-royal tracking-widest uppercase mt-1">
            <a
              href="https://www.instagram.com/_everafterinvites_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#543b22] hover:text-[#8a6514] transition-colors"
            >
              Instagram
            </a>
            <span className="text-[#8a6514]/40">•</span>
            <a
              href="https://www.tiktok.com/@_everafterinvites_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#543b22] hover:text-[#8a6514] transition-colors"
            >
              TikTok
            </a>
            <span className="text-[#8a6514]/40">•</span>
            <a
              href="https://www.facebook.com/profile.php?id=61591562833010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#543b22] hover:text-[#8a6514] transition-colors"
            >
              Facebook
            </a>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}