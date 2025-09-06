// src/Message/EntryMessage.jsx
import React from "react";
import Message from "./Message";

export default function EntryMessage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      {/* 薄いベージュに近いカード & ふわっと影 */}
      <div className="bg-white/95 rounded-3xl shadow-lg ring-1 ring-gray-100 p-6 md:p-10">
        <Message />
      </div>
    </main>
  );
}
