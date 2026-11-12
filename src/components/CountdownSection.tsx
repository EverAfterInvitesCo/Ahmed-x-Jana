import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download } from 'lucide-react';
import { TimeRemaining } from '../types';
import { FloralDivider } from './FloralOrnament';

interface CountdownSectionProps {
  targetDate?: string;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDate = '2027-01-07T18:00:00',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const googleCalendarUrl = (() => {
    const title = encodeURIComponent("Ahmed & Jana's Wedding Celebration");
    const details = encodeURIComponent(
      'Celebrating the holy matrimony of Ahmed Hossam & Jana Mohamed at Sofitel Cairo Nile El Gezirah. Join us for a joyous evening of love and prayers.'
    );
    const location = encodeURIComponent('Sofitel Cairo Nile El Gezirah, Cairo, Egypt');
    const start = '20270107T160000Z';
    const end = '20270107T230000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  })();

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ahmed and Jana Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ahmed-jana-wedding-2027@everafterinvites.com',
      'DTSTAMP:20261112T000000Z',
      'DTSTART:20270107T160000Z',
      'DTEND:20270107T230000Z',
      'SUMMARY:Ahmed & Jana Wedding Celebration',
      'DESCRIPTION:Join us to celebrate the marriage of Ahmed Hossam & Jana Mohamed at Sofitel, Cairo.',
      'LOCATION:Sofitel Cairo Nile El Gezirah, Cairo, Egypt',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Ahmed-and-Jana-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown-section"
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center bg-transparent"
    >
      <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 w-full"
        >
          <FloralDivider className="mb-4" />

          <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#854d4a] font-semibold mb-2">
            The Grand Day
          </span>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#202b26] tracking-wide mb-2 text-balance">
            {timeLeft.isExpired ? 'Our Celebration Date' : 'Counting Down to Forever'}
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#42524a]">
            Thursday, 7 January 2027 · 6:00 PM
          </p>
        </motion.div>

        {/* 4 Countdown Dials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-xl mx-auto mb-10"
        >
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center p-3 sm:p-5 rounded-2xl sofitel-surface transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="font-royal tabular-nums text-2xl sm:text-4xl md:text-5xl font-bold text-[#202b26] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-royal text-[9px] sm:text-[11px] uppercase tracking-widest text-[#854d4a] font-semibold mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Calendar Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b37874] hover:bg-[#854d4a] text-white font-royal text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Save to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadICS}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/85 hover:bg-white text-[#202b26] border border-[#51665c]/30 font-royal text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4 text-[#32443c]" />
            <span>Download .ICS (Apple/Outlook)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};