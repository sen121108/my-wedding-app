// src/data/Schedule/schedule.js

// 見出しや補足テキスト（i18n も視野にオブジェクト化）
export const SCHEDULE_TEXT = {
  title: "Schedule",
  lead: "受付開始から二次会までの流れをご案内します。",
  note: "時間は目安です。進行により前後する場合があります。",
};

// タイムラインの本体データ
export const SCHEDULE_ITEMS = [
  {
    time: "13:30",
    title: "受付開始",
  },
  {
    time: "14:00",
    title: "挙式",
    detail: "本時間までに着替え含めた準備を全てお済ませください",
  },
  {
    time: "14:45",
    title: "披露宴",
  },
  {
    time: "17:00",
    title: "おひらき",
  },
  {
    // 仕切りだけ挟みたい場合（任意）
    divider: true,
    label: "二次会(各自開催)",
  },
];
