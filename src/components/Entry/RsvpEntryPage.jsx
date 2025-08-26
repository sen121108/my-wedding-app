// src/components/Entry/RsvpEntryPage.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const initial = {
  // Step1
  lastName: "", firstName: "", attendance: "", // "attend" | "absent"
  // Step2
  allergy: "",
  // Step3
  giftId: "",
  delivery: { postal: "", address1: "", address2: "" },
  // Step4
  payment: "",        // "bank" | "on_site"
  giveGift: "",       // "yes" | "no"（欠席時）
};

const GAS_URL = "<<<GASのWebアプリURL>>>";

export default function RsvpEntryPage() {
  const nav = useNavigate();
  const loc = useLocation();

  // ▼ 最初に data を定義（ここより前で data を触らない）
  const [data, setData] = useState(() => {
    try {
      const s = localStorage.getItem("entryForm");
      return s ? JSON.parse(s) : initial;
    } catch {
      return initial;
    }
  });

  // ローカル保存
  useEffect(() => {
    try {
      localStorage.setItem("entryForm", JSON.stringify(data));
    } catch {}
  }, [data]);

  // ルートガード（URL直叩き対策）
  useEffect(() => {
    // data が未定義になることはこの構成ではないが、保険でガード
    if (!data) return;

    if (loc.pathname.startsWith("/entry/detail") && !data.attendance) {
      nav("/entry", { replace: true });
    }
    if (loc.pathname.startsWith("/entry/gift")) {
      if (data.attendance !== "attend") nav("/entry/payment", { replace: true });
    }
    if (loc.pathname.startsWith("/entry/payment") && !data.attendance) {
      nav("/entry", { replace: true });
    }
    if (loc.pathname.startsWith("/entry/confirm") && !data.attendance) {
      nav("/entry", { replace: true });
    }
  }, [loc.pathname, data, nav]);

  // 子に渡す API
  const api = useMemo(() => ({
    data,
    setField: (k, v) => setData((s) => ({ ...s, [k]: v })),
    setNested: (path, v) =>
      setData((s) => ({ ...s, [path[0]]: { ...s[path[0]], [path[1]]: v } })),
    nextFromStep1: () => {
      if (data.attendance === "attend") nav("/entry/detail");
      else nav("/entry/payment");
    },
    goGift: () => nav("/entry/gift"),
    goPayment: () => nav("/entry/payment"),
    goConfirm: () => nav("/entry/confirm"),
    back: () => nav(-1),
    resetAll: () => {
      try { localStorage.removeItem("entryForm"); } catch {}
      setData(initial);
      nav("/entry");
    },
    submitToServer: async () => {
      const payload = {
        timestamp: new Date().toISOString(),
        lastName: data.lastName,
        firstName: data.firstName,
        attendance: data.attendance,
        allergy: data.allergy,
        giftId: data.giftId,
        postal: data.delivery.postal,
        address1: data.delivery.address1,
        address2: data.delivery.address2,
        payment: data.payment,
        giveGift: data.giveGift,
      };
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      return await res.json();
    },
  }), [data, nav]);

  return (
    <div className="font-body min-h-screen bg-[var(--brand-bg)] text-gray-800">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="font-logo text-xl">RSVP</div>
          <button className="text-sm text-brand-700 hover:underline" onClick={() => nav("/")}>
            トップへ戻る
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 md:py-10">
        {/* ここで context={api} を必ず渡す */}
        <Outlet context={api} />
      </main>
    </div>
  );
}
