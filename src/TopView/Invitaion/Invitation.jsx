import React, { useMemo } from "react";
import Intro from "./Intro";
import ArchFrame from "../components/ArchFrame";
const CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026/10/10/(Sat.)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
  heroImage: "/image/hero.jpg",
  // コラージュ用写真
  heroMainPhoto: "/image/hero.jpg",
  heroSubPhoto1: "/image/profile/bride.jpg",
  heroSubPhoto2: "/image/profile/groom.jpg",
  heroSubPhoto3: "/image/gallery/95B06D12-D06D-4CBD-8C91-C38996A742D0.JPEG",
  heroSubPhoto4: "/image/gallery/A6E8768A-0A43-44DA-87FF-53B888967918.JPEG",
  heroSubPhoto5: "/image/gallery/E5F9829F-C52E-447B-A86B-5CBCF06974B2.JPEG",
  // 背景画像（夜空、グラデーションなど）
  heroBgImage: "/image/hero.jpg",
};

export default function Invitation() {
  const targetMs = useMemo(() => new Date(CONFIG.ceremonyISO).getTime(), []);

  return (
    <>
      <ArchFrame>
        <Intro
          groom={CONFIG.groom}
          bride={CONFIG.bride}
          dateLabel={CONFIG.dateTextJP}
          imageSrc={CONFIG.heroImage}
          bgImageSrc={CONFIG.heroBgImage}
          photoSrc1={CONFIG.heroMainPhoto}
          photoSrc2={CONFIG.heroSubPhoto1}
          photoSrc3={CONFIG.heroSubPhoto2}
          photoSrc4={CONFIG.heroSubPhoto3}
          photoSrc5={CONFIG.heroSubPhoto4}
          photoSrc6={CONFIG.heroSubPhoto5}
          bottomRightBadge={formatDateBadge(CONFIG.ceremonyISO)}
          countdownTargetMs={new Date(CONFIG.ceremonyISO).getTime()}
        />
      </ArchFrame>

      {/* ===== モダン余白セクション（レイヤーを追加） ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-[#faf8f5] to-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
            We are getting married
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold">
            皆様へご報告
          </h2>
          <p className="mt-6 text-sm md:text-base text-gray-600 leading-relaxed">
            新しい人生の門出に皆様の温かいお祈りをいただき、心より感謝申し上げます。
          </p>
        </div>
      </section>
    </>
  );
}

/* ========= ヘルパ ========= */
function formatDateBadge(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const w = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  return `${y}.${m}.${day} ${w}`;
}
