const startBtn = document.getElementById("start-btn");
const chatArea = document.getElementById("chat-area");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let currentQuestion = 0;
let answers = [];

// 質問データ
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

function sendMessage() {
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
      showResult();
    }
  }, 600);
}

function showResult() {
  addMessage(
    "AI",
    `診断結果です👇  
あなたは「${diagnoseType()}」タイプの留学が向いています！`
  );
}

function diagnoseType() {
  if (answers[1].includes("英語")) {
    return "語学集中型留学";
  }
  if (answers[1].includes("仕事")) {
    return "ワーホリ・キャリア型留学";
  }
  return "人生経験重視型留学";
}

function addMessage(sender, message) {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}：</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
