import React from "react";

/**
 * 汎用 Intro（ヒーロー）
 * - 先にテキストを表示 → 背景（画像/動画）は読み込み後にフェードイン
 * - 画像 or 動画（videoSrc優先）
 * - variant: "full"（起動時） / "normal"（通常ページ上部）
 * - 右下バッジ / full 時スクロール誘導 / CTA（normal想定）
 */
export default function Intro({
  variant = "normal",
  groom = "Haruto",
  bride = "Yui",
  dateLabel = "2025.11.22 Sat",
  imageSrc = "/image/hero.jpeg",
  videoSrc = "",
  overlay = 0.45,
  bottomRightBadge,
  ctaText,
  ctaHref,
}) {
  const isFull = variant === "full";
  const [bgLoaded, setBgLoaded] = React.useState(false);

  // 画像のプリロード（videoSrcが無い場合）
  React.useEffect(() => {
    if (!videoSrc && imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      if (img.complete) {
        // キャッシュヒット即時
        setBgLoaded(true);
      } else {
        img.onload = () => setBgLoaded(true);
        img.onerror = () => setBgLoaded(true); // エラー時でも遅延し続けないように
      }
    }
  }, [imageSrc, videoSrc]);

  // 動画の読み込み完了でフェードイン
  const handleVideoLoaded = React.useCallback(() => setBgLoaded(true), []);

  return (
    <section
      className={
        isFull
          ? "relative h-[92vh] md:h-screen w-full overflow-hidden"
          : "relative h-[46vh] md:h-[54vh] w-full overflow-hidden rounded-xl shadow-soft"
      }
      aria-label="Intro"
    >
      {/* ===== ベースの塗り（最初に見える暗めの背景） ===== */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(12, 12, 12)" }}
      />

      {/* ===== 背景（動画 or 画像） 読み込み後にフェードイン ===== */}
      {videoSrc ? (
        <>
          <video
            className={[
              "absolute inset-0 h-full w-full object-cover",
              // フェードイン + ぼかし解除
              bgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
              "transition-all duration-3000 ease-out will-change-transform will-change-opacity",
            ].join(" ")}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoaded}
          />
          {/* オーバーレイは常時。フェードイン時の明るさ差を抑えるため固定 */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          />
        </>
      ) : (
        <>
          {/* 画像レイヤー（先に透明で載せて、プリロード完了で不透明に） */}
          <div
            className={[
              "absolute inset-0 bg-center bg-cover",
              bgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
              "transition-all duration-3000 ease-out will-change-opacity",
            ].join(" ")}
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          />
        </>
      )}

      {/* ===== 中央テキスト（最初から表示） ===== */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl font-logo">
          <p className="mb-2 text-lg tracking-[0.3em] uppercase text-white/90">
            Wedding Invitation
          </p>

          <h1 className="text-white tracking-wide">
            <span className={isFull ? "block text-5xl md:text-6xl lg:text-7xl" : "block text-4xl md:text-5xl"}>
              {groom} &amp; {bride}
            </span>
          </h1>

          <p className={isFull ? "mt-4 text-white/90 text-lg md:text-2xl" : "mt-3 text-white/90 text-base md:text-lg"}>
            {dateLabel}
          </p>

          {/* CTA（normal向け） */}
          {ctaText && ctaHref && !isFull && (
            <div className="mt-6">
              <a
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-brand-600 transition"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ===== スクロール誘導（fullのみ） ===== */}
      {isFull && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 flex flex-col items-center text-white/80">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <svg className="mt-1 animate-bounce" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* ===== 右下バッジ（任意） ===== */}
      {bottomRightBadge && (
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-white/90 px-2.5 py-1.5 text-[12px] font-semibold text-gray-800 shadow">
          {bottomRightBadge}
        </div>
      )}

      {/* ===== 下端グラデ（馴染ませ） ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
