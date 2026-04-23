/**
 * ================================
 * Invitation Config
 * ウェディングLP用の共通設定
 * ================================
 */

// /image/top ディレクトリ内の全ての写真
const TOP_IMAGES = [
  "/image/top/LINE_ALBUM_私の好きな写真_260423_1.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_2.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_3.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_4.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_5.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_6.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_7.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_8.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_9.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_10.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_11.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_12.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_13.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_14.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_15.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_16.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_17.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_18.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_19.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_20.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_21.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_22.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_23.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_24.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_25.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_26.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_27.jpg",
  "/image/top/LINE_ALBUM_私の好きな写真_260423_28.jpg",
];

export const INVITATION_CONFIG = {
  groom: "Kazumasa",
  bride: "Takako",
  dateTextJP: "2026/10/10/(Sat.)",
  ceremonyISO: "2026-10-10T14:00:00+09:00",
  heroImage: "/image/hero.jpg",
  // コラージュ用写真
  heroMainPhoto: "/image/hero.jpg",
  heroSubPhoto1: "/image/profile/bride.jpg",
  heroSubPhoto2: "/image/profile/groom.jpg",
  heroSubPhoto3: "/image/gallery/95B06D12-D06D-4CBD-8C91-C38996A742D0.JPEG",
  heroSubPhoto4: "/image/gallery/A6E8768A-0A43-44DA-87FF-53B888967918.JPEG",
  heroSubPhoto5: "/image/gallery/E5F9829F-C52E-447B-A86B-5CBCF06974B2.JPEG",
  // 背景画像（夜空、グラデーションなど）
  heroBgImage: "/image/herobg.jpg",
  // ランダム表示用の写真リスト
  topImages: TOP_IMAGES,
};

/**
 * ランダムに N 枚の画像を選択
 * @param {number} count - 選択する枚数
 * @returns {string[]} - 選択された画像パス配列
 */
export function getRandomTopImages(count = 10) {
  const shuffled = [...TOP_IMAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, TOP_IMAGES.length));
}
