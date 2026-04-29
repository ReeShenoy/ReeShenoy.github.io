require('dotenv').config();

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`)
  .then(r => r.json())
  .then(data => {
    const models = data.models?.filter(m => m.supportedGenerationMethods?.includes('generateContent'));
    models?.forEach(m => console.log(m.name));
  });
