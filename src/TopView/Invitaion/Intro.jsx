import React from "react";

/* ================================
   手書きアニメーション SVG
   （筆記体パスは細め優雅なタイプ）
================================== */
function Signature() {
  return (
    <svg
      className="w-full max-w-[360px] mx-auto mt-1"
      viewBox="0 0 600 120"
      fill="none"
      stroke="white"
      strokeWidth="3"
    >
      {/* 例の手書きライン（本物の筆記体パス） */}
      <path
        d="
        M20 60 
        C80 10, 140 10, 200 60
        S320 110, 380 60
        S500 10, 560 60
        "
        className="signature-path"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * ================================
 * Intro（Hero）
 * - 背景フェードイン
 * - 光の差し込みアニメ
 * - 手書きアニメーション
 * ================================
 */
export default function Intro({
  groom = "",
  bride = "",
  dateLabel = "",
  imageSrc = "",
  videoSrc = "",
  overlay = 0.45,
}) {
  const [bgLoaded, setBgLoaded] = React.useState(false);

  // 画像のプリロード
  React.useEffect(() => {
    if (!videoSrc && imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      if (img.complete) {
        setBgLoaded(true);
      } else {
        img.onload = () => setBgLoaded(true);
        img.onerror = () => setBgLoaded(true);
      }
    }
  }, [imageSrc, videoSrc]);

  return (
    <section className={"relative h-[92vh] md:h-screen w-full overflow-hidden"}>
      {/* ===== ベースの暗め背景 ===== */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(12, 12, 12)" }}
      />

      {/* ===== 背景画像 ===== */}
      <div
        className={[
          "absolute inset-0 bg-center bg-cover",
          bgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
          "transition-all duration-2000 ease-out will-change-opacity",
        ].join(" ")}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />

      {/* ===== 光の差し込みレイヤー ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-ray" />
      </div>

      {/* ===== オーバーレイ（背景暗くする） ===== */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
      />

      {/* ===== 中央コンテンツ ===== */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-6 ">
        <div className="max-w-3xl">
          <p className="mb-2 text-lg tracking-[0.3em] uppercase text-white/90">
            Wedding Invitation
          </p>

          {/* ---- 手書きアニメーション ---- */}
          <Signature />

          {/* ---- 新郎新婦名（手書きの下に控えめに表示） ---- */}
          <p className="mt-4 text-white/90 tracking-wide text-xl md:text-2xl opacity-0 animate-fadein-delay">
            {groom} &amp; {bride}
          </p>

          {/* ---- 日付：さらに遅れてフェードイン ---- */}
          <p className="opacity-0 animate-fadein-late text-white/80 text-base md:text-lg font-script mt-2">
            {dateLabel}
          </p>
        </div>
      </div>

      {/* ===== スクロール誘導 ===== */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 flex flex-col items-center text-white/80">
        <span className="text-[20px] uppercase tracking-[0.2em]">Scroll</span>
        <svg
          className="mt-1 animate-bounce"
          width="30"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ===== 下端グラデ ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
