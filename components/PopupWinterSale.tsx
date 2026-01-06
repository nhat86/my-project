import { useState, useEffect } from "react";
import Link from "next/link";
export default function WinterPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000); // hiển thị sau 3s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-slate-200 p-6 rounded-xl shadow-lg w-72 z-50">
      <h3 className="font-semibold text-lg mb-2">🎁 Khuyến mãi mùa đông!</h3>
      <p className="text-slate-700 mb-4">Giảm tới 50%-70% – chỉ còn đến hết 03/02/2026.</p>
      <div className="flex justify-between">
        <Link
          href="/deals"
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Xem deal
        </Link>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShow(false)}
        >
          ✖
        </button>
      </div>
    </div>
  );
}
