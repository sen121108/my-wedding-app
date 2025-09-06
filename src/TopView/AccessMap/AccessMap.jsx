// ─────────────────────────────────────────────────────────────
// AccessMap.jsx  (アクセス/会場案内セクション)
//   - CONFIGを書き換えるだけで会場名/住所/電話/地図/導線を更新
//   - Google マップは public 側の埋め込みURLを貼る方式
//   - 「地図アプリで開く」/「住所をコピー」のCTA付き
// ─────────────────────────────────────────────────────────────

const CONFIG = {
  venueName: "シャルマンシーナ東京",
  address: "〒107-0061 東京都港区北青山3-6-20",
  tel: "03-0000-0000",
  // Googleマップの埋め込みURL（共有 > 地図を埋め込む > HTMLコピーの src）
  gmapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.3721157363157!2d139.70922557644795!3d35.66783837259165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d6f55d0216b%3A0xbbf2ba73f30c29a5!2z44K344Oj44Or44Oe44Oz44K344O844OK5p2x5Lqs!5e0!3m2!1sja!2sjp!4v1756101723982!5m2!1sja!2sjp",
  gmapLink:
    "https://www.google.co.jp/maps/place/%E3%82%B7%E3%83%A3%E3%83%AB%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%BC%E3%83%8A%E6%9D%B1%E4%BA%AC/@35.6678384,139.7092256,17z/data=!3m1!4b1!4m6!3m5!1s0x60188d6f55d0216b:0xbbf2ba73f30c29a5!8m2!3d35.6678384!4d139.7118005!16s%2Fg%2F11h7rpb2mk?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
  // 主要駅からのアクセス（自由に増減OK）
  routes: [
    {
      title: "表参道駅（B2出口）から徒歩",
      time: "徒歩 約3分",
      steps: [
        "B2出口を出て青山通りを外苑前方面へ",
        "一つ目の信号で左折し直進",
        "左手に会場入口",
      ],
    },
    {
      title: "外苑前駅から徒歩",
      time: "徒歩 約8分",
      steps: [
        "1a出口を表参道方面へ直進",
        "青山通り沿いを進み、右折して路地へ",
        "左手に会場入口",
      ],
    },
  ],
  car: {
    note:
      "専用駐車場はございません。お車の方は近隣コインパーキングをご利用ください。",
    links: [
      // 近隣パーキングの地図リンク（任意）
      { label: "タイムズ ○○", url: "https://maps.app.goo.gl/AAAAAAA" },
      { label: "リパーク △△", url: "https://maps.app.goo.gl/BBBBBBB" },
    ],
  },
};

export default function AccessMap() {
  const { venueName, address, tel, gmapEmbedSrc, gmapLink, routes, car } = CONFIG;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("住所をコピーしました");
    } catch {
      alert("コピーに失敗しました。長押しでコピーしてください。");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
      {/* 見出し */}
      <header className="text-center mb-8 md:mb-10">
        <p className="text-xs tracking-widest text-gray-500 mb-1">ACCESS</p>
        <h2 className="text-2xl md:text-3xl font-bold">{venueName}</h2>
      </header>

      {/* 会場情報 + CTA */}
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-1 space-y-3">
          <InfoRow label="住所" value={address} />
          <InfoRow label="TEL" value={tel} />
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href={gmapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              地図アプリで開く
            </a>
            <button
              onClick={copyAddress}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              住所をコピー
            </button>
          </div>
        </div>

        {/* Googleマップ埋め込み */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative w-full aspect-[16/9]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={gmapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 主要駅からのアクセス */}
      <section className="mt-10 md:mt-12">
        <h3 className="text-lg md:text-xl font-bold mb-4">主要駅からのアクセス</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {routes.map((r, idx) => (
            <RouteCard key={idx} title={r.title} time={r.time} steps={r.steps} />
          ))}
        </div>
      </section>

      {/* お車でお越しの方 */}
      <section className="mt-10 md:mt-12">
        <h3 className="text-lg md:text-xl font-bold mb-3">お車でお越しの方</h3>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-gray-700">{car.note}</p>
          {!!car.links?.length && (
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {car.links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

/* ───────── sub components ───────── */

function InfoRow({ label, value }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-xs tracking-wider text-gray-500">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function RouteCard({ title, time, steps }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <ol className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-gray-400">{i + 1}.</span>
            <span className="text-gray-700">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
