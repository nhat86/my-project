import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { UserProvider } from "./context/UserContext";
import { Poppins, Dancing_Script } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Vietnam-France Shop",
  description: "Votre boutique Vietnamienne en France",
};

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dancing",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <UserProvider>
          <Navbar />

          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>

          <Footer />

          {/* Chat nổi – xuất hiện trên mọi trang */}
          <ChatWidget />
        </UserProvider>
      </body>
    </html>
  );
}
