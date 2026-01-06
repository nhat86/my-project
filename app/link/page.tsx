'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LinkPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // ✅ Thêm type cho event
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/parse-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Parse failed')

      // pass product data to confirm page via sessionStorage (quick MVP)
      sessionStorage.setItem('parsed_product', JSON.stringify(data))
      router.push('/confirm')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Nhập link sản phẩm</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="url"
          required
          placeholder="https://..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full p-3 rounded"
        />
        <div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Đang...' : 'Trích xuất'}
          </button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}
