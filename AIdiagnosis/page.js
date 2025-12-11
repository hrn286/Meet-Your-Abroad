"use client";

import { useState } from "react";

export default function DiagnosisPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "こんにちは！AI留学診断を始めます✨ まずは何か一言どうぞ！" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input }
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        AI留学診断チャット
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          height: "400px",
          overflowY: "auto",
          background: "#fafafa"
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              marginBottom: "10px",
              maxWidth: "80%",
              background: m.role === "user" ? "#d0f0ff" : "white",
              marginLeft: m.role === "user" ? "auto" : "0",
              wordBreak: "break-word"
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <input
          style={{ flexGrow: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
        />
        <button
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#0070f3",
            color: "white",
            cursor: "pointer"
          }}
          onClick={sendMessage}
        >
          送信
        </button>
      </div>
    </div>
  );
}
