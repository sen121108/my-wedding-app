// src/Message/EntryMessage.jsx
import React from "react";
import Message from "./Message";
import MessageCard from "./MessageCard";

export default function EntryMessage() {
  return (
    <>
      {/* モバイル版 - カードなし、フルウィドス */}
      <main className="md:hidden w-full px-4 py-8 bg-gradient-to-b from-[#faf8f4] to-white">
        <Message />
      </main>

      {/* デスクトップ版 - カード使用 */}
      <main className="hidden md:block py-16">
        <div className="px-4 max-w-4xl mx-auto">
          <MessageCard>
            <Message />
          </MessageCard>
        </div>
      </main>
    </>
  );
}
