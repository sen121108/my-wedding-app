import React from "react";
import { FOOTER } from "../../data/Footer/footer";
import { Ornament } from "../../components/ui";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-gradient-to-r from-white via-pink-50 to-white">
      <div className=" mx-auto px-6 py-10 text-center relative">
        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-3 text-pink-400 mb-4">
          <Ornament />
        </div>

        {/* created by */}
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          {FOOTER.label}
        </p>

        {/* 名前 */}
        <p className="mt-2 text-2xl md:text-3xl font-serif text-gray-800 italic text-foil">
          {FOOTER.author}
        </p>

        {/* 年号 */}
        <p className="mt-3 text-xs text-gray-400">© {FOOTER.year}</p>
      </div>
    </footer>
  );
}
