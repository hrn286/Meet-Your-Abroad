const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "送信中...";

  const formData = {
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "送信に失敗しました");
    }

    status.textContent = "お問い合わせありがとうございます！";
    form.reset();

  } catch (error) {
    status.textContent = error.message;
  }
});
