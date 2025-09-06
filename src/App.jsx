import Invitation from "./features/intro/Invitation";
import Schedule from "./features/Schedule/Schedule";
import AccessMap from "./features/AccessMap/AccessMap";

import Seating from "./Seating/Seating";
import Videos from "./Videos/Videos";

import Profile from "./Profile/pages/IndexPage";

export default function App() {
  return (
    <div className="font-sans text-gray-800 animate-fadeInSlow bg-brand-500">
      <section id="top-invitation" className="min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Invitation/>
        </div>
      </section>

      <section id="profile" className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Profile />
        </div>
      </section>

      <section id="top-schedule" className="min-h-screen pt-20 ">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Schedule />
        </div>
      </section>

      <section id="top-map" className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <AccessMap />
        </div>
      </section>

      <section id="seating" className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Seating />
        </div>
      </section>

      <section id="videos" className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Videos />
        </div>
      </section>
    </div>
  );
}
