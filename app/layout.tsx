import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DarkModeProvider from "@/components/DarkModeProvider";
import { UserProvider } from "./context/UserContext"; // import UserProvider

export const metadata = {
  title: "Vietnam-France Shop",
  description: "Votre boutique Vietnamienne en France",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <UserProvider> {/* Wrap toàn bộ app bằng UserProvider */}
          <DarkModeProvider>
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </DarkModeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
