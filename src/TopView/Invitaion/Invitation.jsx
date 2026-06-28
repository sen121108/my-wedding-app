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
    </>
  );
}
