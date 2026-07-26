import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "EUCO Education Hub",
    template: "%s | EUCO Education Hub",
  },
  description:
    "Edinburgh University Chamber Orchestra's education hub — a composer database, programme notes archive, and resources for learning about the chamber orchestra.",
  metadataBase: new URL("https://edu.eu-co.co.uk"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="bg-black text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
