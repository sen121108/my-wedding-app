import React from "react";

export default function RequiredSection({ value, onChange, phoneOk }) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-2 block">お名前</span>
          <input
            type="text"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
            placeholder="例：山田 花子"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          <span className="mb-2 block">電話番号</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
            placeholder="例：090-1234-5678"
          />
          {!phoneOk && value.phone && (
            <p className="mt-1 text-xs text-red-600">8文字以上の数字・記号で入力してください</p>
          )}
        </label>
      </div>

      <fieldset className="rounded-2xl border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">ご出欠</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={value.attendance === "yes"}
              onChange={() => onChange({ attendance: "yes" })}
              className="h-4 w-4"
            />
            出席する
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={value.attendance === "no"}
              onChange={() => onChange({ attendance: "no" })}
              className="h-4 w-4"
            />
            出席しない
          </label>
        </div>
      </fieldset>
    </section>
  );
}
