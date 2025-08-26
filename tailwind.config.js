// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // ベージュ基調（必要に応じて微調整OK）
          50:  "#fbf7f1",
          100: "#f5ecdd",
          200: "#e9dcc1",
          300: "#ddc6a2",
          400: "#d2b78c",
          500: "#c9a873", // 基本色
          600: "#b9975f",
          700: "#a07e4a",
          800: "#7e6136",
          900: "#614a2a",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
