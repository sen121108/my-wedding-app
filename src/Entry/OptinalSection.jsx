import React from "react";

export default function OptionalSection({ value, onChange, giftOptions }) {
  return (
    <section className="space-y-4">
      <fieldset className="rounded-2xl border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">二次会</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={value.afterParty === "yes"}
              onChange={() => onChange({ afterParty: "yes" })}
              className="h-4 w-4"
            />
            参加する
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={value.afterParty === "no"}
              onChange={() => onChange({ afterParty: "no" })}
              className="h-4 w-4"
            />
            参加しない
          </label>
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-gray-700">
        <span className="mb-2 block">お連れ様の人数</span>
        <select
          value={value.guestCount}
          onChange={(e) => onChange({ guestCount: e.target.value })}
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
        >
          <option value="0">0名</option>
          <option value="1">1名</option>
          <option value="2">2名</option>
          <option value="3">3名</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-gray-700">
        <span className="mb-2 block">アレルギー</span>
        <input
          type="text"
          value={value.allergy}
          onChange={(e) => onChange({ allergy: e.target.value })}
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
          placeholder="特になければ空欄でOK"
        />
      </label>

      <label className="block text-sm font-medium text-gray-700">
        <span className="mb-2 block">引出物</span>
        <select
          value={value.gift}
          onChange={(e) => onChange({ gift: e.target.value })}
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
        >
          {giftOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {value.gift && (
        <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700">
            <span className="mb-2 block">郵便番号</span>
            <input
              type="text"
              value={value.postal}
              onChange={(e) => onChange({ postal: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            <span className="mb-2 block">住所</span>
            <input
              type="text"
              value={value.address}
              onChange={(e) => onChange({ address: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
            />
          </label>
        </div>
      )}

      <label className="block text-sm font-medium text-gray-700">
        <span className="mb-2 block">ご要望・懸念点</span>
        <textarea
          value={value.note}
          onChange={(e) => onChange({ note: e.target.value })}
          className="min-h-24 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
          placeholder="ご自由にお書きください"
        />
      </label>
    </section>
  );
}
