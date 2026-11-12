import React from 'react';

interface FloralDividerProps {
  className?: string;
}

export const FloralDivider: React.FC<FloralDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#51665c]/35 to-[#b37874]/50" />
      <svg
        width="54"
        height="24"
        viewBox="0 0 54 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left Sage Leaves */}
        <path
          d="M21 12C17 8 11 8 7 12C11 16 17 16 21 12Z"
          fill="#51665c"
          fillOpacity="0.28"
          stroke="#32443c"
          strokeWidth="0.9"
        />
        <path
          d="M17 12C14.5 10 11 10.2 8.5 12"
          stroke="#32443c"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Right Sage Leaves */}
        <path
          d="M33 12C37 8 43 8 47 12C43 16 37 16 33 12Z"
          fill="#51665c"
          fillOpacity="0.28"
          stroke="#32443c"
          strokeWidth="0.9"
        />
        <path
          d="M37 12C39.5 10 43 10.2 45.5 12"
          stroke="#32443c"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Center Velvet Rose */}
        <circle cx="27" cy="12" r="5.2" fill="#e5c3bf" stroke="#9e6360" strokeWidth="0.9" />
        <path
          d="M24.8 11.2C25.5 9.6 28.5 9.6 29.2 11.2C29.8 12.6 28.2 14.3 27 14.3C25.8 14.3 24.2 12.6 24.8 11.2Z"
          fill="#b37874"
          fillOpacity="0.55"
        />
        <circle cx="27" cy="11.8" r="1.4" fill="#854d4a" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#51665c]/35 to-[#b37874]/50" />
    </div>
  );
};

export const FloralCornerSprig: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Delicate stem */}
      <path
        d="M12 162C28 115 58 68 126 26"
        stroke="#51665c"
        strokeOpacity="0.32"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 114C66 105 94 108 122 92"
        stroke="#51665c"
        strokeOpacity="0.26"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Greyish royal green eucalyptus leaves */}
      <ellipse cx="32" cy="134" rx="14" ry="7" transform="rotate(-35 32 134)" fill="#51665c" fillOpacity="0.16" stroke="#32443c" strokeOpacity="0.25" />
      <ellipse cx="64" cy="76" rx="16" ry="7.5" transform="rotate(-55 64 76)" fill="#51665c" fillOpacity="0.18" stroke="#32443c" strokeOpacity="0.25" />
      <ellipse cx="96" cy="96" rx="14" ry="6.5" transform="rotate(-12 96 96)" fill="#51665c" fillOpacity="0.15" stroke="#32443c" strokeOpacity="0.22" />
      <ellipse cx="102" cy="44" rx="15" ry="7" transform="rotate(-28 102 44)" fill="#51665c" fillOpacity="0.18" stroke="#32443c" strokeOpacity="0.24" />
      {/* Velvet pink blossoms */}
      <g opacity="0.58">
        <circle cx="48" cy="100" r="14" fill="#dfbab6" stroke="#9e6360" strokeWidth="0.9" />
        <circle cx="44" cy="96" r="8" fill="#c48e8b" fillOpacity="0.45" />
        <circle cx="51" cy="102" r="6" fill="#b37874" fillOpacity="0.45" />
        <circle cx="48" cy="99" r="3" fill="#854d4a" fillOpacity="0.7" />
      </g>
      <g opacity="0.48">
        <circle cx="80" cy="54" r="10" fill="#ead4d1" stroke="#9e6360" strokeWidth="0.8" />
        <circle cx="80" cy="54" r="4" fill="#b37874" fillOpacity="0.6" />
      </g>
      <g opacity="0.42">
        <circle cx="122" cy="90" r="8.5" fill="#ead4d1" stroke="#9e6360" strokeWidth="0.8" />
        <circle cx="122" cy="90" r="3" fill="#9e6360" fillOpacity="0.6" />
      </g>
    </svg>
  );
};
