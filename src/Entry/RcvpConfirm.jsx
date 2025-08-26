import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const GIFT_MAP = {
  g1: "カタログギフト A（5,000円相当）",
  g2: "バスタオルセット（今治）",
  g3: "コーヒー詰め合わせ（3種）",
};

export default function RcvpConfirm() {
  const { data, back, submitToServer, resetAll, goPayment } = useOutletContext();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // 最終検証（URL直打ち対策）
  const finalErrors = useMemo(() => {
    const e = {};
    if (!data.lastName?.trim() || !data.firstName?.trim()) e.name = "氏名が未入力です";
    if (data.attendance !== "attend" && data.attendance !== "absent") e.att = "出欠が未選択です";
    if (data.attendance === "attend") {
      if (!data.giftId) e.gift = "引き出物が未選択です";
      if (!/^\d{7}$/.test(data.delivery.postal || "")) e.postal = "郵便番号は7桁数字です";
      if (!data.delivery.address1?.trim()) e.addr = "住所が未入力です";
      if (data.payment !== "bank" && data.payment !== "on_site") e.pay = "ご祝儀の方法が未選択です";
    } else {
      if (data.giveGift !== "yes" && data.giveGift !== "no") e.giveGift = "ご祝儀の意向が未選択です";
    }
    return e;
  }, [data]);

  const isOK = Object.keys(finalErrors).length === 0;

  const handleSubmit = async () => {
    setError("");
    if (!isOK) {
      setError("未入力の項目があります。前の画面に戻って修正してください。");
      return;
    }
    try {
      setSending(true);
      await submitToServer();
      setSending(false);
      alert("送信しました。ありがとうございました！");
      resetAll();
    } catch (err) {
      setSending(false);
      setError(err.message || "送信中にエラーが発生しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold">入力内容の確認</h2>
        <p className="text-sm text-gray-600 mt-1">以下の内容で送信します。修正があれば戻るで編集してください。</p>
      </header>

      {/* サマリー */}
      <section className="rounded-xl border bg-white shadow-soft p-5 space-y-3 text-sm">
        <Row label="お名前" value={`${data.lastName} ${data.firstName}`} />
        <Row label="出欠" value={data.attendance === "attend" ? "出席" : "欠席"} />
        {data.attendance === "attend" ? (
          <>
            <Row label="アレルギー" value={data.allergy || "-"} />
            <Row label="引き出物" value={GIFT_MAP[data.giftId] || "-"} />
            <Row label="郵便番号" value={data.delivery.postal || "-"} />
            <Row label="住所" value={`${data.delivery.address1 || ""} ${data.delivery.address2 || ""}`.trim() || "-"} />
            <Row label="ご祝儀" value={data.payment === "bank" ? "銀行振込（事前）" : "当日受付"} />
          </>
        ) : (
          <>
            <Row label="ご祝儀の意向" value={data.giveGift === "yes" ? "渡す（振込案内）" : "見送り"} />
          </>
        )}

        {/* エラーがあれば表示 */}
        {Object.keys(finalErrors).length > 0 && (
          <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
            <div className="font-semibold mb-1">未入力・未選択の項目があります</div>
            <ul className="list-disc pl-5 space-y-1">
              {Object.values(finalErrors).map((m, i) => (<li key={i}>{m}</li>))}
            </ul>
            <div className="mt-2">
              <button className="text-sm text-brand-700 underline" onClick={goPayment}>
                「ご祝儀の送付方法」へ戻る
              </button>
            </div>
          </div>
        )}
      </section>

      {/* アクション */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3 justify-center">
        <button type="button" className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50" onClick={back}>
          戻る
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={sending}
          className="rounded-full px-6 py-2 text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {sending ? "送信中..." : "この内容で送信"}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 text-gray-500">{label}</div>
      <div className="col-span-2 font-medium break-words">{value || "-"}</div>
    </div>
  );
}
