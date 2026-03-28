const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

console.log("API:", process.env.MISTRAL_API_KEY ? "BOR ✅" : "YO'Q ❌");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/roast', async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput || userInput.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Iltimos, o'zingiz haqingizda yozing!"
      });
    }

    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "Mistral API key yo'q (.env ni tekshiring)"
      });
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content: "Sen ROAST MASTER san. Faqat o'zbek tilida qattiq, kulgili roast qil."
          },
          {
            role: 'user',
            content: `Meni roast qil: ${userInput}`
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(500).json({
        success: false,
        error: "Mistral API javob bermadi"
      });
    }

    const roastText = data.choices?.[0]?.message?.content;

    res.json({
      success: true,
      roast: roastText
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server xatosi"
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🔥 Server running: http://localhost:${PORT}`);
});