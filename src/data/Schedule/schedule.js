// src/data/Schedule/schedule.js

// 見出しや補足テキスト（i18n も視野にオブジェクト化）
export const SCHEDULE_TEXT = {
  title: "当日のスケジュール",
  lead: "受付開始から二次会までの流れをご案内します。",
  note: "時間は目安です。進行により前後する場合があります。",
};

// タイムラインの本体データ
// 必要に応じて icon, location, link, highlight, divider などを追加できます
export const SCHEDULE_ITEMS = [
  {
    time: "13:30",
    title: "受付開始",
    detail: "お名前をお伝えください。お荷物はクロークをご利用いただけます。",
    location: "CHARMANT SCENA TOKYO 3F ロビー",
  },
  {
    time: "14:00",
    title: "挙式",
    detail: "チャペルにて挙式を執り行います。",
  },
  {
    time: "15:00",
    title: "披露宴",
    detail: "お食事と歓談、各種演出をお楽しみください。",
  },
  {
    time: "17:00",
    title: "おひらき・ご移動",
    detail: "二次会にご参加の方は各自ご移動をお願いします。",
  },
  {
    // 仕切りだけ挟みたい場合（任意）
    divider: true,
    label: "二次会",
  },
  {
    time: "18:00",
    title: "二次会 開始",
    detail: "カジュアルな雰囲気でお過ごしください。",
    location: "表参道周辺（詳細は別途ご案内）",
  },
];
