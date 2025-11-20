// src/Message/EntryMessage.jsx
import React from "react";
import Message from "./Message";
import MessageCard from "./MessageCard";

export default function EntryMessage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <MessageCard >
        <Message />
      </MessageCard>
    </main>
  );
}
