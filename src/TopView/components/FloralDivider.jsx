import React from "react";

export default function FloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <svg viewBox="0 0 400 24" className="w-64 h-6 opacity-70" aria-hidden="true">
        <path d="M8 12h130M262 12h130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-300" />
        <path d="M200 12c12-12 24-12 36 0-12 12-24 12-36 0Z" fill="currentColor" className="text-gray-300" />
        <circle cx="200" cy="12" r="3" className="text-gray-400" fill="currentColor" />
      </svg>
    </div>
  );
}
