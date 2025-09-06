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
    <article className="max-w-3xl mx-auto text-center">
      <h3 className="text-3xl md:text-4xl font-serif tracking-wide text-gray-800">
        {title}
      </h3>

      <FloralDivider />

      {/* 到達後のメッセージ */}
      {reached ? (
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {reachedMessage}
        </p>
      ) : (
        <>
          {/* 残り時間カード */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <TimeBox value={days} label={labels.days} />
            <TimeBox value={pad2(hours)} label={labels.hours} />
            <TimeBox value={pad2(minutes)} label={labels.minutes} />
            <TimeBox value={pad2(seconds)} label={labels.seconds} />
          </div>

          {/* 目標日時の表示 */}
          <p className="mt-8 text-sm text-gray-500">
            目標日時：{new Date(targetMs).toLocaleString("ja-JP", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </>
      )}
    </article>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 md:p-7">
      <div className="text-4xl md:text-5xl font-semibold text-gray-800 font-serif">
        {value}
      </div>
      <div className="mt-2 text-xs md:text-sm tracking-widest text-gray-500 uppercase">
        {label}
      </div>
    </div>
  );
}
