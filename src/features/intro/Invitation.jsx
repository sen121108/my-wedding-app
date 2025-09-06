import React, { useMemo } from "react";
import Intro from "./Intro";
import Greeting from "./Greeting"; // ★ 追加：挨拶・概要を別コンポーネント化

const CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026年10月10日(土)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
  venueName: "CHARMANT SCENA TOKYO",
  venueAddress: "渋谷区神宮前4-5-6",
  heroVideo: "",
  heroImage: "/image/hero.jpg",
  rsvpExternalUrl: "/entry",
};

export default function Invitation() {
  const targetMs = useMemo(() => new Date(CONFIG.ceremonyISO).getTime(), []);

  return (
    <div className="">
      <Intro
        groom={CONFIG.groom}
        bride={CONFIG.bride}
        dateLabel={CONFIG.dateTextJP}
        imageSrc={CONFIG.heroImage}
        bottomRightBadge={formatDateBadge(CONFIG.ceremonyISO)}
        countdownTargetMs={targetMs}
        ctaText="招待状に回答する"
        ctaHref={CONFIG.rsvpExternalUrl}
      />
      <div className="px-6 py-10">
        <Greeting
          dateTextJP={CONFIG.dateTextJP}
          ceremonyISO={CONFIG.ceremonyISO}
          venueName={CONFIG.venueName}
          venueAddress={CONFIG.venueAddress}
        />
      </div>
    </div>
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
