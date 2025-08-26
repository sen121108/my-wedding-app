// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import RsvpEntryPage from "./Entry/RsvpEntryPage.jsx";
import RsvpEntry from "./Entry/RsvpEntry.jsx";
import RcvpEntryDetail from "./Entry/RcvpEntryDetail.jsx";
import SendGift from "./Entry/SendGift.jsx";
import ReceiveMoney from "./Entry/ReceiveMoney.jsx";
import "./index.css";
import RcvpConfirm from "./Entry/RcvpConfirm.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* エントリー：親が状態を持ち、子に渡す */}
        <Route path="/entry" element={<RsvpEntryPage />}>
          <Route index element={<RsvpEntry />} />             {/* 名前＋出欠 */}
          <Route path="detail" element={<RcvpEntryDetail />} /> {/* アレルギー（出席のみ） */}
          <Route path="gift" element={<SendGift />} />          {/* 引き出物選択＋住所 */}
          <Route path="payment" element={<ReceiveMoney />} />   {/* ご祝儀 送付方法 */}
          <Route path="confirm" element={<RcvpConfirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
