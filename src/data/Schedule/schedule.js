// src/data/Schedule/schedule.js

// 見出しや補足テキスト（i18n も視野にオブジェクト化）
export const SCHEDULE_TEXT = {
  title: "Schedule",
  lead: "受付開始からの流れをご案内します",
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
    detail: "※本時間までに全ての準備をお済ませください",
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
