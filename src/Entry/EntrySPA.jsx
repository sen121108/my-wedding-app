// src/Entry/EntrySPA.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RequiredSection from "./RequiredSection";
import OptionalSection from "./OptinalSection";
import ConfirmModal from "./ConfirmModal";

/** シンプルな飾り罫（SVG） */
function Flourish({ className = "" }) {
  return (
    <svg viewBox="0 0 600 60" aria-hidden="true" className={className}>
      <path
        d="M10,30 C60,5 120,5 170,30 C220,55 280,55 330,30 C380,5 440,5 490,30 C520,45 560,50 590,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-60"
      />
    </svg>
  );
}

const initial = {
  // 必須
  name: "",
  phone: "",
  attendance: "", // "yes" | "no"
  afterParty: "", // 出席=yesのとき必須 ("yes" | "no")

  // 任意
  allergy: "",
  gift: "", // 入力(選択)があれば住所欄を表示
  note: "",
  guestCount: "0",

  // 住所（gift 入力時に表示）
  postal: "",
  address: "",
};

const GIFT_OPTIONS = [
  { value: "", label: "— 選択してください —" },
  { value: "standard", label: "定番セット" },
  { value: "gourmet", label: "グルメ" },
  { value: "catalog", label: "カタログ" },
  { value: "decline", label: "辞退（お気遣いなく）" },
];

export default function EntrySPA() {
  const [form, setForm] = useState(initial);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  // 必須バリデーション
  const phoneOk = useMemo(() => {
    const v = form.phone.trim();
    // 数字/ハイフン/スペース/国際プレフィックス + を許容（ざっくり）
    return v.length >= 8 && /^[0-9+\-\s()]+$/.test(v);
  }, [form.phone]);

  const canConfirm = useMemo(() => {
    const baseOk = form.name.trim().length > 0 && phoneOk && (form.attendance === "yes" || form.attendance === "no");
    if (!baseOk) return false;
    if (form.attendance === "yes") {
      // 出席の場合は二次会の参加有無が必須
      return form.afterParty === "yes" || form.afterParty === "no";
    }
    return true;
  }, [form.name, phoneOk, form.attendance, form.afterParty]);

  // GAS 送信
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyEHwxqb66DobpPKUQfM7_pDfu2AxDlCCT-GY3jY21ImPceafyCr6k3U9Eer_34fNw/exec";

  async function postToGas(payload) {
    // sendBeacon（優先）
    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(
        GAS_URL,
        new Blob([JSON.stringify(payload)], { type: "text/plain;charset=utf-8" })
      );
      if (ok) return;
    }
    // フォールバック：no-cors fetch（応答は読めない前提）
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        // 必須
        name: form.name,
        phone: form.phone,
        attendance: form.attendance,
        afterParty: form.attendance === "yes" ? form.afterParty : "",

        // 任意
        allergy: form.allergy,
        gift: form.gift,
        note: form.note,
        guestCount: form.guestCount,

        // 住所（gift入力時のみ格納）
        postal: form.gift ? form.postal : "",
        address: form.gift ? form.address : "",

        requestId:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
      };

      await postToGas(payload);
      setConfirmOpen(false);
      alert("ご回答ありがとうございました。送信が完了しました。");
      setForm(initial);
    } catch (e) {
      alert("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  const showOptional = form.attendance === "yes";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#faf7f3] via-[#f7f2ea] to-[#f3eee6]">
      {/* ペーパーカード */}
      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* ヘッダー */}
        <header className="relative text-center">
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <Flourish className="w-64 text-gray-400" />
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-semibold font-serif text-gray-800 tracking-wide">
            Invitation Entry
          </h1>
          <p className="mt-1 text-sm text-gray-500">ご出欠の回答をお願いいたします</p>

          <div className="mt-6 flex justify-center">
            <Flourish className="w-56 text-gray-300" />
          </div>
        </header>

        <section
          className="
            mt-8 rounded-3xl bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            ring-1 ring-gray-200 backdrop-blur
          "
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
          }}
        >
          <div className="px-6 py-7 md:px-8 md:py-9 space-y-10">
            {/* 必須項目 */}
            <RequiredSection
              value={form}
              onChange={update}
              phoneOk={phoneOk}
            />

            {/* 出席のときに任意項目を表示 */}
            {showOptional && (
              <OptionalSection
                value={form}
                onChange={update}
                giftOptions={GIFT_OPTIONS}
              />
            )}
          </div>

          {/* 用紙の下辺に淡い装飾 */}
          <div className="px-6 pb-7 md:px-8">
            <div className="mt-2 flex justify-center">
              <Flourish className="w-40 text-gray-300" />
            </div>
          </div>
        </section>
      </main>

      {/* 右下固定：確認へ */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[92vw] max-w-2xl rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 shadow-lg">
        <div className="px-4 py-3 md:py-3.5 flex items-center gap-3">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ring-1 ring-gray-300 hover:bg-gray-50"
          >
            トップページへ戻る
          </Link>
          <p className="flex-1 text-sm md:text-base text-gray-700">
            入力内容をご確認のうえ送信してください。
          </p>
          <button
            disabled={!canConfirm}
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center rounded-full px-5 py-2 text-sm font-medium bg-gray-900 text-white disabled:opacity-40"
          >
            確認へ
          </button>
        </div>
      </div>

      {/* 確認モーダル */}
      {confirmOpen && (
        <ConfirmModal
          form={form}
          giftOptions={GIFT_OPTIONS}
          submitting={submitting}
          onBack={() => setConfirmOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
