const startBtn = document.getElementById("start-btn");
const chatArea = document.getElementById("chat-area");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let currentQuestion = 0;
let answers = [];

const questions = [
  "行ってみたい国はどこですか？",
  "留学の目的は何ですか？（英語・仕事・人生経験など）",
  "期間はどれくらい考えていますか？",
  "一番大事にしたいことは何ですか？"
];

startBtn.addEventListener("click", () => {
  chatArea.style.display = "block";
  startBtn.style.display = "none";
  addMessage("AI", questions[currentQuestion]);
});

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  answers.push(text);
  input.value = "";

  currentQuestion++;

  setTimeout(() => {
    if (currentQuestion < questions.length) {
      addMessage("AI", questions[currentQuestion]);
    } else {
      showResult(); // ← ここから呼ばれる
    }
  }, 600);
}

async function showResult() {
  addMessage("AI", "診断中です…");

  const res = await fetch("/api/shindan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  const data = await res.json();

  addMessage("AI", data.result);
}

function addMessage(sender, message) {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}：</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
