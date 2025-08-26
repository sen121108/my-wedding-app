import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";

import Invitation from "./Top/Invitation";
import Schedule from "./Top/Schedule";
import AccessMap from "./Top/AccessMap";

import Seating from "./Seating/Seating";
import Videos from "./Videos/Videos";
import Quiz from "./Profile/Quiz";

// 表示/フェード時間
const INTRO_SHOW_MS = 2600;
const INTRO_FADE_MS = 700;

export default function App() {
  const [phase, setPhase] = useState("show"); // "show" | "fade" | "gone"
  const location = useLocation();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), INTRO_SHOW_MS);
    const t2 = setTimeout(() => setPhase("gone"), INTRO_SHOW_MS + INTRO_FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

    useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // レイアウト描画直後にスクロールさせる
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [location.hash]);


  // イントロ中：ヒーローのみ
  if (phase !== "gone") {
    return (
      <div className="font-sans text-gray-800 overflow-hidden">
        <div
          className={`fixed inset-0 z-50 bg-white flex items-center justify-center
                      transition-opacity duration-[${INTRO_FADE_MS}ms] ease-out
                      ${phase === "fade" ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`w-full max-w-3xl px-6
                        transform transition-transform duration-[${INTRO_FADE_MS}ms] ease-out
                        ${phase === "fade" ? "scale-95" : "scale-100"}`}
          >
            <Invitation variant="intro" />
          </div>
        </div>
      </div>
    );
  }

  // 通常画面：メイン全体をゆっくりフェードイン
  return (
    <div className="font-sans text-gray-800 animate-fadeInSlow ">
      <Menu />

      <section id="top-invitation" className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Invitation /> {/* ← フラット版（カードじゃない見た目） */}
        </div>
      </section>

      <section id="top-schedule" className="min-h-screen pt-20 bg-brand-500">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Schedule />
        </div>
      </section>

      <section id="top-map" className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <AccessMap />
        </div>
      </section>

      <section id="seating" className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Seating />
        </div>
      </section>

      <section id="videos" className="min-h-screen pt-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Videos />
        </div>
      </section>

      <section id="quiz" className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Quiz />
        </div>
      </section>
    </div>
  );
}
