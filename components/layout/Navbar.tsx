export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          MuaHoPhap
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700">
          <a href="#" className="hover:text-black">Tìm kiếm</a>
          <a href="#how" className="hover:text-black">Cách hoạt động</a>
          <a href="#pricing" className="hover:text-black">Báo giá</a>
        </nav>

        {/* Lang + Account */}
        <div className="flex items-center gap-4">
          <button className="text-sm">VN | EN</button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
}
