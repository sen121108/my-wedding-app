// src/components/ui/ArchFrame.jsx
import React from "react";

/**
 * アーチ型フレーム
 * - 上部だけ大きく丸めて半円アーチに
 * - 枠線つき / 角丸下部少し / 影は控えめ
 * - 中身は children で自由に
 */
export default function ArchFrame({ className = "", children }) {
  return (
    <div className="w-full flex items-center justify-center bg-[#faf7f3]">
      <div
        className={[
          // サイズ：モバイルは幅90vw、上限680px。比率はだいたい3:4
          "relative mx-auto w-[100vw] max-w-[680px] ",
          // アーチ：上2つの角を大きく、下はわずかに丸める
          "rounded-t-[50%] rounded-b-[14px] overflow-hidden",
          // 枠線＆薄い影
          "border border-neutral-400/80 shadow-sm",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
