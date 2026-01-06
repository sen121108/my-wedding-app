// src/TopView/Message/Message.jsx
import React from "react";
import message from "../../data/Message/message";
import FloralDivider from "../components/FloralDivider";
import { Ornament } from "../../components/ui";

export default function Message() {
  const { title, lead, paragraphs } = message;

  return (
    <article className="w-full">
      {/* 見出し */}
      <h3 className="text-center font-serif tracking-wide text-2xl md:text-5xl text-gray-900 mb-3 md:mb-6 font-bold">
        {title}
      </h3>

      {/* リード文 */}
      <p className="text-center text-sm md:text-base text-gray-700 leading-relaxed mb-6 md:mb-8 px-4 md:px-0">
        {lead}
      </p>

      {/* 装飾バー - モバイル・デスクトップ両対応 */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
        <div className="flex-shrink-0 w-8 md:w-20">
          <Ornament width={32} />
        </div>
        <div className="flex-1 h-px bg-gray-300 md:bg-gray-200"></div>
        <div className="flex-shrink-0 w-8 md:w-20">
          <Ornament width={32} />
        </div>
      </div>

      {/* 本文 */}
      <div className="space-y-4 md:space-y-5 text-gray-700 leading-relaxed md:leading-loose text-sm md:text-base px-4 md:px-0">
        {paragraphs?.[0] && (
          <p className="first-letter:font-serif first-letter:font-bold first-letter:text-4xl md:first-letter:text-6xl first-letter:leading-none first-letter:mr-1.5 md:first-letter:mr-3 first-letter:float-left first-letter:text-gray-900">
            {paragraphs[0]}
          </p>
        )}
        {paragraphs?.slice(1).map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
    </article>
  );
}
