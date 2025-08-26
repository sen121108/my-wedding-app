import React, { memo, useMemo } from "react";

const CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026年10月10日(土)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
  venueName: "CHARMANT SCENA TOKYO",
  venueAddress: "渋谷区神宮前4-5-6",
  heroVideo: "/movie/hero.mp4",
  heroImage: "",
  rsvpExternalUrl: "/entry",
};

export default function Invitation({ variant = "normal" }) {
  const isIntro = variant === "intro";
  const targetMs = useMemo(() => new Date(CONFIG.ceremonyISO).getTime(), []);

  return (
    <div className={isIntro ? "max-w-4xl mx-auto" : ""}>
      {/* HERO（高さ：intro高め / normalもやや高め） */}
      <div className={isIntro ? "relative h-[60vh] md:h-[68vh]" : "relative h-[46vh] md:h-[54vh] rounded-xl overflow-hidden shadow-soft"}>
        <HeroMedia videoSrc={CONFIG.heroVideo} imageSrc={CONFIG.heroImage} />

        {/* 中央テキスト */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center text-white">
            <p className="mb-2 text-[11px] tracking-[0.3em] uppercase opacity-90">Wedding Invitation</p>
            <h1 className={`${isIntro ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"} font-logo font-bold tracking-wide`}>
              {CONFIG.groom} & {CONFIG.bride}
            </h1>

            {/* 日付リボン */}
            <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white/90 px-5 py-1.5 text-gray-900 shadow">
              <span className="text-sm font-semibold">{CONFIG.dateTextJP}</span>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:inline text-sm">{CONFIG.venueName}</span>
            </div>

            {/* カウントダウン（別コンポーネントで毎秒更新＝親は再レンダーしない） */}
            <div className="mt-4">
              <Countdown targetMs={targetMs} />
            </div>

            {!isIntro && (
              <div className="mt-6">
                <a
                  href={CONFIG.rsvpExternalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-brand-600 transition"
                >
                  招待状に回答する
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 右下の日付バッジ */}
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-white/90 px-2.5 py-1.5 text-[12px] font-semibold text-gray-800 shadow">
          {formatDateBadge(CONFIG.ceremonyISO)}
        </div>
      </div>

      {/* 本文・情報（introでは非表示） */}
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

/** 動画/画像レイヤー（memo化で不必要な再レンダーを回避） */
const HeroMedia = memo(function HeroMedia({ videoSrc, imageSrc }) {
  return (
    <>
      {videoSrc ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/35" />
        </>
      ) : (
        <>
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
    </>
  );
});

/** カウントダウン（自分だけ毎秒更新） */
function Countdown({ targetMs }) {
  const [remain, setRemain] = React.useState(calcRemain(targetMs));
  React.useEffect(() => {
    const id = setInterval(() => setRemain(calcRemain(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="flex items-center justify-center gap-2">
      <Badge value={pad(remain.days)} label="Days" />
      <Colon />
      <Badge value={pad(remain.hours)} label="Hours" />
      <Colon />
      <Badge value={pad(remain.minutes)} label="Min" />
      <Colon />
      <Badge value={pad(remain.seconds)} label="Sec" />
    </div>
  );
}

function Badge({ value, label }) {
  return (
    <div className="rounded-lg border border-white/60 bg-white/85 px-3 py-2 text-gray-900 shadow">
      <span className="tabular-nums font-semibold text-lg md:text-xl">{value}</span>
      <span className="ml-1 text-[10px] opacity-70">{label}</span>
    </div>
  );
}
function Colon() { return <span className="text-white/90 text-xl md:text-2xl font-semibold">:</span>; }

function Info({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-3 text-center">
      <div className="text-[11px] tracking-wider text-gray-500">{label}</div>
      <div className="mt-0.5 font-semibold text-sm break-words">{value}</div>
    </div>
  );
}

/* ========= ヘルパ ========= */
function pad(n){ return String(n).padStart(2,"0"); }
function calcRemain(targetMs){
  const now = Date.now();
  let diff = Math.max(0, Math.floor((targetMs - now)/1000));
  const days = Math.floor(diff/86400); diff -= days*86400;
  const hours = Math.floor(diff/3600); diff -= hours*3600;
  const minutes = Math.floor(diff/60); diff -= minutes*60;
  const seconds = diff;
  return { days, hours, minutes, seconds };
}
function formatDateBadge(iso){
  const d = new Date(iso);
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  const w = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
  return `${y}.${m}.${day} ${w}`;
}
