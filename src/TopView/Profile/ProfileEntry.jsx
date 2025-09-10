// src/Profile/pages/ProfileEntry.jsx
import PersonCard from "./PersonCard";
import { PAGE_TEXT, bride, groom } from "../../data/Profile/profile";


// 上部・下部の飾り（シンプル花風SVG）
function FloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <svg viewBox="0 0 400 24" className="w-64 h-6 opacity-70" aria-hidden="true">
        <path d="M8 12h130M262 12h130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-300" />
        <path d="M200 12c12-12 24-12 36 0-12 12-24 12-36 0Z" fill="currentColor" className="text-gray-300" />
        <circle cx="200" cy="12" r="3" className="text-gray-400" fill="currentColor" />
      </svg>
    </div>
  );
}

function SectionTitle({ title, lead }) {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {lead && <p className="text-gray-600 mt-2">{lead}</p>}
      <FloralDivider />
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
      <FloralDivider />
    </main>
  );
}
