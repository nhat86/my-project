import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Thông tin người dùng</h1>
      <p><strong>Tên:</strong> {session?.user?.name}</p>
      <p><strong>Email:</strong> {session?.user?.email}</p>
      <p><strong>ID:</strong> {session?.user?.id}</p>
    </div>
  );
}
