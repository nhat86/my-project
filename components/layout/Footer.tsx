export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h3 className="font-semibold mb-3">Dịch vụ</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Mua hộ</li>
            <li>Báo giá nhanh</li>
            <li>Tư vấn AI</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Liên hệ</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Email: contact@muahophap.com</li>
            <li>Zalo: 0123 456 789</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Chính sách</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Điều khoản</li>
            <li>Bảo mật</li>
            <li>Hoàn tiền</li>
          </ul>
        </div>

      </div>

      <div className="text-center p-4 text-gray-400 text-sm">
        © 2025 MuaHoPhap — All rights reserved.
      </div>
    </footer>
  );
}
