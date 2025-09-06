import React, { useMemo } from "react";
import Intro from "./Intro";
const CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026年10月10日(土)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
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
