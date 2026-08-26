import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, Share2, ArrowUp, MessageSquareHeart } from 'lucide-react';
import { WishMessage } from '../types';

const INITIAL_WISHES: WishMessage[] = [
  {
    id: '1',
    name: 'Tarek & Nour',
    relation: 'Family',
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير. Wishing you a lifetime of endless joy, love, and divine peace!',
    timestamp: 'Just now',
  },
  {
    id: '2',
    name: 'Dr. Omar & Yasmin',
    relation: 'Dear Friends',
    message: 'To the most radiant couple, Ahmed & Jana! May your home always be filled with laughter, love, and blessings.',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    name: 'Karim & Salma',
    relation: 'Cousin',
    message: 'ألف مبروك لأجمل عروسين في الدنيا! ربنا يسعدكم ويتمم لكم بكل خير وسعادة يا رب.',
    timestamp: 'Yesterday',
  },
];

export const WishesGuestbook: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ahmed_jana_wedding_wishes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish: WishMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'Guest',
      message: message.trim(),
      timestamp: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('ahmed_jana_wedding_wishes', JSON.stringify(updated));

    setName('');
    setRelation('');
    setMessage('');
    setIsSubmitting(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Ahmed & Jana's Wedding Invitation",
          text: 'You are cordially invited to celebrate the marriage of Ahmed Hossam & Jana Mohamed on 21 January 2027 in Cairo!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="guestbook-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8a6514]" />
            <MessageSquareHeart className="w-4 h-4 text-[#8a6514]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold">
              Guestbook
            </span>
            <MessageSquareHeart className="w-4 h-4 text-[#8a6514]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8a6514]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c1d0f] tracking-wide mb-1">
            Blessings & Well Wishes
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#6b4e18] font-bold mb-2">
            سجل التهاني والدعوات المباركة
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#543b22]">
            Leave your warm prayers and love for Ahmed & Jana
          </p>
        </motion.div>

        {/* New Wish Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.0 }}
          onSubmit={handleAddWish}
          className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#8a6514]/30 shadow-[0_10px_30px_rgba(138,101,20,0.08)] flex flex-col gap-3.5 text-left mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="wish-name" className="block font-royal text-[10px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1">
                Your Name *
              </label>
              <input
                id="wish-name"
                type="text"
                required
                placeholder="e.g., Uncle Mostafa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-sm focus:outline-none focus:border-[#8a6514]"
              />
            </div>

            <div>
              <label htmlFor="wish-relation" className="block font-royal text-[10px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1">
                Relation / Title
              </label>
              <input
                id="wish-relation"
                type="text"
                placeholder="e.g., Friend, Cousin"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-sm focus:outline-none focus:border-[#8a6514]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="wish-message" className="block font-royal text-[10px] uppercase tracking-widest text-[#3b2a1a] font-bold mb-1">
              Your Blessing *
            </label>
            <textarea
              id="wish-message"
              required
              rows={3}
              placeholder="Write your heartfelt prayers, love, and wishes for the couple..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#8a6514]/30 text-[#2c1d0f] placeholder:text-[#8a7a6a] font-serif-luxury text-sm focus:outline-none focus:border-[#8a6514] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8a6514] via-[#a8822e] to-[#8a6514] text-white font-royal text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Send Blessing</span>
          </button>
        </motion.form>

        {/* Wishes Stream (Open waterfall on floral background) */}
        <div className="w-full max-w-2xl flex flex-col gap-3.5 text-left mb-12">
          <AnimatePresence>
            {wishes.map((wish, idx) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white/75 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[#8a6514]/20 shadow-[0_4px_16px_rgba(138,101,20,0.06)] flex flex-col justify-between"
              >
                <p className="font-serif-luxury italic text-sm sm:text-base text-[#2c1d0f] leading-relaxed mb-3">
                  "{wish.message}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#8a6514]/15 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-royal font-bold text-[#6b4e18]">{wish.name}</span>
                    {wish.relation && <span className="text-[#8a7a6a]">({wish.relation})</span>}
                  </div>
                  <div className="flex items-center gap-1 text-[#8a6514]">
                    <Heart className="w-3.5 h-3.5 fill-[#8a6514]/30" />
                    <span className="text-[10px] font-sans-clean text-[#8a7a6a]">{wish.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white border border-[#8a6514]/30 text-[#2c1d0f] font-royal text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8a6514]" />
            <span>{copiedShare ? 'Link Copied!' : 'Share Invitation Link'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white border border-[#8a6514]/30 text-[#2c1d0f] font-royal text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#8a6514]" />
          </button>
        </div>
      </div>
    </section>
  );
};
