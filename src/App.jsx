import Invitation from "./TopView/Invitaion/Invitation";
import Schedule from "./TopView/Schedule/Schedule";
import AccessMap from "./TopView/AccessMap/AccessMap";

import Seating from "./TopView/Seating/Seating";
import Videos from "./TopView/VideoView/Videos";

import Profile from "./TopView/Profile/ProfileEntry";
import EntryMessage from "./TopView/Message/EntryMessage";
import EntryCountdown from "./TopView/Countdown/EntryCountdown";
import SectionWithBg from "./TopView/components/SectionWitdhBg";
import GlobalAnswerBar from "./TopView/Answer/GlobalAnswerBar";
import Gallery from "./TopView/Gallery/Gallery";
import Footer from "./TopView/Footer/Footer";

const COUNTDOWN_BG = "/image/countdown/countBack.jpg"; // 
const ACCESS_BG = "/image/access/access_BG.jpg"; // 


export default function App() {
  return (
    <div className="font-sans text-gray-800 animate-fadeInSlow bg-brand-500">
      {/* 全ページ常設（/entry等は設定で自動非表示） */}
      <GlobalAnswerBar />
      
      <section id="top-invitation" className="">
        <div className=" mx-auto">
          <Invitation/>
        </div>
      </section>

    <section id="Message" className="pt-10 bg-[#faf7f3]">
      <div className="max-w-4xl mx-auto px-6 bg-red-50">
          <EntryMessage />
      </div>
    </section>

     <section id="countdown" className="pt-10">
        <div className="mx-auto">
        <SectionWithBg
          imageSrc={COUNTDOWN_BG}
          overlay={0.55}     // 画像をさらに“薄く”→数値を上げる
          tint="white"       // 白ベースの淡いトーン
          className="p-6 md:p-10"
        >
          <EntryCountdown />
        </SectionWithBg>
        </div>
      </section>

      <section id="profile" className="pt-10">
        <div className="max-w-3xl mx-auto ">
          <Profile />
        </div>
      </section>

      <section id="gallery" className="pt-10">
        <div className="mx-auto">
        <Gallery />
        </div>
      </section>

      <section id="top-schedule" className="">
        <div className="max-w-3xl px-6 py-10">
          <Schedule />
        </div>
      </section>

      <section id="top-map" className="pt-10">
        <div className=" mx-auto ">
            <SectionWithBg
              imageSrc={ACCESS_BG}
              overlay={0.55}     // 画像をさらに“薄く”→数値を上げる
              tint="white"       // 白ベースの淡いトーン
              className="p-6 md:p-10"
            >
              <AccessMap />
          </SectionWithBg>
        </div>
      </section>

      <section id="footer" className="">
        <div className="px-6">
          <Footer />
        </div>
      </section>

    </div>
  );
}
