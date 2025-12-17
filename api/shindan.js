export default function handler(req, res) {
  res.status(200).json({
    result: "テスト成功！APIは動いています 🎉"
  });
}
