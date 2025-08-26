// src/components/Entry/RsvpEntry.jsx
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function RsvpEntry() {
  const { data, setField, nextFromStep1 } = useOutletContext();
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!data.lastName?.trim()) e.lastName = "姓を入力してください";
    if (!data.firstName?.trim()) e.firstName = "名を入力してください";
    if (data.attendance !== "attend" && data.attendance !== "absent") e.attendance = "出欠を選択してください";
    return e;
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ lastName: true, firstName: true, attendance: true });
    if (isValid) nextFromStep1();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <header className="text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500">E N T R Y</p>
        <h1 className="font-logo text-3xl md:text-4xl font-bold">出席のご回答</h1>
        <p className="mt-2 text-sm text-gray-600">お名前と出欠をご入力ください。</p>
      </header>

      <section className="rounded-xl border bg-white shadow-soft p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="姓（必須）"
            value={data.lastName}
            onChange={(e)=>setField("lastName", e.target.value)}
            onBlur={()=>setTouched((t)=>({ ...t, lastName: true }))}
            error={touched.lastName && errors.lastName}
          />
          <Input
            label="名（必須）"
            value={data.firstName}
            onChange={(e)=>setField("firstName", e.target.value)}
            onBlur={()=>setTouched((t)=>({ ...t, firstName: true }))}
            error={touched.firstName && errors.firstName}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1">ご出欠（必須）</label>
          <div className="flex gap-3">
            <Radio name="attendance" value="attend" checked={data.attendance==="attend"}
                   onChange={()=>setField("attendance","attend")} />
            <Radio name="attendance" value="absent" checked={data.attendance==="absent"}
                   onChange={()=>setField("attendance","absent")} />
          </div>
          {touched.attendance && errors.attendance && (
            <p className="mt-1 text-xs text-red-600">{errors.attendance}</p>
          )}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50"
          onClick={()=>{ setField("lastName",""); setField("firstName",""); setField("attendance",""); setTouched({}); }}
        >
          クリア
        </button>
        <button
          type="submit"
          className="rounded-full px-6 py-2 text-sm font-semibold bg-white border hover:bg-gray-50"
          disabled={!isValid}
        >
          次へ
        </button>
      </div>
    </form>
  );
}

function Input({ label, error, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <input
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-200 ${error ? "border-red-500" : ""}`}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
function Radio({ ...rest }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border px-4 py-2 cursor-pointer">
      <input type="radio" className="accent-brand-600" {...rest} />
      <span className="text-sm">{rest.value === "attend" ? "出席" : "欠席"}</span>
    </label>
  );
}
