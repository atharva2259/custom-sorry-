import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client if key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Server-side Gemini API endpoint for apology message drafting & personalization
app.post('/api/gemini/generate-message', async (req, res) => {
  try {
    const {
      mistakeType = 'A thoughtless mistake',
      tone = 'heartfelt and sincere',
      recipientName = 'My Love',
      yourName = 'Yours Always',
      details = '',
      customNotes = '',
    } = req.body;

    if (!ai) {
      // High-quality crafted fallback response if API key is not configured
      return res.status(200).json({
        fallback: true,
        headline: `For My Dearest ${recipientName}`,
        subtitle: `An honest apology from my heart, because you mean everything to me.`,
        letter: `My dearest ${recipientName},\n\nI am writing this from the quietest, most honest place in my heart because I owe you a sincere apology. What happened recently regarding ${mistakeType} was completely my failure, and seeing that I caused you hurt or disappointment breaks me more than words can express.\n\nI want to say clearly and without excuse: you did not deserve to be treated that way or put in that position. You have given me so much patience, kindness, and warmth, and I should have been much more considerate, present, and attentive.\n\nI cannot undo the past, but I can choose who I become from this moment onward. I am dedicated to proving my care through real actions, consistent patience, and deeper respect for everything we share.\n\nForever yours,\n${yourName}`,
        reasonsWhyILoveYou: [
          `Your boundless patience and the warmth you bring into my world even on stormy days.`,
          `The way your laughter instantly makes every heavy moment feel lighter.`,
          `The strength and kindness in your heart that inspires me to grow into a better person.`
        ],
        contractClauses: [
          `Clause 1: I accept full accountability for ${mistakeType} with zero excuses or deflections.`,
          `Clause 2: I will actively listen and communicate with gentle honesty before reacting.`,
          `Clause 3: I will safeguard your peace of mind and prioritize our shared trust each day.`
        ],
        sweetPenalty: `One full month of preparing your morning coffee or tea and organizing two weekend surprise date nights with zero phone distractions.`,
        voucherOffers: [
          { title: 'One Unconditional Hug', desc: 'Redeemable anytime, anywhere, for as long as you need.' },
          { title: '100% Date Night Autonomy', desc: 'You choose the restaurant, the movie, and dessert with zero objections.' },
          { title: 'Heart-to-Heart Listening Pass', desc: 'Complete uninterrupted listening whenever you want to talk.' }
        ]
      });
    }

    const prompt = `You are a thoughtful, emotionally intelligent relationship writer. A user wants to apologize sincerely to their loved one or partner.
Recipient Name: ${recipientName}
Apologizer Name: ${yourName}
Mistake Category/Issue: ${mistakeType}
Specific Details: ${details || 'None provided'}
Tone: ${tone}
Extra Requirements: ${customNotes || 'Keep it genuine, heartfelt, zero defensive excuses, focus on real accountability and constructive change.'}

Return a valid JSON object matching this exact schema:
{
  "headline": string, // Romantic, sincere, gentle headline
  "subtitle": string, // Gentle 1-line lead-in
  "letter": string, // 3-4 paragraphs of sincere, heartfelt apology prose with natural linebreaks
  "reasonsWhyILoveYou": string[], // 3 specific reasons why the recipient is deeply cherished
  "contractClauses": string[], // 3 clear, realistic, binding behavioral promises for the covenant contract
  "sweetPenalty": string, // A sweet/playful forfeit if the apologizer ever slips up
  "voucherOffers": [
    { "title": string, "desc": string }
  ] // 3 heartwarming apology vouchers
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating apology message:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate apology with AI',
      fallback: true,
    });
  }
});

// Start Express server and mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Heartfelt server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
