import React from "react";
import Intro from "./Intro";
import ArchFrame from "../components/ArchFrame";
import { INVITATION_CONFIG } from "./invitationConfig";

export default function Invitation() {

  return (
    <>
      <ArchFrame>
        <Intro
          groom={INVITATION_CONFIG.groom}
          bride={INVITATION_CONFIG.bride}
          dateTextJP={INVITATION_CONFIG.dateTextJP}
          heroBgImage={INVITATION_CONFIG.heroBgImage}
          heroMainPhoto={INVITATION_CONFIG.heroMainPhoto}
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
