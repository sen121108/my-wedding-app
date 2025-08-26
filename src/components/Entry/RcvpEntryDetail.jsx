// src/components/Entry/RcvpEntryDetail.jsx
import { useOutletContext, useNavigate } from "react-router-dom";

export default function RcvpEntryDetail() {
  const { data, setField, goGift, back } = useOutletContext();
  const nav = useNavigate();

  // 欠席なら来ない想定（親でガード済）
  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); goGift(); }}
      className="space-y-6"
    >
      <header>
        <h2 className="text-xl md:text-2xl font-semibold">お食事のアレルギーについて</h2>
        <p className="text-sm text-gray-600 mt-1">該当があればご記入ください（任意）。</p>
      </header>

      <section className="rounded-xl border bg-white shadow-soft p-5">
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">アレルギー・苦手な食材（任意）</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-200"
            value={data.allergy}
            onChange={(e)=>setField("allergy", e.target.value)}
            placeholder="例）甲殻類アレルギー、香草が苦手 など"
          />
        </label>
      </section>

      <header>
        <h2 className="text-xl md:text-2xl font-semibold">その他懸念事項</h2>
        <p className="text-sm text-gray-600 mt-1">気になる点あればご記入ください（任意）。</p>
      </header>

      <section className="rounded-xl border bg-white shadow-soft p-5">
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">懸念点</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-200"
            value={data.allergy}
            onChange={(e)=>setField("allergy", e.target.value)}
            placeholder="子供スペースはあるかなど"
          />
        </label>
      </section>

      <div className="flex gap-3 justify-center">
        <button type="button" className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50" onClick={back}>戻る</button>
        <button type="submit" className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50">
          次へ
        </button>
      </div>
    </form>
  );
}
