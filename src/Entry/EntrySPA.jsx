// src/Entry/EntrySPA.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
  name: "",
  attendance: "", // "yes" | "no"
  allergy: "",
  gift: "",
  note: "",
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

  const canConfirm = useMemo(() => {
    return form.name.trim().length > 0 && (form.attendance === "yes" || form.attendance === "no");
  }, [form.name, form.attendance]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
 
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyEHwxqb66DobpPKUQfM7_pDfu2AxDlCCT-GY3jY21ImPceafyCr6k3U9Eer_34fNw/exec";

    async function postToGas(form) {
    const payload = {
        name: form.name,
        attendance: form.attendance,
        allergy: form.allergy,
        gift: form.gift,
        note: form.note,
        requestId: (typeof crypto!=='undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()))
    };

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
        keepalive: true
    });
    }

    const handleSubmit = async () => {
    setSubmitting(true);
    try {
        await postToGas(form); // res は読まない（no-cors なので読めないのが仕様）
        setConfirmOpen(false);
        alert("ご回答ありがとうございました。送信が完了しました。");
        setForm(initial);
    } catch (e) {
        alert("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
        setSubmitting(false);
    }
    };


  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#faf7f3] via-[#f7f2ea] to-[#f3eee6]">
      {/* ペーパーカード */}
      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* ヘッダー（招待状らしいトップ） */}
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
          <div className="px-6 py-7 md:px-8 md:py-9">
            {/* 基本情報 */}
            <h2 className="text-xl font-serif font-semibold text-gray-800">基本情報</h2>
            <p className="text-sm text-gray-500 mt-1">お名前とご出欠をお選びください</p>

            <div className="mt-5 space-y-5">
              <div>
                <label className="block text-sm mb-1 text-gray-700">お名前 <span className="text-rose-500">*</span></label>
                <input
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="山田 太郎"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
                />
              </div>

              <div>
                <span className="block text-sm mb-2 text-gray-700">ご出欠 <span className="text-rose-500">*</span></span>
                <div className="flex gap-3">
                  <Pill
                    active={form.attendance === "yes"}
                    onClick={() => update({ attendance: "yes" })}
                  >
                    出席
                  </Pill>
                  <Pill
                    active={form.attendance === "no"}
                    onClick={() => update({ attendance: "no" })}
                  >
                    欠席
                  </Pill>
                </div>
              </div>
            </div>

            {/* 任意入力（出席の場合を中心に） */}
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <span className="text-xs tracking-widest text-gray-500 uppercase">Optional</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>

              <h3 className="mt-4 text-lg font-serif text-gray-800">任意のご入力</h3>
              <p className="text-xs text-gray-500">
                出席予定の方は、必要に応じてご記入ください（未記入でも送信できます）
              </p>

              <div className="mt-5 grid gap-5">
                <div>
                  <label className="block text-sm mb-1 text-gray-700">アレルギー</label>
                  <textarea
                    value={form.allergy}
                    onChange={(e) => update({ allergy: e.target.value })}
                    placeholder="例) 甲殻類アレルギー など"
                    className="w-full min-h-[110px] rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">引出物（ギフト）</label>
                  <div className="relative">
                    <select
                      value={form.gift}
                      onChange={(e) => update({ gift: e.target.value })}
                      className="w-full appearance-none rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
                    >
                      {GIFT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">ご要望・懸念点</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => update({ note: e.target.value })}
                    placeholder="ベビーカー持参/途中退席の可能性 など"
                    className="w-full min-h-[110px] rounded-2xl border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800/30"
                  />
                </div>
              </div>
            </div>
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
        <Modal onClose={() => setConfirmOpen(false)} title="入力内容の確認">
          <ul className="space-y-3 text-sm">
            <li><b>お名前：</b>{form.name || "—"}</li>
            <li><b>ご出欠：</b>{form.attendance === "yes" ? "出席" : form.attendance === "no" ? "欠席" : "—"}</li>
            <li><b>アレルギー：</b>{form.allergy || "—"}</li>
            <li><b>引出物：</b>{GIFT_OPTIONS.find(g => g.value === form.gift)?.label || "—"}</li>
            <li><b>ご要望・懸念点：</b>{form.note || "—"}</li>
          </ul>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setConfirmOpen(false)} className="px-5 py-2 rounded-full ring-1 ring-gray-300">
              戻る
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-full bg-gray-900 text-white disabled:opacity-40"
            >
              {submitting ? "送信中..." : "送信する"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/** 丸いピルボタン（出欠） */
function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-5 py-2 rounded-full transition",
        "ring-1",
        active ? "bg-gray-900 text-white ring-gray-900" : "bg-white text-gray-700 ring-gray-300 hover:ring-gray-400",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** 汎用モーダル */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-x-4 top-[10vh] mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-serif font-semibold text-gray-800">{title}</h3>
          <button aria-label="close" onClick={onClose} className="p-2 -m-2 text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
