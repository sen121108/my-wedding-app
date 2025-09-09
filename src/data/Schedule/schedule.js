// src/data/Schedule/schedule.js

// 見出しや補足テキスト（i18n も視野にオブジェクト化）
export const SCHEDULE_TEXT = {
  title: "Schedule",
  lead: "受付開始から二次会までの流れをご案内します。",
  note: "時間は目安です。進行により前後する場合があります。",
};

// タイムラインの本体データ
// 必要に応じて icon, location, link, highlight, divider などを追加できます
export const SCHEDULE_ITEMS = [
  {
    time: "13:30",
    title: "受付開始",
  },
  {
    time: "14:00",
    title: "挙式",
  },
  {
    time: "15:00",
    title: "披露宴",
  },
  {
    time: "17:00",
    title: "おひらき・ご移動",
  },
  {
    // 仕切りだけ挟みたい場合（任意）
    divider: true,
    label: "二次会",
  },
  {
    time: "18:00",
    title: "二次会 開始 (参加者希望者のみ)",
  },
];
