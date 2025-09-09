// src/data/Access/access.js

export const ACCESS_TEXT = {
  title: "Access",
  lead: "最寄駅からのルートと地図をご案内します。",
  note: "当日は周辺が混雑する可能性があります。時間に余裕をもってお越しください。",
};

// 会場基本情報
export const VENUE = {
  name: "CHARMANT SCENA TOKYO",
  addressJa: "東京都渋谷区神宮前4-5-6",
  // 任意: 建物名やフロアなど
  addressLine2: "3F チャペル / 2F バンケット",
  // Google Maps の埋め込みURL（共有→地図を埋め込む→URL）
  // 既にお持ちなら差し替え、未確定なら query から自動生成も可
  mapEmbedSrc:
    "https://www.google.com/maps?q=CHARMANT%20SCENA%20TOKYO&output=embed",
  // 各種マップ/配車アプリの検索用クエリ（スペースは %20 推奨）
  mapQuery: "CHARMANT%20SCENA%20TOKYO",
  // 緯度経度があればAppleマップで正確（任意）
  lat: null,
  lng: null,
};

// アクセス手段（順序通りに表示）
export const ACCESS_ROUTES = [
  {
    type: "train",
    label: "電車・徒歩",
    items: [
      {
        title: "表参道駅 A2出口 から徒歩7分",
        detail: "表参道交差点を原宿方面へ。Apple表参道を左折し、直進。",
        icon: "🚇",
      },
      {
        title: "明治神宮前駅 から徒歩10分",
        detail: "神宮前交差点を表参道方面へ直進。",
        icon: "🚶",
      },
    ],
  },
  {
    type: "car",
    label: "お車",
    items: [
      {
        title: "近隣コインパーキングをご利用ください",
        detail:
          "会場には駐車場がございません。近隣コインパーキングも満車の可能性もあるため公共交通機関推奨です。",
        icon: "🚗",
      },
    ],
  },
    {
    type: "hotel",
    label: "ホテル",
    items: [
      {
        title: "当結婚式会場には連携しているホテルはございません",
        detail:
          "宿泊希望の方は各自お探しください。",
        icon: "🏨",
      },
    ],
  },
];

// 任意: ボタン群（表示/順序はこの配列に依存）
export const ACTION_BUTTONS = [
  { kind: "google", label: "Googleマップで開く" },
  { kind: "apple", label: "Appleマップで開く" },
  { kind: "copy", label: "住所をコピー" },
];
