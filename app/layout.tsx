import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DarkModeProvider from "@/components/DarkModeProvider";
export const metadata = {
  title: "Vietnam-France Shop",
  description: "Votre boutique Vietnamienne en France",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <DarkModeProvider>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
