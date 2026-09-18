/**
 * Scan&Know — Backend Server
 * 
 * Keeps AI API keys secure. Proxies requests to OpenAI (or compatible API)
 * and handles OCR for uploaded product images.
 * 
 * Deploy to: Railway, Render, Fly.io, Vercel, etc.
 * 
 * Environment variables:
 *   AI_API_KEY      — OpenAI API key (or compatible)
 *   AI_API_URL      — Default: https://api.openai.com/v1/chat/completions
 *   AI_MODEL        — Default: gpt-4o-mini
 *   PORT            — Default: 3000
 * 
 * Created by Abubakr Akhmadjanov
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

// ── Multer for image uploads (memory storage) ──
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    cb(null, allowed.includes(file.mimetype));
  },
});

// ── AI Client ──
const AI_CONFIG = {
  url: process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions',
  key: process.env.AI_API_KEY || '',
  model: process.env.AI_MODEL || 'gpt-4o-mini',
};

async function callAI(messages, maxTokens = 800) {
  if (!AI_CONFIG.key) {
    throw new Error('AI_API_KEY not configured');
  }

  const res = await fetch(AI_CONFIG.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.key}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
      max_tokens: maxTokens,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ═══════════════════════════════════════════════
// SYSTEM PROMPT — Uzbek (Latin)
// ═══════════════════════════════════════════════

const SYSTEM_PROMPT = `Siz "Scan&Know" ilovasining AI yordamchisiz. Sizning vazifangiz — oziq-ovqat mahsulotlari tarkibini o'zbek tilida (lotin alifbosida) oddiy va tushunarli tarzda tahlil qilish.

Qoidalar:
1. Faqat o'zbek tilida (lotin) yozing.
2. Oddiy, kundalik tilda tushuntiring — ilmiy atamalardan qoching.
3. Tarkibni 3-5 xatboshida tahlil qiling.
4. Quyidagilarga alohida e'tibor bering:
   - Shakar miqdori (yuqori/o'rtacha/past)
   - Tuz miqdori
   - Yog' miqdori (ayniqsa to'yingan yog')
   - E-qo'shimchalar (qaysilari xavfli, qaysilari xavfsiz)
   - Allergenlar
   - Ultra-qayta ishlanganlik darajasi (NOVA)
5. Oxirida qisqa xulosa va tavsiya bering.
6. Hech qachon "men AI man" yoki shunga o'xshash narsa yozmang.
7. Faqat berilgan ma'lumotlarga asoslanib tahlil qiling — o'zingizdan ma'lumot qo'shmang.`;

// ═══════════════════════════════════════════════
// POST /api/analyze — Product analysis
// ═══════════════════════════════════════════════

app.post('/api/analyze', async (req, res) => {
  try {
    const p = req.body;

    // Build a structured prompt
    const parts = [];

    if (p.name) parts.push(`Mahsulot nomi: ${p.name}`);
    if (p.brands) parts.push(`Brend: ${p.brands}`);
    if (p.ingredients) parts.push(`Tarkib: ${p.ingredients}`);
    if (p.allergens) parts.push(`Allergenlar: ${Array.isArray(p.allergens) ? p.allergens.join(', ') : p.allergens}`);
    if (p.additives && p.additives.length) parts.push(`E-qo'shimchalar: ${p.additives.join(', ')}`);

    const n = p.nutriments || {};
    const nutriParts = [];
    if (n.energy_kcal !== undefined) nutriParts.push(`Kaloriya: ${n.energy_kcal} kkal/100g`);
    if (n.fat !== undefined) nutriParts.push(`Yog': ${n.fat} g/100g`);
    if (n.saturated_fat !== undefined) nutriParts.push(`To'yingan yog': ${n.saturated_fat} g/100g`);
    if (n.carbohydrates !== undefined) nutriParts.push(`Uglevodlar: ${n.carbohydrates} g/100g`);
    if (n.sugars !== undefined) nutriParts.push(`Shakar: ${n.sugars} g/100g`);
    if (n.fiber !== undefined) nutriParts.push(`Tolalar: ${n.fiber} g/100g`);
    if (n.proteins !== undefined) nutriParts.push(`Oqsil: ${n.proteins} g/100g`);
    if (n.salt !== undefined) nutriParts.push(`Tuz: ${n.salt} g/100g`);
    if (nutriParts.length) parts.push(`Ozuqaviy qiymat (100 g):\n${nutriParts.join('\n')}`);

    if (p.nutriscore) parts.push(`Nutri-Score: ${p.nutriscore}`);
    if (p.nova_group) parts.push(`NOVA guruhi: ${p.nova_group}`);

    const userPrompt = `Quyidagi mahsulot ma'lumotlarini o'zbek tilida tahlil