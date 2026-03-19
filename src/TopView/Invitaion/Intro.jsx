import React from "react";

/**
 * ================================
 * Intro（Hero - コラージュ型）
 * - 複数写真を重ねるコラージュレイアウト
 * - グラデーション + 光の演出
 * - 新郎新婦名を最優先で表示
 * ================================
 */
export default function Intro({
  groom = "",
  bride = "",
  dateLabel = "",
  bgImageSrc = "/image/herobg.jpg",   // 背景画像（夜空など）
  photoSrc1 = "/image/hero.jpg",    // メイン写真
  photoSrc2 = "/image/profile/bride.jpg",   // サブ写真1
  photoSrc3 = "/image/profile/groom.jpg",   // サブ写真2
  photoSrc4 = "/image/gallery/95B06D12-D06D-4CBD-8C91-C38996A742D0.JPEG", // サブ写真3
  photoSrc5 = "/image/gallery/A6E8768A-0A43-44DA-87FF-53B888967918.JPEG", // サブ写真4
  photoSrc6 = "/image/gallery/E5F9829F-C52E-447B-A86B-5CBCF06974B2.JPEG",  // サブ写真5

}) {
  const [imagesLoaded, setImagesLoaded] = React.useState({
    bg: false,
    main: false,
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
    sub5: false,
  });

  // 画像プリロード
  React.useEffect(() => {
    const loadImage = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImagesLoaded((prev) => ({ ...prev, [key]: true }));
      img.onerror = () => setImagesLoaded((prev) => ({ ...prev, [key]: true }));
    };

    loadImage(bgImageSrc, "bg");
    loadImage(photoSrc1, "main");
    loadImage(photoSrc2, "sub1");
    loadImage(photoSrc3, "sub2");
    loadImage(photoSrc4, "sub3");
    loadImage(photoSrc5, "sub4");
    loadImage(photoSrc6, "sub5");
  }, [bgImageSrc, photoSrc1, photoSrc2, photoSrc3, photoSrc4, photoSrc5, photoSrc6]);

  return (
    <section 
      className="relative h-[92vh] md:h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${bgImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ===== 背景グラデーション（軽いフォールバック） ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/40 to-blue-900/40" />

      {/* ===== グラデーションオーバーレイ（うっすい） ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* ===== 光の差し込みレイヤー ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-ray" />
      </div>

      {/* ===== 写真コラージュレイヤー ===== */}
      
      {/* メイン写真（中央奥） */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.2s ease-out forwards",
        }}
      />

      {/* サブ写真1（左上） */}
      <div
        className="absolute left-[3%] md:left-[6%] top-[6%] md:top-[10%] w-24 h-32 md:w-32 md:h-44 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.4s ease-out 0.2s forwards",
        }}
      />

      {/* サブ写真2（右中央） */}
      <div
        className="absolute right-[3%] md:right-[6%] top-[20%] md:top-[25%] w-28 h-36 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.4s ease-out 0.4s forwards",
        }}
      />

      {/* サブ写真3（左下） */}
      <div
        className="absolute left-[6%] md:left-[8%] bottom-[12%] md:bottom-[16%] w-20 h-28 md:w-28 md:h-40 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.4s ease-out 0.6s forwards",
        }}
      />

      {/* サブ写真4（右下） - 新規追加 */}
      <div
        className="absolute right-[5%] md:right-[7%] bottom-[10%] md:bottom-[14%] w-24 h-32 md:w-32 md:h-44 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc5})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.4s ease-out 0.8s forwards",
        }}
      />

      {/* サブ写真5（中上） - 新規追加 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[8%] md:top-[12%] w-20 h-28 md:w-24 md:h-36 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        style={{
          backgroundImage: `url(${photoSrc6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.4s ease-out 1s forwards",
        }}
      />

      {/* ===== 中央コンテンツ（最優先） ===== */}
      <div className="relative z-20 h-full w-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          {/* ---- メインタイトル（新郎新婦名） ---- */}
          <h1 className="text-white drop-shadow-lg opacity-0 animate-fadein-delay">
            <span className="font-script block text-6xl md:text-7xl tracking-wide">
              {groom} &amp; {bride}
            </span>
          </h1>

          {/* ---- 日付 ---- */}
          <p className="mt-6 text-white/80 text-sm md:text-base tracking-widest opacity-0 animate-fadein-late">
            {dateLabel}
          </p>
        </div>
      </div>

      {/* ===== スクロール誘導 ===== */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex flex-col items-center text-white/70">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <svg
          className="mt-2 animate-bounce"
          width="24"
          height="16"
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
    </section>
  );
}
