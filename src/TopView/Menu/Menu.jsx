// src/components/Menu/Menu.jsx
import { Link, useLocation } from "react-router-dom";

const items = [
  { id: "entry",          label: "出欠・ご祝儀", external: true, highlight:true },
  { id: "top-invitation", label: "招待状",},
  { id: "profile",        label: "プロフィール" },
  { id: "top-schedule",   label: "スケジュール" },
  { id: "top-map",        label: "アクセス" },
  { id: "seating",        label: "席次表" },
  { id: "videos",         label: "動画" },
];

export default function Menu() {
  const loc = useLocation();
  const cls = (highlight) =>
    `cursor-pointer text-sm md:text-base transition ${
      highlight ? "font-bold text-brand-600 hover:text-brand-700"
                : "text-gray-700 hover:text-brand-600"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-40">
      <div className="max-w-4xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-5 py-3">
          {items.map((s) => {
            if (s.external) {
              // 別ページ（/entry）
              return (
                <li key={s.id}>
                  <Link className={cls(false)} to="/entry">出欠・ご祝儀</Link>
                </li>
              );
            }
            // Homeセクションへは /#id で遷移（entryからでもOK）
            return (
              <li key={s.id}>
                <Link className={cls(s.highlight)} to={`/#${s.id}`}>
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
