import Invitation from "./TopView/Invitaion/Invitation";
import Schedule from "./TopView/Schedule/Schedule";
import AccessMap from "./TopView/AccessMap/AccessMap";

import Seating from "./TopView/Seating/Seating";
import Videos from "./TopView/VideoView/Videos";

import Profile from "./TopView/Profile/pages/IndexPage";
import EntryMessage from "./TopView/Message/EntryMessage";
import EntryCountdown from "./TopView/Countdown/EntryCountdown";

export default function App() {
  return (
    <div className="font-sans text-gray-800 animate-fadeInSlow bg-brand-500">
      <section id="top-invitation" className="min-h-screen">
        <div className=" mx-auto">
          <Invitation/>
        </div>
      </section>

    <section id="Message" className="min-h-screen pt-20 bg-[#faf7f3]">
      <div className="max-w-4xl mx-auto px-6">
        <EntryMessage />
      </div>
    </section>

     <section id="countdown" className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <EntryCountdown />
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
