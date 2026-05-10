import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import AppWrapper from "@/components/layout/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clothing Warrior | Premium Fashion Brand",
  description: "Experience premium minimalist fashion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </AppWrapper>
      </body>
    </html>
  );
}
