// src/components/Entry/ReceiveMoney.jsx
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const CEREMONY_ISO = "2026-10-10T14:00:00+09:00";
const BANK = { bankName:"◯◯銀行", branch:"△△支店", type:"普通", number:"1234567", holder:"カトウ カズマサ" };

export default function ReceiveMoney() {
  const { data, setField, back, goConfirm } = useOutletContext();
  const isAttend = data.attendance === "attend";
  const isAbsent = data.attendance === "absent";

  const [touched, setTouched] = useState({});
  const errors = useMemo(() => {
    const e = {};
    if (isAttend && data.payment !== "bank" && data.payment !== "on_site") e.payment = "送付方法を選択してください";
    if (isAbsent && data.giveGift !== "yes" && data.giveGift !== "no") e.giveGift = "選択してください";
    return e;
  }, [data, isAttend, isAbsent]);

  const remindDate = useMemo(() => {
    const d = new Date(CEREMONY_ISO);
    d.setMonth(d.getMonth() - 3);
    return `${d.getFullYear()}年${String(d.getMonth()+1).padStart(2,"0")}月${String(d.getDate()).padStart(2,"0")}日`;
  }, []);

  const valid = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ payment: true, giveGift: true });
    if (!valid) return;
    goConfirm()
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <header>
        <h2 className="text-xl md:text-2xl font-semibold">ご祝儀の送付方法</h2>
        {isAttend && <p className="text-sm text-gray-600 mt-1">銀行振込 または 当日受付をご選択ください。</p>}
        {isAbsent && <p className="text-sm text-gray-600 mt-1">欠席の方は、ご祝儀の有無を選択いただけます（任意）。</p>}
      </header>

      {isAttend && (
        <section className="rounded-xl border bg-white shadow-soft p-5">
          <div className="flex flex-col gap-3">
            <Radio name="payment" value="bank"
                   checked={data.payment==="bank"}
                   onChange={()=>setField("payment","bank")} label="銀行振込（事前）" />
            <Radio name="payment" value="on_site"
                   checked={data.payment==="on_site"}
                   onChange={()=>setField("payment","on_site")} label="当日受付でお渡し" />
          </div>
          {touched.payment && errors.payment && (
            <p className="mt-2 text-xs text-red-600">{errors.payment}</p>
          )}
          {data.payment==="bank" && <BankPanel bank={BANK} />}
        </section>
      )}

      {isAbsent && (
        <section className="rounded-xl border bg-white shadow-soft p-5">
          <div className="text-sm text-gray-600 mb-2">ご祝儀について（任意）</div>
          <div className="flex flex-col gap-3">
            <Radio name="giveGift" value="yes"
                   checked={data.giveGift==="yes"}
                   onChange={()=>setField("giveGift","yes")} label="渡す（銀行振込をご案内）" />
            <Radio name="giveGift" value="no"
                   checked={data.giveGift==="no"}
                   onChange={()=>setField("giveGift","no")} label="今回は見送り" />
          </div>
          {touched.giveGift && errors.giveGift && (
            <p className="mt-2 text-xs text-red-600">{errors.giveGift}</p>
          )}

          {data.giveGift==="yes" && (
            <div className="mt-4 rounded-lg border bg-brand-50 p-4 text-sm">
              <div className="font-semibold mb-1">お振込先のご案内（任意）</div>
              <BankInline bank={BANK} />
              <p className="mt-3">
                ※ ご参考までに、<span className="font-semibold">正式なご案内（振込依頼）は挙式の3ヶ月前の {remindDate}</span> にお送りします。
                いま振込いただくことも可能です。
              </p>
            </div>
          )}
        </section>
      )}

      <div className="flex gap-3 justify-center">
        <button type="button" className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50" onClick={back}>
          戻る
        </button>
        <button type="submit" disabled={!valid}
                className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50">
          送信内容を確認する
        </button>
      </div>
    </form>
  );
}

function Radio({ label, ...rest }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border px-4 py-2 cursor-pointer">
      <input type="radio" className="accent-brand-600" {...rest} />
      <span className="text-sm">{label}</span>
    </label>
  );
}

function BankPanel({ bank }) {
  return (
    <div className="mt-4 rounded-lg border bg-brand-50 p-4 text-sm">
      <div className="font-semibold mb-1">お振込先のご案内</div>
      <BankInline bank={bank} />
      <p className="mt-2">※ 振込手数料のご負担をお願いします。</p>
    </div>
  );
}
function BankInline({ bank }) {
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); alert("コピーしました"); }
    catch { alert("コピーに失敗しました。"); }
  };
  const Field = ({ label, value }) => (
    <div className="flex items-center justify-between rounded-md border bg-white px-3 py-2">
      <div>
        <div className="text-[11px] tracking-wider text-gray-500">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
      <button type="button" className="rounded border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>copy(value)}>
        コピー
      </button>
    </div>
  );
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Field label="銀行名" value={bank.bankName} />
      <Field label="支店名" value={bank.branch} />
      <Field label="種別" value={bank.type} />
      <Field label="口座番号" value={bank.number} />
      <Field label="名義" value={bank.holder} />
    </div>
  );
}
