// src/Message/MessageCard.jsx
import React from "react";
import { Card } from "../../components/ui";

export default function MessageCard({ children, className = "", pattern = "/image/message/card_pattern_leaf.png" }) {
  return (
    <Card className={`h-200 ${className}`} pattern={pattern} style={{ padding: "2rem 1.5rem" }}>
      {children}
    </Card>
  );
}
