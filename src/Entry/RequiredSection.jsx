// src/Entry/components/RequiredSection.jsx
import React from "react";

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-5 py-2 rounded-full transition",
        "ring-1",
        active
          ? "bg-gray-900 text-white ring-gray-900"
          : "bg-white text-gray-700 ring-gray-300 hover:ring-gray-400",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function RequiredSection({ value, onChange, phoneOk }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-semibold text-gray-800">基本情報（必須）</h2>
      <p className="text-sm text-gray-500 mt-1">お名前／電話番号／ご出欠をご入力ください</p>

      <div className="mt-5 space-y-5">
        {/* お名前 */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">
            お名前 <span className="text-rose-500">*</span>
          </label>
          <input
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="山田 太郎"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">
            電話番号 <span className="text-rose-500">*</span>
          </label>
          <input
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="090-1234-5678"
            inputMode="tel"
            className={[
              "w-full rounded-2xl border px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30",
              phoneOk ? "border-gray-300" : "border-rose-400",
            ].join(" ")}
          />
          {!phoneOk && value.phone.trim().length > 0 && (
            <p className="mt-1 text-xs text-rose-500">電話番号の形式をご確認ください</p>
          )}
        </div>

        {/* ご出欠 */}
        <div>
          <span className="block text-sm mb-2 text-gray-700">
            ご出欠 <span className="text-rose-500">*</span>
          </span>
          <div className="flex gap-3">
            <Pill
              active={value.attendance === "yes"}
              onClick={() => onChange({ attendance: "yes" })}
            >
              出席
            </Pill>
            <Pill
              active={value.attendance === "no"}
              onClick={() => onChange({ attendance: "no" })}
            >
              欠席
            </Pill>
          </div>
        </div>

        {/* 二次会（attendance === yes のとき必須） */}
        {value.attendance === "yes" && (
          <div>
            <span className="block text-sm mb-2 text-gray-700">
              二次会の参加希望 <span className="text-rose-500">*</span>
            </span>
            <div className="flex gap-3">
              <Pill
                active={value.afterParty === "yes"}
                onClick={() => onChange({ afterParty: "yes" })}
              >
                希望する
              </Pill>
              <Pill
                active={value.afterParty === "no"}
                onClick={() => onChange({ afterParty: "no" })}
              >
                希望しない
              </Pill>
            </div>
              <p className=" pt-3 text-sm text-gray-500 mt-1"> ※参加希望の方は後日ご連絡いたします</p>
          </div>
        )}
      </div>
    </section>
  );
}
