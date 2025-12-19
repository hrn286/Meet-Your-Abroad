const startBtn = document.getElementById("start-btn");
const chatArea = document.getElementById("chat-area");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let currentQuestion = 0;
let answers = [];

const questions = [
  "留学先で一番大事にしたいことは何ですか？（例：成長・楽しさ・安心感・刺激）",
  "気候はどちらが好きですか？（暖かい／涼しい／どちらでも）",
  "都市と自然、どちらに惹かれますか？",
  "行ってみたい地域はどこですか？",
  "留学を通して得たいものは何ですか？（語学・キャリア・人生経験など）",
  "その他追加事項はありますか？"

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
  const loadingMsg = document.createElement("div");
    loadingMsg.className = "ai-msg";
    loadingMsg.innerHTML = `
      <div class="loading">
        <span>あなたに合う留学プランを考えています…✈️</span>
        <span class="loading-spinner"></span>
      </div>
    `;
    chatBox.appendChild(loadingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;


  const res = await fetch("/api/shindan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  const data = await res.json();

  chatBox.removeChild(loadingMsg);

  addMessage("AI", data.result, true);
}

function addMessage(sender, message, isFinal = false) {
  const wrapper = document.createElement("div");
  wrapper.className = sender === "AI" ? "ai-msg" : "user-msg";

  if (isFinal) {
    wrapper.innerHTML = `<div class="final-result">${message}</div>`;
  } else {
    wrapper.innerHTML = `<strong>${sender}：</strong> ${message}`;
  }

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}


