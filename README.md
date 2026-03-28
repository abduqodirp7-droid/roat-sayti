# 🔥 Roast AI — O'zbek tilida AI Roast Bot

O'zbekistonning birinchi AI roast boti. Shaxsiy ma'lumotlaringizni kiriting — AI sizni sarkastik va kulgili tarzda roast qiladi!

---

## 📁 Loyiha strukturasi

```
roast-ai/
├── frontend/
│   ├── index.html     ← Asosiy HTML sahifa
│   ├── style.css      ← Dizayn va animatsiyalar
│   └── app.js         ← Frontend logikasi
├── backend/
│   └── server.js      ← Express server + AI API
├── package.json
├── .env.example       ← Environment variables namunasi
├── .gitignore
└── README.md
```

---

## 🚀 Lokal ishga tushirish

### 1. Loyihani yuklab oling
```bash
cd roast-ai
```

### 2. Paketlarni o'rnating
```bash
npm install
```

### 3. Environment variables sozlang
```bash
cp .env.example .env
```

`.env` faylini oching va API kalitingizni kiriting:
```
ANTHROPIC_API_KEY=sk-ant-...your_key_here...
PORT=3000
```

> **API kalit olish:** https://console.anthropic.com/

### 4. Serverni ishga tushiring
```bash
npm start
```

yoki development rejimida (nodemon bilan):
```bash
npm run dev
```

### 5. Brauzerda oching
```
http://localhost:3000
```

---

## 🌐 Render.com ga deploy qilish

1. [render.com](https://render.com) da hisob yarating
2. "New Web Service" tugmasini bosing
3. GitHub reponi ulang
4. Sozlamalar:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment Variables bo'limida:
   - `ANTHROPIC_API_KEY` = sizning API kalitingiz
6. Deploy tugmasini bosing!

---

## 📱 Ngrok bilan local testing (mobil qurilmalar uchun)

```bash
# Ngrok o'rnating
npm install -g ngrok

# Yangi terminal oynasida:
ngrok http 3000
```

Ngrok bergan URL ni mobil telefonda oching (masalan: `https://abc123.ngrok.io`)

---

## ⚙️ Texnik ma'lumotlar

| Komponent | Texnologiya |
|-----------|-------------|
| Frontend | HTML5, CSS3, Vanilla JS |
| Backend | Node.js + Express |
| AI | Anthropic Claude API |
| Deploy | Render.com / Ngrok |

---

## 🛠️ API Endpoint

### `POST /api/roast`

**Request:**
```json
{
  "userInput": "Men futbolni yaxshi ko'raman, erta turishni yomon ko'raman"
}
```

**Response:**
```json
{
  "roast": "AI tomonidan yaratilgan roast matni..."
}
```

---

## 📞 Bog'lanish

- **Email:** abduqodirp7@gmail.com
- **Telefon:** +998 90 020 56 54
- **Manzil:** O'zbekiston, Sirdaryo viloyati, Sirdaryo tumani, 235-uy

---

## ⚠️ Muhim eslatma

Roast AI faqat ko'ngilochar maqsadda yaratilgan. Barcha hazillar foydalanuvchi tomonidan taqdim etilgan ma'lumotlarga asoslanadi. Jiddiy qabul qilmang!
