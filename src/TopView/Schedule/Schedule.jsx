// src/components/Schedule/ScheduleSection.jsx
import React from "react";
import { SCHEDULE_TEXT, SCHEDULE_ITEMS } from "../../data/Schedule/schedule";

export default function Schedule() {
  return (
    <section id="top-schedule" className="">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{SCHEDULE_TEXT.title}</h2>
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
      {/* 装飾: グラデーションの縦線（上に薄いフェード） */}
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

function TimelineItem({ time, title, detail, location, link, highlight = false, isLast }) {
  return (
    <li className="pl-6 relative">
      {/* ノード（丸） */}
      <span
        className={[
          "absolute -left-3 top-2 inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white",
          highlight ? "bg-gray-900" : "bg-white border border-gray-300",
        ].join(" ")}
        aria-hidden="true"
      >
        {/* 中心の小ドット（ハイライト時は非表示でフラット） */}
        {!highlight && <span className="h-2 w-2 rounded-full bg-gray-400" />}
      </span>

      {/* コンテンツ */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-3 md:gap-4 py-4">
        {/* 時刻 */}
        <div className="text-sm md:text-base font-semibold text-gray-800 tabular-nums font-serif">
          {time}
        </div>

        {/* 本文カード */}
        <div
          className={[
            "rounded-2xl ring-1 px-4 py-3 md:px-5 md:py-4 shadow-sm bg-white/70 backdrop-blur",
            highlight ? "ring-gray-900/10" : "ring-gray-200",
          ].join(" ")}
        >
          <h3 className="text-base md:text-lg font-semibold leading-tight">
            {title}
            {highlight && (
              <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-gray-300">
                Main
              </span>
            )}
          </h3>

          {detail && <p className="mt-1 text-sm text-gray-600 leading-relaxed">{detail}</p>}

          {(location || link) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              {location && (
                <span className="inline-flex items-center">
                  <span aria-hidden className="mr-1">📍</span>
                  <span className="text-gray-700">{location}</span>
                </span>
              )}
              {link?.href && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center underline hover:opacity-80"
                >
                  {link.label || "詳細"}
                  <span aria-hidden className="ml-1">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 一番下の余白（最後だけ少し小さく） */}
      {!isLast && <div className="pb-1" />}
    </li>
  );
}

function TimelineDivider({ label = "" }) {
  return (
    <li className="pl-6 relative">
      <span
        className="absolute -left-3 top-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-300"
        aria-hidden="true"
      >
        <span className="h-1 w-3 rounded bg-gray-400" />
      </span>
      <div className="py-5">
        <div className="text-xs tracking-widest uppercase text-gray-500">{label}</div>
      </div>
    </li>
  );
}
