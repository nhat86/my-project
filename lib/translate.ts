import translate from '@vitalets/google-translate-api';

export async function translateToVietnamese(text: string): Promise<string> {
  try {
    const res = await translate(text, { to: 'vi' });
    return res.text;
  } catch (e) {
    console.error('Translate failed', e);
    return text; // fallback trả về text gốc
  }
}
