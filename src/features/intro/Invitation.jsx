import React, { useMemo } from "react";
import Intro from "./Intro"; // ★ 新しい共通ヒーローを使用

const CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026年10月10日(土)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
  venueName: "CHARMANT SCENA TOKYO",
  venueAddress: "渋谷区神宮前4-5-6",
  heroVideo: "",     // 通常ページを動画背景にしたい場合はここを活かす
  heroImage: "/image/hero.jpg",
  rsvpExternalUrl: "/entry",
};

export default function Invitation({ variant = "normal" }) {
  const isIntro = variant === "intro";
  const targetMs = useMemo(() => new Date(CONFIG.ceremonyISO).getTime(), []);

  return (
    <div className="">
      {/* ===== ヒーロー：intro/normal 共通で Intro.jsx を使用 ===== */}
      {isIntro ? (
        <Intro
          variant="full"
          groom={CONFIG.groom}
          bride={CONFIG.bride}
          dateLabel={CONFIG.dateTextJP}
          imageSrc={CONFIG.heroImage}
          videoSrc=""                           // 起動時は静止画推奨。動画にしたい場合は heroVideo を渡す
          bottomRightBadge={formatDateBadge(CONFIG.ceremonyISO)}
          showCountdown
          countdownTargetMs={targetMs}
        />
      ) : (
        <Intro
          variant="normal"
          groom={CONFIG.groom}
          bride={CONFIG.bride}
          dateLabel={CONFIG.dateTextJP}
          imageSrc={CONFIG.heroImage}
          videoSrc={CONFIG.heroVideo}           // 通常ページで動画背景にする例（画像運用なら空文字に）
          bottomRightBadge={formatDateBadge(CONFIG.ceremonyISO)}
          showCountdown
          countdownTargetMs={targetMs}
          ctaText="招待状に回答する"
          ctaHref={CONFIG.rsvpExternalUrl}
        />
      )}

      {/* ===== 本文・情報（introでは非表示のまま維持） ===== */}
      {!isIntro && (
        <div className="mt-7">
          <p className="mx-auto max-w-3xl text-center text-gray-700 leading-relaxed text-[15px] md:text-base">
            この度 私たちは結婚式を挙げることとなりました。皆さまへの感謝の気持ちを込めて
            ささやかなおもてなしをさせていただきたく存じます。ご多用の折とは存じますが、
            ぜひご出席賜りますようお願い申し上げます。
          </p>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            <Info label="日付" value={CONFIG.dateTextJP} />
            <Info label="開式" value={new Date(CONFIG.ceremonyISO).toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})} />
            <Info label="会場" value={CONFIG.venueName} />
            <Info label="住所" value={CONFIG.venueAddress} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ========= 子コンポーネント ========= */

function Info({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-3 text-center">
      <div className="text-[11px] tracking-wider text-gray-500">{label}</div>
      <div className="mt-0.5 font-semibold text-sm break-words">{value}</div>
    </div>
  );
}

/* ========= ヘルパ ========= */
function formatDateBadge(iso){
  const d = new Date(iso);
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  const w = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
  return `${y}.${m}.${day} ${w}`;
}
