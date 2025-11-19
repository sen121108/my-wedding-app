// src/components/ui/ArchFrame.jsx
import React from "react";

export default function ArchFrame({ className = "", children }) {
  const sparkles = Array.from({ length: 14 });

  return (
    <div className="w-full flex items-center justify-center bg-[#faf7f3] relative overflow-visible">

      {/* === キラキラ粒子（Tailwind） === */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {sparkles.map((_, i) => (
          <div
            key={i}
            className={`
              absolute rounded-full bg-white 
              w-[4px] h-[4px]
              opacity-0
              animate-sparkle-blink
              ${sparklePosition(i)}
            `}
          />
        ))}
      </div>

      {/* === アーチ本体 === */}
      <div
        className={[
          "relative mx-auto w-[100vw] max-w-[680px]",
          "rounded-t-[40%] rounded-b-[14px] ",
          "border border-neutral-400/80 shadow-sm",
          "bg-white",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

/* Tailwindユーティリティで位置指定するための関数 */
function sparklePosition(i) {
  const positions = [
    "top-[-10px] left-[10%]",
    "top-[-20px] right-[18%]",
    "top-[-32px] left-[44%]",
    "bottom-[-16px] left-[28%]",
    "bottom-[-24px] right-[30%]",
    "top-[30%] left-[-14px]",
    "top-[60%] left-[-10px]",
    "top-[22%] right-[-16px]",
    "top-[55%] right-[-12px]",
    "bottom-[28%] left-[-10px]",
    "bottom-[40%] right-[-10px]",
    "top-[-12px] left-[70%]",
    "bottom-[-14px] left-[60%]",
    "bottom-[-12px] right-[10%]",
  ];
  return positions[i];
}
