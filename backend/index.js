require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/poem', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const poem = completion.choices[0]?.message?.content?.trim() || '';
    res.json({ poem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate poem' });
  }
});

app.listen(PORT, () => {
  console.log(`Verse backend running on http://localhost:${PORT}`);
});
