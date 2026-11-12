import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { OpeningGatesScreen } from './components/OpeningGatesScreen';
import { HeroDovesSection } from './components/HeroDovesSection';
import { QuranicAyahSection } from './components/QuranicAyahSection';
import { CountdownSection } from './components/CountdownSection';
import { SofitelVenueSection } from './components/SofitelVenueSection';
import { RSVPSection } from './components/RSVPSection';
import { FallingLeavesCanvas } from './components/FallingLeavesCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { AdminRSVPModal } from './components/AdminRSVPModal';
import { FloralCornerSprig, FloralDivider } from './components/FloralOrnament';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleEnterWebsite = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen text-[#202b26] selection:bg-[#b37874]/25 selection:text-[#202b26] overflow-x-hidden font-serif-luxury">
      {/* Velvet Pink & Greyish Royal Green Atmospheric Floral Canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 sofitel-floral-backdrop" />

      {/* Delicate Botanical Floral Corner Vignettes */}
      <div className="fixed top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none z-[1] opacity-70 -scale-y-100">
        <FloralCornerSprig className="w-full h-full" />
      </div>
      <div className="fixed bottom-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none z-[1] opacity-70 -scale-x-100">
        <FloralCornerSprig className="w-full h-full" />
      </div>

      {/* Background Falling Velvet Rose Petals & Sage Leaves */}
      <FallingLeavesCanvas />

      {/* Floating Top Controls */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          aria-label="Organizer Portal"
          title="Organizer Portal"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fdf9f7]/90 hover:bg-white text-[#32443c] border border-[#51665c]/30 shadow-[0_4px_16px_rgba(32,43,38,0.12)] backdrop-blur-md transition-all duration-200 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
        </button>
        <AudioPlayer />
      </div>

      {/* Opening Screen — Nile Drapes Intro Video */}
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
        transition={{ duration: 1.0, ease: 'easeInOut' }}
        className="relative w-full flex flex-col items-center z-10 pb-12 bg-transparent"
      >
        {/* 1. Hero Welcome with Sofitel Venue Video */}
        <HeroDovesSection />

        {/* 2. Holy Quranic Ayah */}
        <QuranicAyahSection />

        {/* 3. Live Countdown & Calendar Sync */}
        <CountdownSection targetDate="2027-01-07T18:00:00" />

        {/* 4. Royal Venue Section — Sofitel & Google Maps */}
        <SofitelVenueSection />

        {/* 5. RSVP Form */}
        <RSVPSection />

        {/* Footer */}
        <footer className="w-full py-16 mt-12 flex flex-col items-center justify-center gap-6 text-center px-4 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center gap-3 max-w-xl mx-auto mb-2"
          >
            <p className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#32443c] font-bold leading-relaxed">
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمْ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#42524a]">
              &ldquo;May Allah bless you, shower His blessings upon you, and join you both in goodness and peace.&rdquo;
            </p>
          </motion.div>

          <FloralDivider />

          <span className="text-[11px] tracking-[0.28em] uppercase font-royal text-[#854d4a] font-semibold">
            Ahmed &amp; Jana · 7 January 2027 · Sofitel Cairo
          </span>

          <p className="text-xs sm:text-sm text-[#42524a] font-serif tracking-wide">
            Made with love by <span className="font-semibold text-[#202b26]">Ever After Invites</span>
          </p>

          <div className="flex items-center gap-6 text-xs font-royal tracking-widest uppercase mt-1">
            <a
              href="https://www.instagram.com/_everafterinvites_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32443c] hover:text-[#854d4a] transition-colors"
            >
              Instagram
            </a>
            <span className="text-[#51665c]/40" aria-hidden="true">·</span>
            <a
              href="https://www.tiktok.com/@_everafterinvites_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32443c] hover:text-[#854d4a] transition-colors"
            >
              TikTok
            </a>
            <span className="text-[#51665c]/40" aria-hidden="true">·</span>
            <a
              href="https://www.facebook.com/profile.php?id=61591562833010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32443c] hover:text-[#854d4a] transition-colors"
            >
              Facebook
            </a>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}