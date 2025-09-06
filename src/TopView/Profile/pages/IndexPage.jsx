import PersonCard from "../components/PersonCard";
import Timeline from "./Timeline";
import { PAGE_TEXT, bride, groom, history } from "../../../data/Profile";

export default function IndexPage() {
  return (
    <main className="container mx-auto py-8 md:py-12 px-4">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{PAGE_TEXT.profileTitle}</h1>
        <p className="text-gray-600 mt-1">{PAGE_TEXT.profileLead}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <PersonCard title={PAGE_TEXT.brideTitle} photo={bride.photo} bio={bride.bio} links={bride.links} />
        <PersonCard title={PAGE_TEXT.groomTitle} photo={groom.photo} bio={groom.bio} links={groom.links} />
      </div>

      <section className="mt-10 md:mt-14">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">{PAGE_TEXT.historyTitle}</h2>
        <Timeline items={history} />
      </section>
    </main>
  );
}
