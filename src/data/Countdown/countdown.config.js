// src/Countdown/countdown.config.js
const countdownConfig = {
  // 挙式日時（ISO）
  targetISO: "2026-10-10T14:00:00+09:00",

  // 見出し
  title: "Countdown",

  // 目標到達後のメッセージ
  reachedMessage: "ご参加ありがとうございました。",

  // ラベル（必要なら英語などに差し替え可）
  labels: { days: "DAYS", hours: "HOUES", minutes: "MINUTES", seconds: "SECONDS" },
};

export default countdownConfig;
