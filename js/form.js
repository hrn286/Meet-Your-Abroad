const form = document.getElementById("kijioubo-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusEl.textContent = "送信中...";
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);

    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        data?.message ||
        "送信に失敗しました。時間を置いて再度お試しください。";
      throw new Error(msg);
    }

    statusEl.textContent =
      "送信できました！記事応募ありがとうございます。内容を確認後、ご連絡いたします。";
    form.reset();

  } catch (err) {
    statusEl.textContent =
      err.message || "送信に失敗しました。";
  } finally {
    submitBtn.disabled = false;
  }
});
