import React from "react";
import { getRandomTopImages } from "./invitationConfig";

/**
 * ================================
 * Intro（Hero - コラージュ型）
 * - 複数写真を重ねるコラージュレイアウト
 * - グラデーション + 光の演出
 * - 新郎新婦名を最優先で表示
 * - ランダム画像が3秒ごとに変更
 * ================================
 */
const DEFAULT_CONFIG = {
  groom: "新郎",
  bride: "新婦",
  dateTextJP: "--/--",
  heroBgImage: "",
  heroMainPhoto: "",
  heroSubPhoto1: "",
  heroSubPhoto2: "",
  heroSubPhoto3: "",
  heroSubPhoto4: "",
  heroSubPhoto5: "",
};

// 9枚のサブ写真配置情報（位置、サイズ、アニメーション遅延）
// 被らないようにまだら配置を意識
const PHOTO_POSITIONS = [
  {
    id: "main",
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl transition-shadow",
    delay: "0s",
  },
  // サブ写真 9 枚（main を除く）
  {
    id: "sub1",
    className: "absolute left-[2%] md:left-[4%] top-[8%] md:top-[12%] w-20 h-28 md:w-24 md:h-36 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.2s",
  },
  {
    id: "sub2",
    className: "absolute right-[3%] md:right-[5%] top-[10%] md:top-[15%] w-24 h-32 md:w-28 md:h-40 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.4s",
  },
  {
    id: "sub3",
    className: "absolute left-[7%] md:left-[7%] bottom-[40%] md:bottom-[40%] w-20 h-28 md:w-28 md:h-40 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.6s",
  },
  {
    id: "sub4",
    className: "absolute right-[4%] md:right-[4%] bottom-[40%] md:bottom-[40%] w-24 h-32 md:w-32 md:h-44 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.8s",
  },
  {
    id: "sub5",
    className: "absolute left-[30%] md:left-[35%] top-[5%] md:top-[8%] w-16 h-24 md:w-20 md:h-32 rounded-md overflow-hidden shadow-md transition-shadow",
    delay: "1s",
  },
  {
    id: "sub6",
    className: "absolute right-[25%] md:right-[30%] top-[5%] md:top-[8%] w-16 h-24 md:w-20 md:h-32 rounded-md overflow-hidden shadow-md transition-shadow",
    delay: "0.3s",
  },
  {
    id: "sub7",
    className: "absolute left-[5%] md:left-[8%] bottom-[8%] md:bottom-[12%] w-18 h-26 md:w-24 md:h-36 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.7s",
  },
  {
    id: "sub8",
    className: "absolute right-[5%] md:right-[8%] bottom-[10%] md:bottom-[14%] w-20 h-28 md:w-24 md:h-36 rounded-lg overflow-hidden shadow-lg transition-shadow",
    delay: "0.5s",
  },
  {
    id: "sub9",
    className: "absolute left-1/2 -translate-x-1/2 bottom-[5%] md:bottom-[8%] w-20 h-28 md:w-28 md:h-40 rounded-md overflow-hidden shadow-md transition-shadow",
    delay: "0.9s",
  },
];

// 5～10秒のランダム間隔を取得（より遅い速度）
const getRandomInterval = () => Math.random() * 5000 + 5000; // 5000～10000ms

export default function Intro(config = {}) {
  const {
    groom = DEFAULT_CONFIG.groom,
    bride = DEFAULT_CONFIG.bride,
    dateTextJP = DEFAULT_CONFIG.dateTextJP,
    heroBgImage = DEFAULT_CONFIG.heroBgImage,
    heroMainPhoto = DEFAULT_CONFIG.heroMainPhoto,
  } = config;

  // 各画像の独立した画像ソース管理（main を除く 9 枚）
  const [randomImages, setRandomImages] = React.useState(() => {
    const images = new Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
      images[i] = getRandomTopImages(1)[0];
    }
    return images;
  });

  const [imagesLoaded, setImagesLoaded] = React.useState({
    bg: false,
    main: false,
  });

  // 各画像が独立してランダム間隔で変更
  React.useEffect(() => {
    const timeouts = [];

    // 各画像に対して独立した更新ループを作成
    for (let index = 0; index < 9; index++) {
      // 各画像の更新関数
      const scheduleNextUpdate = () => {
        const interval = getRandomInterval();
        const timeoutId = setTimeout(() => {
          setRandomImages((prev) => {
            const updated = [...prev];
            updated[index] = getRandomTopImages(1)[0];
            return updated;
          });
          scheduleNextUpdate(); // 次の更新をスケジュール
        }, interval);
        timeouts.push(timeoutId);
      };

      // 初回の更新をスケジュール
      scheduleNextUpdate();
    }

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  // 画像プリロード（初期化時のみ、または heroBgImage / heroMainPhoto が変更時）
  React.useEffect(() => {
    const loadImage = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImagesLoaded((prev) => ({ ...prev, [key]: true }));
      img.onerror = () => setImagesLoaded((prev) => ({ ...prev, [key]: true }));
    };

    if (heroBgImage) loadImage(heroBgImage, "bg");
    if (heroMainPhoto) loadImage(heroMainPhoto, "main");
  }, [heroBgImage, heroMainPhoto]);

  // 現在表示中のランダム画像をプリロード（動的に変更される画像をバックグラウンドでロード）
  React.useEffect(() => {
    const loadImage = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {};
      img.onerror = () => {};
    };

    randomImages.forEach((src, index) => {
      if (src) loadImage(src, `random-${index}`);
    });
  }, [randomImages]);

  return (
    <section 
      className="relative h-[92vh] md:h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${heroBgImage})`,
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

      {/* ===== 写真コラージュレイヤー（ランダム更新） ===== */}
      {/* メイン写真（中央奥）- 固定 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl transition-shadow"
        style={{
          backgroundImage: `url(${heroMainPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "fadein 1.2s ease-out forwards",
        }}
      />

      {/* サブ写真 9 枚（ランダムに変更） */}
      {PHOTO_POSITIONS.slice(1).map((position, index) => (
        <div
          key={position.id}
          className={position.className}
          style={{
            backgroundImage: `url(${randomImages[index] || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: `fadein 1.4s ease-out ${position.delay} forwards`,
            transition: "background-image 0.5s ease-in-out",
          }}
        />
      ))}

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
          <p className="mt-6 text-white text-2xl md:text-2xl tracking-widest opacity-0 animate-fadein-late">
            {dateTextJP}
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
