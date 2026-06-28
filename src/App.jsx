import Invitation from "./TopView/Invitaion/Invitation";
import Schedule from "./TopView/Schedule/Schedule";
import AccessMap from "./TopView/AccessMap/AccessMap";
import ConfirmationForm from "./TopView/Confirmation/ConfirmationForm";
import Profile from "./TopView/Profile/ProfileEntry";
import EntryMessage from "./TopView/Message/EntryMessage";
import EntryCountdown from "./TopView/Countdown/EntryCountdown";
import SectionWithBg from "./TopView/components/SectionWitdhBg";
import Gallery from "./TopView/Gallery/Gallery";
import Footer from "./TopView/Footer/Footer";
import FloatingChaser from "./TopView/components/FloatingChaser";

const COUNTDOWN_BG = "/image/countdown/countBack.jpg"; // 

export default function App() {
  return (
    <div className="font-logo text-gray-800 animate-fadeInSlow bg-brand-500">
      
      <FloatingChaser />

      <section id="top-invitation" className="">
        <div className="page-container mx-auto">
          <Invitation/>
        </div>
      </section>

    <section id="Message" className="pt-20">
      <div className="page-container max-w-4xl mx-auto px-6">
          <EntryMessage />
      </div>
    </section>

    

     <section id="countdown" className="pt-20">
        <div className="mx-auto">
        <SectionWithBg
          imageSrc={COUNTDOWN_BG}
          overlay={0.8}     // 画像をさらに“薄く”→数値を上げる
          tint="white"       // 白ベースの淡いトーン
          className="p-6 md:p-10"
        >
          <EntryCountdown />
        </SectionWithBg>
        </div>
      </section>

      <section id="profile" className="pt-25">
        <div className="page-container max-w-3xl mx-auto ">
          <Profile />
        </div>
      </section>

      <section id="gallery" className="pt-20">
        <div className="mx-auto">
        <Gallery />
        </div>
      </section>

      <section id="top-schedule" className="">
        <div className="page-container mx-auto px-6 pt-20">
          <Schedule />
        </div>
      </section>

    <section id="top-map" className="pt-20">
      <div className="page-container mx-auto ">
        <AccessMap />
      </div>
      </section>

      <section id="confirmation" className="pt-5 pb-5">
        <div className="">
          <ConfirmationForm />
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
