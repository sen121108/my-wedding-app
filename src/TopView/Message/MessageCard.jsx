// src/Message/MessageCard.jsx
import React from "react";

export default function MessageCard({ children, className = "" }) {
  return (
    <div className={`w-full flex justify-center h-200 ${className}`}>
      <div
        className={[
          "w-full max-w-3xl",
          "relative overflow-hidden",
          "bg-[#faf9f5] shadow-md",
          "rounded-xl border border-neutral-300/60",
          "px-6 py-10 md:px-10 md:py-14",
          "flex items-center justify-center",  // ⭐ 追加：中央寄せ
        ].join(" ")}
      >
        {/* === 背景模様（生成したラプンツェル植物フレーム） === */}
        <div
          className="
            absolute inset-0
            bg-[url('/image/message/card_pattern_leaf.png')]
            bg-center bg-cover
            opacity-[0.20]
            pointer-events-none
          "
        />

        {/* === コンテンツ（中央に配置される） === */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
