import React, { useEffect, useMemo, useState } from "react";
import countdownConfig from "../../data/Countdown/countdown.config";

// 花風の飾り線（Messageと同じ雰囲気）
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

const pad2 = (n) => String(n).padStart(2, "0");

function diffParts(targetMs, nowMs) {
  let diff = Math.max(0, targetMs - nowMs);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return { days, hours, minutes, seconds, reached: sec === 0 };
}

// --- 見た目用の部品 ------------------------------------
function DayCircle({ value, label = "DAYS" }) {
  const len = String(value).length;
  const sizeClass =
    len >= 4 ? "text-5xl md:text-6xl" :
    len === 3 ? "text-6xl md:text-7xl" :
                "text-7xl md:text-8xl";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="rounded-full ring-1 ring-gray-200/50 bg-white/60 w-44 h-44 md:w-52 md:h-52 flex flex-col items-center justify-center">
        {/* 数字 */}
        <span
          className={`font-serif ${sizeClass} font-semibold text-gray-800 tabular-nums leading-tight`}
        >
          {value}
        </span>
        {/* ラベル（円の中に小さく表示） */}
        <span className="mt-1 text-xs md:text-sm tracking-[0.25em] text-gray-500 uppercase">
          {label}
        </span>
      </div>

      {/* 外周の薄いリング */}
      <div className="absolute inset-0 rounded-full ring-1 ring-gray-100/40 scale-[1.06] pointer-events-none" />
    </div>
  );
}


function UnitBox({ value, label }) {
  return (
    <div className="bg-white/60 rounded-2xl shadow-sm ring-1 ring-gray-100 px-6 py-5 md:px-7 md:py-6 text-center">
      <div className="text-3xl md:text-4xl font-semibold text-gray-800 font-serif tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[10px] md:text-xs tracking-[0.25em] text-gray-500 uppercase">
        {label}
      </div>
    </div>
  );
}

// --------------------------------------------------------

export default function Countdown() {
  const { targetISO, title, labels, reachedMessage } = countdownConfig;
  const targetMs = useMemo(() => new Date(targetISO).getTime(), [targetISO]);

  const [nowMs, setNowMs] = useState(() => Date.now());
  const { days, hours, minutes, seconds } = diffParts(targetMs, nowMs);
  const reached = targetMs - nowMs <= 0;

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <article className="max-w-4xl mx-auto text-center" aria-live="polite">
      <h3 className="text-8xl md:text-4xl font-serif tracking-wide text-gray-800">
        {title}
      </h3>

      <FloralDivider />

      {reached ? (
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {reachedMessage}
        </p>
      ) : (
        <>
          {/* 上段：Days を大きな円で */}
          <div className="flex justify-center mb-8 md:mb-10">
            <DayCircle value={days} label={labels.days} />
          </div>

          {/* 下段：Hours / Minutes / Seconds を横並び（モバイル2列→PC3列） */}
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <UnitBox value={pad2(hours)} label={labels.hours} />
            <UnitBox value={pad2(minutes)} label={labels.minutes} />
            <UnitBox value={pad2(seconds)} label={labels.seconds} />
          </div>
        </>
      )}
    </article>
  );
}
