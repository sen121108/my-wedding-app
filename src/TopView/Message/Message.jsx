// src/Message/Message.jsx
import React from "react";
import message from "../../data/Message/message";
import FloralDivider from "../components/FloralDivider";

export default function Message() {
  const { title, lead, paragraphs} = message;

  return (
    <article className="max-w-2xl mx-auto">
      {/* 見出し */}
      <h3 className="text-center font-serif tracking-wide text-3xl md:text-4xl text-gray-800">
        {title}
      </h3>

  {/* リード文（最初の一文を少し大きく） */}
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
        {lead}
      </p>

  <FloralDivider />

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
    </article>
  );
}
