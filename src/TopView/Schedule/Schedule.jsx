// src/components/Schedule/ScheduleSection.jsx
import React from "react";
import { SCHEDULE_TEXT, SCHEDULE_ITEMS } from "../../data/Schedule/schedule";

export default function Schedule() {
  return (
    <section id="top-schedule" className="">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">
            {SCHEDULE_TEXT.title}
          </h2>
          {SCHEDULE_TEXT.lead && (
            <p className="text-gray-600 mt-2">{SCHEDULE_TEXT.lead}</p>
          )}
        </header>

        <Timeline items={SCHEDULE_ITEMS} />

        {SCHEDULE_TEXT.note && (
          <p className="mt-8 text-xs text-gray-500 text-center">{SCHEDULE_TEXT.note}</p>
        )}
      </div>
    </section>
  );
}

function Timeline({ items = [] }) {
  return (
    <ol className="relative ml-6 border-l border-gray-200">
      {/* 装飾: グラデーションの縦線 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-1px] top-0 h-12 w-[2px] bg-gradient-to-b from-transparent to-gray-200"
      />
      {items.map((item, idx) => {
        if (item.divider) {
          return <TimelineDivider key={`div-${idx}`} label={item.label} />;
        }
        return <TimelineItem key={idx} {...item} isLast={idx === items.length - 1} />;
      })}
    </ol>
  );
}

function TimelineItem({ time, title, detail, highlight = false, isLast }) {
  return (
    <li className="pl-6 relative">
      {/* ノード（丸） */}
      <span
        className={[
          "absolute -left-3 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white",
          highlight ? "bg-gray-900" : "bg-white border-2 border-amber-300/70",
        ].join(" ")}
        aria-hidden="true"
      >
        {!highlight && <span className="h-2 w-2 rounded-full bg-amber-300/80" />}
      </span>

      <div className="py-4">
        {/* 時刻 + タイトルを横並び */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="text-base md:text-lg font-semibold text-gray-800 tabular-nums font-serif min-w-[5.5rem] text-center">
            {time}
          </div>
          <h3 className="text-lg md:text-xl leading-tight font-serif tracking-wide">
            {title}
          </h3>
        </div>

        {/* 詳細文 */}
        {detail && (
          <p className="mt-2 ml-[5.5rem] text-sm md:text-base text-gray-600 leading-relaxed">
            {detail}
          </p>
        )}

      </div>

      {!isLast && <div className="pb-1" />}
    </li>
  );
}

function TimelineDivider({ label = "" }) {
  return (
    <li className="pl-6 relative">
      <span
        className="absolute -left-3 top-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white border-2 border-amber-200"
        aria-hidden="true"
      >
        <span className="h-0.5 w-3 rounded bg-amber-300" />
      </span>
      <div className="py-5">
        <div className="text-xs tracking-[0.25em] uppercase text-gray-500">{label}</div>
      </div>
    </li>
  );
}
