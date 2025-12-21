リファクタリング提案（概要）

目的
- 可読性の向上
- 再利用性・保守性の向上
- 将来の機能拡張（ローカライズ、テスト、自動化）に耐える構成

提案の柱
1. ディレクトリ構成の整理
   - 現状: `src/TopView/*`, `src/Entry/*`, `src/data/*` などが混在
   - 提案: 機能（feature）単位でフォルダを整理。例: `src/features/message/`, `src/features/profile/`, `src/features/gallery/`
     - 各 feature 内には `components/`, `styles/`, `data/`, `tests/` を置く
   - 共通コンポーネントは `src/components/ui/` に配置（Button, Card, Divider, Avatar, etc.）

2. 命名規約
   - コンポーネント: PascalCase （例: `MessageCard.jsx`）
   - データ/ユーティリティ: camelCase or kebab-case （例: `messageData.js`）
   - フォルダ: 小文字かキャメルケースで統一
   - CSS/Tailwind ユーティリティ: 複雑なら `clsx` で整理

3. 共通化/抽象化
   - UI カード: 汎用 `Card` コンポーネントを作り、`MessageCard` は `Card` をラップ
   - Divider/Decoration: `src/components/ui/decorations/` にまとめる
   - データ: `src/data/` を `src/data/{feature}/` に整理し、将来的な i18n を見据えて分割

4. 型と契約
   - まず `prop-types` を導入してコンポーネントのインターフェースを明示
   - 長期的には TypeScript 移行を検討

5. 品質ゲート
   - ESLint + Prettier の設定
   - `npm run lint` を CI に追加
   - 単体テスト（Jest + React Testing Library）で主要コンポーネントを守る

移行手順（段階的）
- Phase 0: ドキュメントと小さな共通化（今完了済み: FloralDividerの抽出）
- Phase 1: `src/components/ui/` を作り、Card/Divider/Button を整備。小さな機能から差し替え
- Phase 2: Feature ディレクトリ化を行い、1-2 feature を移動してテスト
- Phase 3: ルール（ESLint/Prettier/prop-types）導入
- Phase 4: TypeScript/CICD の導入（任意、時間があれば）

優先度一覧（短期〜中期）
- 高: UI コンポーネントの共通化、命名規約の明文化
- 中: ディレクトリ再編、prop-types 導入
- 低: TypeScript 移行、CI 設定


---
変更履歴
- 2025-12-21: 初版（FloralDivider を `src/TopView/components` に追加）
