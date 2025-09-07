// src/components/Access/AccessSection.jsx
import React, { useCallback, useMemo, useState } from "react";
import {
  ACCESS_TEXT,
  VENUE,
  ACCESS_ROUTES,
  ACTION_BUTTONS,
} from "../../data/Access/access";

// 便利リンク生成
const buildGoogleMapUrl = (q) => `https://maps.google.com/?q=${q}`;
const buildAppleMapUrl = (q, lat, lng) => {
  if (lat != null && lng != null) return `http://maps.apple.com/?ll=${lat},${lng}&q=${q}`;
  return `http://maps.apple.com/?q=${q}`;
};

export default function AccessMap() {
  const [copied, setCopied] = useState(false);

  const googleUrl = useMemo(() => buildGoogleMapUrl(VENUE.mapQuery), []);
  const appleUrl = useMemo(
    () => buildAppleMapUrl(VENUE.mapQuery, VENUE.lat, VENUE.lng),
    []
  );

  const handleCopy = useCallback(async () => {
    const parts = [VENUE.name, VENUE.addressJa, VENUE.addressLine2].filter(Boolean);
    try {
      await navigator.clipboard.writeText(parts.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }, []);

  return (
    <section id="access" className="">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{ACCESS_TEXT.title}</h2>
          {ACCESS_TEXT.lead && <p className="text-gray-600 mt-2">{ACCESS_TEXT.lead}</p>}
        </header>

        {/* 会場情報 */}
        <div className="rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur shadow-sm p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold">{VENUE.name}</h3>
          <p className="mt-1 text-gray-700">{VENUE.addressJa}</p>
          {VENUE.addressLine2 && (
            <p className="text-gray-700">{VENUE.addressLine2}</p>
          )}

          {/* アクションボタン */}
          <div className="mt-4 flex flex-wrap gap-2">
            {ACTION_BUTTONS.map((btn, idx) => {
              if (btn.kind === "google")
                return (
                  <a
                    key={idx}
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
                  >
                    {btn.label}
                    <span aria-hidden className="ml-1">↗</span>
                  </a>
                );
              if (btn.kind === "apple")
                return (
                  <a
                    key={idx}
                    href={appleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium ring-1 ring-gray-300 bg-white hover:bg-gray-50"
                  >
                    {btn.label}
                    <span aria-hidden className="ml-1">↗</span>
                  </a>
                );
              if (btn.kind === "copy")
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium ring-1 ring-gray-300 bg-white hover:bg-gray-50"
                  >
                    {copied ? "コピーしました" : btn.label}
                  </button>
                );
              return null;
            })}
          </div>

          {/* 地図 */}
          <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-gray-200">
            <div className="aspect-[16/10] md:aspect-[16/9]">
              <iframe
                title="map"
                src={VENUE.mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* アクセス手段 */}
        <div className="mt-8 grid gap-5">
          {ACCESS_ROUTES.map((group, i) => (
            <section key={i} className="rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur shadow-sm p-5 md:p-6">
              <h4 className="text-base md:text-lg font-semibold flex items-center gap-2">
                <span aria-hidden>{group.type === "train" ? "🚉" : group.type === "car" ? "🚗" : "🧭"}</span>
                {group.label}
              </h4>
              <ul className="mt-3 space-y-3">
                {group.items.map((it, j) => (
                  <li key={j} className="grid grid-cols-[1.5rem_1fr] gap-2">
                    <div className="pt-0.5" aria-hidden>{it.icon || "•"}</div>
                    <div>
                      <div className="font-medium">{it.title}</div>
                      {it.detail && <p className="text-sm text-gray-600 mt-0.5">{it.detail}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {ACCESS_TEXT.note && (
          <p className="mt-8 text-xs text-gray-500 text-center">{ACCESS_TEXT.note}</p>
        )}
      </div>
    </section>
  );
}
