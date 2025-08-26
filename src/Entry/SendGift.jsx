// src/components/Entry/SendGift.jsx
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const GIFTS = [
  { id: "g1", title: "カタログギフト A", desc: "総合カタログ（5000円相当）" },
  { id: "g2", title: "バスタオルセット", desc: "今治タオル詰め合わせ" },
  { id: "g3", title: "コーヒー詰め合わせ", desc: "スペシャルティ3種" },
];

export default function SendGift() {
  const { data, setField, setNested, goPayment, back } = useOutletContext();
  const [touched, setTouched] = useState({});
  const errors = useMemo(() => {
    const e = {};
    if (!data.giftId) e.giftId = "1つ選択してください";
    if (!/^\d{7}$/.test(data.delivery.postal || "")) e.postal = "7桁の数字で入力してください";
    if (!data.delivery.address1?.trim()) e.address1 = "住所を入力してください";
    return e;
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ giftId: true, postal: true, address1: true });
    if (isValid) goPayment();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <header>
        <h2 className="text-xl md:text-2xl font-semibold">引き出物の選択</h2>
        <p className="text-sm text-gray-600 mt-1">お好みの品を1つお選びください（後日配送）</p>
        <p className="text-sm text-gray-600 mt-1">簡単な引き出物は当日お渡しします</p>

      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {GIFTS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setField("giftId", g.id)}
            className={`text-left rounded-xl border bg-white p-4 shadow-soft hover:border-brand-500 transition ${
              data.giftId === g.id ? "ring-2 ring-brand-300 border-brand-500" : ""
            }`}
          >
            <div className="font-semibold">{g.title}</div>
            <div className="text-sm text-gray-600 mt-1">{g.desc}</div>
            {data.giftId === g.id && (
              <div className="mt-2 inline-block rounded-full bg-brand-500 text-white text-xs px-2 py-0.5">選択中</div>
            )}
          </button>
        ))}
      </section>
      {touched.giftId && errors.giftId && (
        <p className="text-xs text-red-600">{errors.giftId}</p>
      )}

      <section className="rounded-xl border bg-white shadow-soft p-5">
        <h3 className="font-semibold mb-3">お届け先（後日配送）</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="郵便番号（必須）"
            value={data.delivery.postal}
            onChange={(e)=>setNested(["delivery","postal"], e.target.value)}
            onBlur={()=>setTouched((t)=>({ ...t, postal: true }))}
            error={touched.postal && errors.postal}
            placeholder="1230001"
          />
          <Input
            className="md:col-span-2"
            label="住所（必須）"
            value={data.delivery.address1}
            onChange={(e)=>setNested(["delivery","address1"], e.target.value)}
            onBlur={()=>setTouched((t)=>({ ...t, address1: true }))}
            error={touched.address1 && errors.address1}
            placeholder="渋谷区○○ 1-2-3"
          />
          <Input
            className="md:col-span-3"
            label="建物名・部屋番号（任意）"
            value={data.delivery.address2}
            onChange={(e)=>setNested(["delivery","address2"], e.target.value)}
          />
        </div>
      </section>

      <div className="flex gap-3 justify-center">
        <button type="button" className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50" onClick={back}>
          戻る
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="rounded-full px-6 py-2 text-sm font-semibold  bg-white border hover:bg-gray-50"
        >
          次へ（ご祝儀）
        </button>
      </div>
    </form>
  );
}

function Input({ label, error, className="", ...rest }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <input
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-200 ${error ? "border-red-500" : ""}`}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
