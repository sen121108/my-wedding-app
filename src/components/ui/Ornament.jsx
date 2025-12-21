import React from 'react';

export default function Ornament({ className = '', color = 'var(--brand-gold)', width = 120 }) {
  return (
    <svg
      className={className}
      width={width}
      height={28}
      viewBox="0 0 400 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 14h120" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      <path d="M280 14h120" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      <g transform="translate(160,1)">
        <path d="M40 6c8-6 16-6 24 0-8 6-16 6-24 0Z" fill={color} opacity="0.95" />
        <circle cx="52" cy="8" r="2.4" fill={color} opacity="0.95" />
      </g>
    </svg>
  );
}
