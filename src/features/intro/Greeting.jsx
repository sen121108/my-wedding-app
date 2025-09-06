import React, { useMemo } from "react";

/**
 * 招待文と基本情報ボックスのセクション
 * props:
 *  - dateTextJP: "2026年10月10日(土)"
 *  - ceremonyISO: ISO日時文字列 (例: "2026-10-10T14:00:00+09:00")
 *  - venueName: 会場名
 *  - venueAddress: 住所
 */
export default function Greeting({
  dateTextJP,
  ceremonyISO,
  venueName,
  venueAddress,
}) {
  const ceremonyTime = useMemo(() => {
    const d = new Date(ceremonyISO);
    return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  }, [ceremonyISO]);

  return (
    <div className="mt-7">
      <p className="mx-auto max-w-3xl text-center text-gray-700 leading-relaxed text-[15px] md:text-base">
        この度 私たちは結婚式を挙げることとなりました。皆さまへの感謝の気持ちを込めて
        ささやかなおもてなしをさせていただきたく存じます。ご多用の折とは存じますが、
        ぜひご出席賜りますようお願い申し上げます。
      </p>

      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
        <Info label="日付" value={dateTextJP} />
        <Info label="開式" value={ceremonyTime} />
        <Info label="会場" value={venueName} />
        <Info label="住所" value={venueAddress} />
      </div>
    </div>
  );
}

/* ========= 子コンポーネント ========= */
function Info({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-3 text-center">
      <div className="text-[11px] tracking-wider text-gray-500">{label}</div>
      <div className="mt-0.5 font-semibold text-sm break-words">{value}</div>
    </div>
  );
}
