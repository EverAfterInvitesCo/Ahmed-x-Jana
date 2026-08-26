import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Sparkles, Clock, MapPin } from 'lucide-react';
import { TimeRemaining } from '../types';

interface CountdownSectionProps {
  targetDate?: string;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDate = '2027-01-21T18:00:00',
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

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Ahmed & Jana's Royal Wedding Celebration");
    const details = encodeURIComponent(
      'Celebrating the holy matrimony of Ahmed Hossam & Jana Mohamed. Join us for a joyous evening of love, prayers, and banquet celebration!'
    );
    const location = encodeURIComponent('The Grand Nile Palace Ballroom, Cairo, Egypt');
    const start = '20270121T160000Z';
    const end = '20270121T230000Z';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ahmed and Jana Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ahmed-jana-wedding-2027@everafterinvites.com',
      'DTSTAMP:20260826T000000Z',
      'DTSTART:20270121T160000Z',
      'DTEND:20270121T230000Z',
      'SUMMARY:Ahmed & Jana Wedding Celebration',
      'DESCRIPTION:Join us to celebrate the marriage of Ahmed Hossam & Jana Mohamed in Cairo.',
      'LOCATION:The Grand Nile Palace Ballroom, Cairo, Egypt',
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
    { label: 'Days', labelAr: 'يوم', value: timeLeft.days },
    { label: 'Hours', labelAr: 'ساعة', value: timeLeft.hours },
    { label: 'Minutes', labelAr: 'دقيقة', value: timeLeft.minutes },
    { label: 'Seconds', labelAr: 'ثانية', value: timeLeft.seconds },
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
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#8a6514]" />
            <Clock className="w-4 h-4 text-[#8a6514]" />
            <span className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#7a581a] font-bold">
              The Grand Day
            </span>
            <Clock className="w-4 h-4 text-[#8a6514]" />
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#8a6514]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c1d0f] tracking-wide mb-1">
            Counting Down to Forever
          </h2>

          <p className="font-arabic text-xl sm:text-2xl text-[#6b4e18] font-bold mb-2">
            العد التنازلي لليلة العمر
          </p>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#543b22]">
            Thursday, 21 January 2027 • 6:00 PM
          </p>
        </motion.div>

        {/* 4 Open Countdown Dials (No enclosing box) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-xl mx-auto mb-10"
        >
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#8a6514]/25 shadow-[0_4px_16px_rgba(138,101,20,0.08)] transition-transform hover:scale-102"
            >
              <span className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-[#2c1d0f] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-royal text-[9px] sm:text-[11px] uppercase tracking-widest text-[#7a581a] font-bold mt-1">
                {unit.label}
              </span>
              <span className="font-arabic text-[11px] sm:text-xs text-[#8a6514] font-medium">
                {unit.labelAr}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8a6514] hover:bg-[#70510e] text-white font-royal text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Save to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadICS}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#2c1d0f] border border-[#8a6514]/30 font-royal text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#8a6514]" />
            <span>Download .ICS (Apple/Outlook)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
