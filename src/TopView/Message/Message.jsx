// src/TopView/Message/Message.jsx
import React from "react";
import message from "../../data/Message/message";
import { Ornament } from "../../components/ui";

export default function Message() {
  const { title, greeting, paragraphs } = message;

  return (
    <article className="w-full">
      {/* 見出し */}
      <h3 className="text-center font-serif tracking-wide text-xl md:text-3xl text-gray-900 mb-3 md:mb-6 font-bold">
        {title}
      </h3>
      {/* 装飾バー - モバイル・デスクトップ両対応 */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
        <div className="flex-1 h-px bg-gray-300 md:bg-gray-200"></div>
      </div>

      {/* 本文 */}
      <div className="space-y-4 md:space-y-5 text-gray-700 leading-relaxed md:leading-loose text-sm md:text-base px-4 md:px-0 text-center">

        {paragraphs?.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>

      <div className="space-y-4 md:space-y-5 text-gray-700 leading-relaxed md:leading-loose text-sm md:text-base px-4 md:px-0 mt-8 md:mt-10 text-center">
        {greeting?.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
          
    </article>
  );
}
