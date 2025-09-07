// src/Profile/pages/ProfileEntry.jsx
import PersonCard from "./PersonCard";
import { PAGE_TEXT, bride, groom } from "../../data/Profile/profile";

function SectionTitle({ title, lead }) {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {lead && <p className="text-gray-600 mt-2">{lead}</p>}
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </header>
  );
}

export default function ProfileEntry() {
  return (
    <main className="container mx-auto px-4 ">
      <SectionTitle title={PAGE_TEXT.profileTitle} lead={PAGE_TEXT.profileLead} />

      <div className="grid gap-6 md:gap-8">
        {/* Groom（左画像） */}
        <PersonCard
          title={PAGE_TEXT.groomTitle}
          photo={groom.photo}
          bio={groom.bio}
          links={groom.links}
          tags={groom.tags}
          accent="groom"
          align="left"
        />

        {/* Bride（右画像） */}
        <PersonCard
          title={PAGE_TEXT.brideTitle}
          photo={bride.photo}
          bio={bride.bio}
          links={bride.links}
          tags={bride.tags}
          accent="bride"
          align="right"
        />
      </div>
    </main>
  );
}
