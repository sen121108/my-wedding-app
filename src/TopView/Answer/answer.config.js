// src/data/Invitation/answer.config.js
const answerConfig = {
  enabled: true,                              // 全体ON/OFF
  message: "ご出席・ご欠席の回答はこちらからお願いします。",
  cta: { label: "回答する", href: "/entry" }, // 外部URLでもOK
  secondary: { label: "お問い合わせ", href: "/contact" }, // 省略可

  // 表示位置: "top" | "bottom" | "floating"
  position: "floating",

  // ✕で閉じる（localStorageで記録）
  dismissible: true,

  // 非表示にしたいパス（完全一致 or 前方一致）
  // 例: 回答ページ/サンクスページでは隠す
  hideOnPaths: [],

  // トーン: "beige" | "white" | "dark"
  accent: "beige",
};
export default answerConfig;
