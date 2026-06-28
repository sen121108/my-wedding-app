// src/Profile/components/PersonCard.jsx
import { Card } from "../../components/ui";

export default function PersonCard({
  title,
  photo,
  bio,
  links = [],
  tags = [],
  accent = "rose",
  align = "left",
  /** ★ 追加 */
}) {
  const isRight = align === "right";

  const accents = {
    rose:   { ring: "ring-orange-200",    chip: "bg-orange-50 border-orange-200",    ribbon: "bg-orange-200" },
    groom:  { ring: "ring-indigo-200",     chip: "bg-indigo-50 border-indigo-200",      ribbon: "bg-indigo-200" },
    bride:  { ring: "ring-rose-100", chip: "bg-fuchsia-50 border-rose-100", ribbon: "bg-rose-200" },
  };
  const a = accents[accent] ?? accents.rose;

  return (
    <Card className="p-0" pattern={null}>
      <section
        className={`relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur
                    shadow-[0_6px_30px_rgba(0,0,0,0.06)] p-5 md:p-7`}
        aria-label={title}
      >
        {/* リボン */}
        <div className={`absolute -top-2 left-5 inline-flex items-center gap-2 rounded-b-xl px-3 py-1.5 text-white ${a.ribbon}`}>
          <span className="text-xs tracking-wide">Host</span>
        </div>

        <div className={`grid items-center gap-4 md:gap-8 md:grid-cols-2 ${isRight ? "md:[&>div:first-child]:order-2" : ""}`}>
          {/* 写真（ポラロイド風フレーム） */}
          <div className="flex justify-center">
            <figure className={`relative rounded-2xl ring-4 ${a.ring} bg-white p-2 shadow-md`}>
              <img
                src={photo}
                alt={title}
                className="h-44 w-44 md:h-60 md:w-60 object-cover rounded-xl"
              />
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-gray-300 shadow-inner" />
            </figure>
          </div>

          {/* テキストカラム */}
          <div className="relative">
            {/* 本文（前面） */}
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-gray-700 leading-7 whitespace-pre-wrap">{bio}</p>

              {tags?.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <li
                      key={`${t}-${i}`}
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-gray-700 ${a.chip}`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {links?.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-4 text-blue-700 underline">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noreferrer">{label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
}
