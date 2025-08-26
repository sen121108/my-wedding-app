// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ← これが必要
    autoprefixer: {},
  },
};
