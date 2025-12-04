import "../globals.css";
import Sidebar from "../../components/layout/Sidebar";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <AdminNavbar />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
