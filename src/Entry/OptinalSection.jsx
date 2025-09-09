// src/Entry/components/OptionalSection.jsx
import React from "react";

export default function OptionalSection({ value, onChange, giftOptions }) {
  const showAddress = !!value.gift;

  return (
    <section>
      <div className="flex items-center gap-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <span className="text-xs tracking-widest text-gray-500 uppercase">Optional</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <h3 className="mt-4 text-lg font-serif text-gray-800">任意のご入力（出席の方）</h3>
      <p className="text-xs text-gray-500">
        必要に応じてご記入ください（未記入でも送信できます）
      </p>

      <div className="mt-5 grid gap-5">
        {/* お連れ様の人数 */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">お連れ様の人数</label>
          <select
            value={value.guestCount}
            onChange={(e) => onChange({ guestCount: e.target.value })}
            className="w-full appearance-none rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
          >
            {["0", "1", "2", "3","その他(ご要望・懸念点に詳細をご記入ください)"].map((n) => (
              <option key={n} value={n}>{n} 名</option>
            ))}
          </select>
        </div>

        {/* アレルギー */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">アレルギー</label>
          <textarea
            value={value.allergy}
            onChange={(e) => onChange({ allergy: e.target.value })}
            placeholder="例) 甲殻類アレルギー など"
            className="w-full min-h-[110px] rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
          />
        </div>

        {/* 引出物（ギフト） */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">引出物（ギフト）</label>
          <div className="relative">
            <select
              value={value.gift}
              onChange={(e) => onChange({ gift: e.target.value })}
              className="w-full appearance-none rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
            >
              {giftOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            ※ ギフトを選択いただいた場合は、受け取り先のご住所をご入力ください
          </p>
        </div>

        {/* 住所（gift 入力時に表示） */}
        {showAddress && (
          <div className="grid gap-4 md:grid-cols-[160px_1fr]">
            <div>
              <label className="block text-sm mb-1 text-gray-700">郵便番号</label>
              <input
                value={value.postal}
                onChange={(e) => onChange({ postal: e.target.value })}
                placeholder="150-0001"
                inputMode="numeric"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">住所</label>
              <input
                value={value.address}
                onChange={(e) => onChange({ address: e.target.value })}
                placeholder="東京都渋谷区神宮前 1-2-3 ○○マンション101"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
              />
            </div>
          </div>
        )}

        {/* ご要望・懸念点 */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">ご要望・懸念点</label>
          <textarea
            value={value.note}
            onChange={(e) => onChange({ note: e.target.value })}
            placeholder="ベビーカー持参/途中退席の可能性 など"
            className="w-full min-h-[110px] rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
          />
        </div>
      </div>
    </section>
  );
}
