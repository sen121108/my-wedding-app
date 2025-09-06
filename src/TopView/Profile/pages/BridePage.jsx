import PersonCard from "../components/PersonCard";
import { PAGE_TEXT, bride } from "../../../data/Profile/profile";

export default function BridePage() {
  return (
    <main className="container mx-auto py-8 md:py-12 px-4">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{PAGE_TEXT.brideTitle}</h1>
      </header>

      <div className="prose prose-zinc max-w-none">
        <PersonCard title={PAGE_TEXT.brideTitle} photo={bride.photo} bio={bride.bio} links={bride.links} />
        <article className="mt-8 md:mt-10">
          <h2>{PAGE_TEXT.storyTitle}</h2>
          <p>（ここに長文ストーリー。のちに i18n 文字列を渡す運用に切替）</p>
        </article>

        <h3 className="mt-8">{PAGE_TEXT.galleryTitle}</h3>
      </div>
    </main>
  );
}
