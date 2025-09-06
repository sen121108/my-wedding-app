// src/components/SectionWithBg.jsx
import React from "react";

/**
 * 子要素の背後に画像を敷きつつ、薄いオーバーレイを掛けるラッパー
 * - 画像は <img> で挿入（背景画像よりパフォーマンス制御しやすい）
 * - overlay は 0〜1 で濃さを指定
 * - tint は "black" | "white" | "beige" など簡易指定（必要なら色拡張OK）
 */
export default function SectionWithBg({
  imageSrc,
  overlay = 0.65,     // 0:透明 〜 1:真っ黒
  tint = "white",     // "black" | "white" | "beige"
  rounded = "rounded-3xl",
  ring = "ring-1 ring-gray-100",
  shadow = "shadow-lg",
  className = "",
  children,
}) {
  const tintClass =
    tint === "black"
      ? "bg-black"
      : tint === "beige"
      ? "bg-[#faf7f3]"
      : "bg-white";

  return (
    <div className={`relative overflow-hidden ${rounded} ${ring} ${shadow} ${className}`}>
      {/* 背景画像（薄く・ぼかし弱めはお好みで） */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* オーバーレイ（画像を“薄く”する） */}
      <div
        className={`absolute inset-0 ${tintClass}`}
        style={{ opacity: overlay }}
      />

      {/* コンテンツ本体（相対配置で上に載せる） */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
