import type { NextApiRequest, NextApiResponse } from 'next';

// Dùng require để chắc chắn translate là function
const translate = require('@vitalets/google-translate-api');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const product = req.body;
    if (!product) return res.status(400).json({ error: 'Missing product' });

    let title = product.title || '';
    let description = product.description || '';

    if (title) {
      const t = await translate(title, { to: 'vi' });
      title = t.text;
    }
    if (description) {
      const d = await translate(description, { to: 'vi' });
      description = d.text;
    }

    res.status(200).json({ ...product, title, description });
  } catch (err: any) {
    console.error('Translate API error:', err);
    res.status(500).json({ error: err.message });
  }
}
