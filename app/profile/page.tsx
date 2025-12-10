// app/profile/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth"; // helper lấy session/user từ cookie

export default async function ProfilePage() {
  // Lấy user hiện tại từ server
  const session = await auth();

  // Nếu chưa login → quay về login
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thông tin người dùng</h1>
      <div className="space-y-2">
        <p>
          <strong>Tên:</strong>{" "}
          {user.user_metadata?.full_name || "Chưa cập nhật"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
      </div>
    </div>
  );
}
