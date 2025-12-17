const startBtn = document.getElementById("start-btn");
const chatArea = document.getElementById("chat-area");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

startBtn.addEventListener("click", () => {
  chatArea.style.display = "block";
  addMessage("AI", "こんにちは！まずは行ってみたい国はありますか？");
});

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  input.value = "";

  setTimeout(() => {
    addMessage("AI", "なるほど！それに合う留学プランを考えてみますね 😊");
  }, 800);
}

function addMessage(sender, message) {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}：</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

