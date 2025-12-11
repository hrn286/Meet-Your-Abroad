// 会話の履歴をここで管理（AIが前の発言を覚えてくれる）
let messages = [
  {
    role: "system",
    content: "あなたはユーザーの留学タイプを優しく診断するAIです。質問しながら、最後に留学タイプを教えてください。"
  }
];

const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const chatAreaEl = document.getElementById("chat-area");
const startBtn = document.getElementById("start-ai");

// 画面にメッセージを追加する関数
function addMessage(role, text) {
  const div = document.createElement("div");
  div.style.margin = "8px 0";
  if (role === "user") {
    div.innerHTML = `<b>あなた：</b> ${text}`;
  } else if (role === "assistant") {
    div.innerHTML = `<b>AI：</b> ${text}`;
  }
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight; // 一番下までスクロール
}

// 「AI無料診断を開始する」ボタンを押したとき
startBtn.addEventListener("click", () => {
  // チャットエリアを表示
  chatAreaEl.style.display = "block";

  // 最初のAIからの質問（ここは固定メッセージでもOK）
  const firstMessage = "こんにちは！Meet Your Abroad 無料AI診断です。まず、あなたが留学に行きたい一番の理由を教えてください😊";
  addMessage("assistant", firstMessage);

  messages.push({ role: "assistant", content: firstMessage });
});

// 送信ボタンが押されたとき
async function send() {
  const text = inputEl.value.trim();
  if (!text) return;

  // 画面に自分の発言を表示
  addMessage("user", text);
  messages.push({ role: "user", content: text });
  inputEl.value = "";

  // サーバー（/api/ai）に問い合わせ
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  const data = await res.json();
  const reply = data.reply;

  // 画面にAIの返事を表示
  addMessage("assistant", reply);
  messages.push({ role: "assistant", content: reply });
}

// Enterキーでも送信できるようにする（おまけ）
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    send();
  }
});

