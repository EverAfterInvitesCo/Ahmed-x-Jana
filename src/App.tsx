import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { OpeningGatesScreen } from './components/OpeningGatesScreen';
import { HeroDovesSection } from './components/HeroDovesSection';
import { QuranicAyahSection } from './components/QuranicAyahSection';
import { CountdownSection } from './components/CountdownSection';
import { RSVPSection } from './components/RSVPSection';
import { FallingLeavesCanvas } from './components/FallingLeavesCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { BookOpen, Clock, Heart } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const handleEnterWebsite = () => {
    setHasEntered(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf5ee] text-[#2c1d0f] selection:bg-[#8a6514]/25 selection:text-[#2c1d0f] overflow-x-hidden font-serif-luxury">
      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL === '/' ? '/bg.png' : import.meta.env.BASE_URL + 'bg.png'})`,
        }}
      />

      {/* Subtle Warm Luminous Overlay to guarantee perfect text contrast everywhere */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(250,245,238,0.65)_100%)]" />

      {/* Background Falling Golden Leaves & Rose Petals */}
      <FallingLeavesCanvas />

      {/* Floating Royal Audio Controller */}
      <AudioPlayer />

      {/* Opening Screen — Fullscreen Royal Gates Video */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningGatesScreen onEnterWebsite={handleEnterWebsite} />
        )}
      </AnimatePresence>

      {/* Main Consecutive Royal Wedding Scroll Site */}
      <motion.main
        id="main-wedding-experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="relative w-full flex flex-col items-center z-10 pb-20"
      >
        {/* 1. Hero Welcome & Royal Announcement */}
        <HeroDovesSection />

        {/* Delicate Royal Filigree Divider */}
        <div className="flex items-center justify-center gap-3 text-[#8a6514]/40 my-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#8a6514]/40" />
          <span className="text-sm tracking-widest">❦</span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#8a6514]/40" />
        </div>

        {/* 2. Holy Quranic Ayah & Families Invitation */}
        <QuranicAyahSection />

        {/* Delicate Royal Filigree Divider */}
        <div className="flex items-center justify-center gap-3 text-[#8a6514]/40 my-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#8a6514]/40" />
          <span className="text-sm tracking-widest">❦</span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#8a6514]/40" />
        </div>

        {/* 3. Date, Live Countdown & Calendar Sync */}
        <CountdownSection targetDate="2027-01-21T18:00:00" />

        {/* Delicate Royal Filigree Divider */}
        <div className="flex items-center justify-center gap-3 text-[#8a6514]/40 my-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#8a6514]/40" />
          <span className="text-sm tracking-widest">❦</span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#8a6514]/40" />
        </div>

        {/* 4. Royal RSVP Confirmation Form */}
        <RSVPSection />

        {/* Closing Branding & Social Footer */}
        <footer className="w-full py-10 mt-12 flex flex-col items-center justify-center gap-4 text-center px-4 border-t border-[#8a6514]/20 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-[#8a6514]/60">
            <div className="h-[1px] w-12 bg-[#8a6514]/30" />
            <span className="text-xs tracking-widest uppercase font-royal">Ever After Invites</span>
            <div className="h-[1px] w-12 bg-[#8a6514]/30" />
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

        {/* Floating Quick Navigation Bar */}
        <nav
          aria-label="Section Navigation"
          className="fixed bottom-5 z-40 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#8a6514]/30 shadow-[0_8px_30px_rgba(138,101,20,0.15)] flex items-center gap-2 text-xs font-royal tracking-wider"
        >
          <button
            onClick={() => scrollTo('quranic-ayah-section')}
            className="px-2.5 py-1 rounded-full text-[#543b22] hover:text-[#2c1d0f] hover:bg-[#8a6514]/10 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8a6514]" />
            <span className="hidden sm:inline">Verse</span>
          </button>

          <span className="text-[#8a6514]/30">•</span>

          <button
            onClick={() => scrollTo('countdown-section')}
            className="px-2.5 py-1 rounded-full text-[#543b22] hover:text-[#2c1d0f] hover:bg-[#8a6514]/10 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Clock className="w-3.5 h-3.5 text-[#8a6514]" />
            <span className="hidden sm:inline">Countdown</span>
          </button>

          <span className="text-[#8a6514]/30">•</span>

          <button
            onClick={() => scrollTo('rsvp-section')}
            className="px-2.5 py-1 rounded-full text-[#543b22] hover:text-[#2c1d0f] hover:bg-[#8a6514]/10 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Heart className="w-3.5 h-3.5 text-[#8a6514]" />
            <span>RSVP</span>
          </button>
        </nav>
      </motion.main>
    </div>
  );
}