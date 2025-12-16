'use client';

import { useState } from 'react';

interface Website {
  name: string;
  url: string;
}

interface SuggestedProduct {
  name: string;
  description: string;
  volume?: string;
  estimatedPrice?: string;
  websites?: Website[];
}

interface SearchResult {
  reply: {
    suggestedProducts: SuggestedProduct[];
  };
  error?: string;
}

export default function SearchPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [gridView, setGridView] = useState(true);

  async function handleSubmit() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('../api-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();
      let data: SearchResult;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response không phải JSON:", text);
        data = { reply: { suggestedProducts: [] }, error: "Lỗi API" };
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setResult({ reply: { suggestedProducts: [] }, error: 'Lỗi khi gọi API' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tìm kiếm AI</h1>

      <textarea
        className="w-full p-3 border rounded mb-2"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mô tả sản phẩm..."
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSubmit}
          disabled={loading || !message.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Đang xử lý...' : 'Gợi ý sản phẩm'}
        </button>

        <button
          onClick={() => setGridView(!gridView)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          {gridView ? 'Chuyển sang List' : 'Chuyển sang Grid'}
        </button>
      </div>

      {result && result.error && (
        <p className="text-red-500 mb-2">{result.error}</p>
      )}

      {result && result.reply.suggestedProducts.length === 0 && !result.error && (
        <p>Không tìm thấy sản phẩm phù hợp.</p>
      )}

      {result && result.reply.suggestedProducts.length > 0 && (
        <div className={gridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
          {result.reply.suggestedProducts.map((p, i) => (
            <div
              key={i}
              className="border rounded p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="font-bold text-lg mb-1">{p.name}</h2>
              <p className="text-gray-700 mb-1">{p.description}</p>
              {p.volume && <p className="text-sm">Size: {p.volume}</p>}
              {p.estimatedPrice && <p className="text-sm font-semibold">Giá: {p.estimatedPrice}</p>}
              {p.websites && (
                <ul className="mt-2 text-sm">
                  {p.websites.map((w, idx) => (
                    <li key={idx}>
                      <a href={w.url} target="_blank" className="text-blue-600 underline">
                        {w.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
