import React, { useMemo, useState, useEffect } from "react";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwn646IZi-NiEcWbOFZRU1UUjv9nGmSJ9MN0rzPaAvaRwWviHKXKof-n5RD9_H6w1YfZw/exec";

const SUBMITTED_DATA_KEY = "confirmationFormSubmitted";

const initialForm = {
  name: "",
  phone: "",
  allergy: "",
  attendance: "",
  companions: "",
  remarks: "",
};

async function postToGas(payload) {
  await fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    }
  });
}

export default function ConfirmationForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    // マウント時にセッションストレージから送信済みデータを読み込む
    const savedData = sessionStorage.getItem(SUBMITTED_DATA_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSubmittedData(parsedData);
        // 送信済みデータをフォームの初期値として設定
        setForm({
            name: parsedData.name || "",
            phone: parsedData.phone || "",
            allergy: parsedData.allergy || "",
            attendance: parsedData.attendance || "",
            companions: parsedData.companions || "",
            remarks: parsedData.remarks || "",
        });
      } catch {
        // パース失敗時は無視
      }
    }
  }, []);

  const isReady = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.attendance
    );
  }, [form.name, form.phone, form.attendance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isReady) return;

    setStatus("submitting");
    try {
      const payload = {
        source: "home-access-form",
        name: form.name.trim(),
        phone: form.phone.trim(),
        allergy: form.allergy.trim(),
        attendance: form.attendance,
        companions: form.companions.trim(),
        remarks: form.remarks.trim(),
        requestId:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
      };

      await postToGas(payload);
      
      // セッションストレージに送信データを保存
      sessionStorage.setItem(SUBMITTED_DATA_KEY, JSON.stringify(payload));
      setSubmittedData(payload);
      
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full px-0 md:px-0">
      <div className="mx-auto w-full max-w-none border-y border-[#d8cdb8] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(249,242,232,0.96))] px-4 py-12 shadow-[0_18px_55px_rgba(95,79,63,0.10)] backdrop-blur sm:px-6 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-[#e7dfd2] bg-white/70 p-6 shadow-[0_8px_30px_rgba(95,79,63,0.06)] sm:p-8 md:p-10">
          {submittedData && (
            <div className="mb-4 rounded-lg bg-emerald-50 p-3 border border-emerald-200 flex items-center justify-between">
              <p className="text-sm font-medium text-emerald-700">✓ ご回答ありがとうございました</p>
            </div>
          )}
          
          <div className="mb-6 flex flex-col items-center text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#a08a6a]">
              RSVP
            </p>
            <h3 className="mt-2 font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-[#5f4f3f]">
              ご出席確認
            </h3>
            <div className="mt-4 h-px w-24 bg-[#d8cdb8]" />
          </div>

          <p className="text-center text-sm leading-7 text-[#78685b] md:text-base">
            7/30までにご回答をお願いします。<br />なお複数名でご出席の場合は代表者の方が一つずつ回答を送信ください
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#6b5a4e]">
                <span className="mb-2 block">お名前</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="例：山田 花子"
                  className="w-full rounded-2xl border border-[#e3d8c7] bg-[#fcfaf7] px-4 py-3.5 text-sm text-[#43372f] outline-none transition focus:border-[#a28a67] focus:bg-white"
                />
              </label>

              <label className="block text-sm font-medium text-[#6b5a4e]">
                <span className="mb-2 block">電話番号</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="例：09012345678"
                  className="w-full rounded-2xl border border-[#e3d8c7] bg-[#fcfaf7] px-4 py-3.5 text-sm text-[#43372f] outline-none transition focus:border-[#a28a67] focus:bg-white"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-[#6b5a4e]">
              <span className="mb-2 block">アレルギー</span>
              <input
                type="text"
                name="allergy"
                value={form.allergy}
                onChange={handleChange}
                placeholder="特になければ空欄でOK"
                className="w-full rounded-2xl border border-[#e3d8c7] bg-[#fcfaf7] px-4 py-3.5 text-sm text-[#43372f] outline-none transition focus:border-[#a28a67] focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-[#6b5a4e]">
              <span className="mb-2 block">ご同行者様のお名前</span>
              <input
                type="text"
                name="companions"
                value={form.companions}
                onChange={handleChange}
                placeholder="例：山田 太郎、山田 花子"
                className="w-full rounded-2xl border border-[#e3d8c7] bg-[#fcfaf7] px-4 py-3.5 text-sm text-[#43372f] outline-none transition focus:border-[#a28a67] focus:bg-white"
              />
              <p className="mt-1 text-xs text-[#8a7a6d]">
                ※同行者がいる場合はご記入ください
              </p>
            </label>

            <label className="block text-sm font-medium text-[#6b5a4e]">
              <span className="mb-2 block">備考・ご連絡事項</span>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                rows={4}
                placeholder="ご質問やご連絡事項などございましたらご記入ください"
                className="w-full rounded-2xl border border-[#e3d8c7] bg-[#fcfaf7] px-4 py-3.5 text-sm text-[#43372f] outline-none transition focus:border-[#a28a67] focus:bg-white resize-none"
              />
            </label>

            <fieldset className="rounded-[24px] border border-[#e7dfd2] bg-[#fbf8f3] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <legend className="px-1 text-sm font-medium text-[#6b5a4e]">
                参加有無
              </legend>
              <div className="mt-3 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-[#6b5a4e]">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={form.attendance === "yes"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#cbbda8] text-[#8a6b4b] focus:ring-[#8a6b4b]"
                  />
                  出席する
                </label>
                <label className="flex items-center gap-2 text-sm text-[#6b5a4e]">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={form.attendance === "no"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#cbbda8] text-[#8a6b4b] focus:ring-[#8a6b4b]"
                  />
                  出席しない
                </label>
              </div>
            </fieldset>

            <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!isReady || status === "submitting"}
                className="inline-flex items-center rounded-full bg-[#6f5640] px-6 py-2.75 text-sm font-medium text-white shadow-[0_6px_18px_rgba(111,86,64,0.18)] transition hover:bg-[#5d4735] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "submitting"
                  ? "送信中..."
                  : status === "success"
                    ? "送信しました"
                    : "送信する"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-600">送信に失敗しました。時間をおいて再度お試しください。</p>
              )}
              {status === "success" && (
                <p className="text-sm text-emerald-700">ありがとうございます。内容を受け付けました。</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
