import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const font = Readex_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "بدائل",
  description:
    "مرحبًا بكم في موقع بدائل الأدوية، مصدر شامل مصمم لمساعدتك في العثور على بدائل آمنة وفعّالة لمختلف الأدوية. سواء كنت تبحث عن خيارات بديلة بسبب الآثار الجانبية أو مشاكل توفر الدواء، نحن هنا لتقديم الحلول المناسبة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${font.className}`}>
        {children}
        <ModalProvider />
        <Toaster />
      </body>
    </html>
  );
}
