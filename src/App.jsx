import Invitation from "./TopView/Invitaion/Invitation";
import Schedule from "./TopView/Schedule/Schedule";
import AccessMap from "./TopView/AccessMap/AccessMap";
import Profile from "./TopView/Profile/ProfileEntry";
import EntryMessage from "./TopView/Message/EntryMessage";
import EntryCountdown from "./TopView/Countdown/EntryCountdown";
import SectionWithBg from "./TopView/components/SectionWitdhBg";
import GlobalAnswerBar from "./TopView/Answer/GlobalAnswerBar";
import Gallery from "./TopView/Gallery/Gallery";
import Footer from "./TopView/Footer/Footer";

const COUNTDOWN_BG = "/image/countdown/countBack.jpg"; // 

export default function App() {
  return (
    <div className="font-logo text-gray-800 animate-fadeInSlow bg-brand-500">
      {/* 全ページ常設（/entry等は設定で自動非表示） */}
      {/* <GlobalAnswerBar /> */}
      
      <section id="top-invitation" className="">
        <div className=" mx-auto">
          <Invitation/>
        </div>
      </section>

    <section id="Message" className="pt-20">
      <div className="max-w-4xl mx-auto px-6">
          <EntryMessage />
      </div>
    </section>

     <section id="countdown" className="pt-20">
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

      <section id="profile" className="pt-25">
        <div className="max-w-3xl mx-auto ">
          <Profile />
        </div>
      </section>

      <section id="gallery" className="pt-20">
        <div className="mx-auto">
        <Gallery />
        </div>
      </section>

      <section id="top-schedule" className="">
        <div className="mx-auto px-6 pt-20">
          <Schedule />
        </div>
      </section>

      <section id="top-map" className="pt-20">
        <div className=" mx-auto ">
           <AccessMap />
        </div>
      </section>

      <section id="footer" className="">
        <div className="">
          <Footer />
        </div>
      </section>

    </div>
  );
}
