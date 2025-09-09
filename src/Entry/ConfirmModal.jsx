// src/Entry/components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({
  form,
  giftOptions,
  submitting,
  onBack,
  onSubmit,
}) {
  const giftLabel = giftOptions.find((g) => g.value === form.gift)?.label || "—";

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={onBack} />
      <div className="absolute inset-x-4 top-[10vh] mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-serif font-semibold text-gray-800">入力内容の確認</h3>
          <button
            aria-label="close"
            onClick={onBack}
            className="p-2 -m-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <ul className="space-y-3 text-sm">
            <li><b>お名前：</b>{form.name || "—"}</li>
            <li><b>電話番号：</b>{form.phone || "—"}</li>
            <li>
              <b>ご出欠：</b>
              {form.attendance === "yes" ? "出席" : form.attendance === "no" ? "欠席" : "—"}
            </li>
            {form.attendance === "yes" && (
              <>
                <li>
                  <b>二次会の参加：</b>
                  {form.afterParty === "yes" ? "参加する" : form.afterParty === "no" ? "参加しない" : "—"}
                </li>
                <li><b>お連れ様の人数：</b>{form.guestCount} 名</li>
                <li><b>アレルギー：</b>{form.allergy || "—"}</li>
                <li><b>引出物：</b>{giftLabel}</li>
                {form.gift && (
                  <>
                    <li><b>郵便番号：</b>{form.postal || "—"}</li>
                    <li><b>住所：</b>{form.address || "—"}</li>
                  </>
                )}
                <li><b>ご要望・懸念点：</b>{form.note || "—"}</li>
              </>
            )}
          </ul>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onBack}
              className="px-5 py-2 rounded-full ring-1 ring-gray-300"
            >
              戻る
            </button>
            <button
              onClick={onSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-full bg-gray-900 text-white disabled:opacity-40"
            >
              {submitting ? "送信中..." : "送信する"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
