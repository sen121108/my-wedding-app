// src/Message/Message.jsx
import React from "react";
import message from "../../data/Message/message";

// 上部・下部の飾り（シンプル花風SVG）
function FloralDivider({ className = "" }) {
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

export default function Message() {
  const { title, lead, paragraphs, sign } = message;

  return (
    <article className="max-w-2xl mx-auto">
      {/* 見出し */}
      <h3 className="text-center font-serif tracking-wide text-3xl md:text-4xl text-gray-800">
        {title}
      </h3>

      <FloralDivider />

      {/* リード文（最初の一文を少し大きく） */}
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
        {lead}
      </p>

      {/* 本文（ドロップキャップで上品に） */}
      <div className="mt-6 space-y-5 text-gray-700 leading-loose">
        {paragraphs?.[0] && (
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:leading-none first-letter:mr-2 first-letter:float-left">
            {paragraphs[0]}
          </p>
        )}
        {paragraphs?.slice(1).map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>

      {/* 署名 */}
      <FloralDivider />
      <div className="text-center mt-2">
        <p className="font-medium text-gray-800">
          {sign?.groom} <span className="mx-1.5">・</span> {sign?.bride}
        </p>
        {sign?.dateLabel && (
          <p className="text-sm text-gray-500 mt-1">{sign.dateLabel}</p>
        )}
      </div>
    </article>
  );
}
