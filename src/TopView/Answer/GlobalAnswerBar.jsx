// TopView/Answer/GlobalAnswerBar.jsx
import React from "react";
import { createPortal } from "react-dom";

export default function GlobalAnswerBar() {
  // ここでは常に表示（dismissやhideOnPathsは一旦オフ）
  const el = (
    <div
      role="region"
      aria-label="invitation answer bar"
      // 競合を避けるため重要プロパティは inline style に
      style={{
        position: "fixed",
        left: "50%",
        // iOS safe area を考慮（ホームバーに埋もれない）
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        transform: "translateX(-50%) translateZ(0)", // Safariのtransformバグ回避
        zIndex: 2147483647, // 何が来ても勝つ
        maxWidth: "720px",
        width: "92vw",
        borderRadius: 16,
        // 見た目（beige + blur）
        background: "rgba(250,247,243,0.9)",
        color: "#1f2937",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          padding: "10px 14px",
        }}
      >
        <p style={{ flex: 1, margin: 0, fontSize: 14, lineHeight: 1.5 }}>
          ご出席・ご欠席の回答はこちらからお願いします。
        </p>

        <a
          href="/contact"
          style={{
            display: "none",
          }}
          className="sm:inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium hover:underline"
        >
          お問い合わせ
        </a>

        <a
          href="/entry"
          style={{
            background: "#111827",
            color: "#fff",
            borderRadius: 9999,
            padding: "8px 14px",
            fontSize: 14,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          回答する
        </a>
      </div>
    </div>
  );

  // body直下に強制表示（祖先のtransform/overflowの影響を受けない）
  return createPortal(el, document.body);
}
