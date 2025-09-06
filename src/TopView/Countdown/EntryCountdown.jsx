// src/Countdown/EntryCountdown.jsx
import React from "react";
import Countdown from "./Countdown";

export default function EntryCountdown() {
  return (
    <section id="Countdown" className="pt-16">
      <div className="container mx-auto px-4">
        <div className=" rounded-3xl shadow-lg ring-1 ring-gray-100 p-6 md:p-10">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
