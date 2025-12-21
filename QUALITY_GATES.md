品質ゲートと実行手順

目的
- 変更が導入された際に基本的な静的チェックと簡単なテストを自動で実行する

推奨ツール
- ESLint (react, jsx-a11y プラグイン)
- Prettier
- prop-types（または TypeScript）
- Jest + React Testing Library（ユニット/レンダリング）

ローカル実行手順（例）
1. 開発依存をインストール
   npm install --save-dev eslint prettier eslint-plugin-react eslint-plugin-jsx-a11y prop-types jest @testing-library/react @testing-library/jest-dom

2. スクリプトを `package.json` に追加
   - "lint": "eslint 'src/**' --ext .js,.jsx"
   - "format": "prettier --write 'src/**'"
   - "test": "jest"

3. CI パイプライン
   - PR 時に `npm run lint` と `npm test` を実行

簡単なテスト例（推奨）
- `Message` コンポーネントが正しくレンダリングされること
- `Card` (将来作る) が children を受け取り正しいクラスを適用すること

注意
- プロジェクトが小さければ段階的導入（まず ESLint+Prettier、次に prop-types、最後にテスト）を推奨
