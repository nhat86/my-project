import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">MVP: Tìm kiếm AI hoặc nhập link</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/search" className="p-6 bg-white rounded shadow hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tìm kiếm bằng AI</h2>
          <p>Người chưa có sản phẩm cụ thể — mô tả, AI gợi ý sản phẩm.</p>
        </Link>

        <Link href="/link" className="p-6 bg-white rounded shadow hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Nhập link sản phẩm</h2>
          <p>Đã có link: dán link, hệ thống trích xuất dữ liệu.</p>
        </Link>
      </div>
    </main>
  )
}
