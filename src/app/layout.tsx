import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/context/CartContext"; 
import Separator from "@/components/Separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "М'ясна Майстерня Братів Куликів | Домашні копченості",
  description: "Справжній балик, реберця на дровах фруктових дерев. Доставка по Україні. Замовляйте натуральне м'ясо від виробника.",
  keywords: ["балик", "м'ясо", "копчення", "доставка їжі", "крафтове виробництво"],
  openGraph: {
    title: "М'ясна Майстерня Братів Куликів",
    description: "Натуральні м'ясні делікатеси з доставкою.",
    images: ['/logo2.png'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        
        <CartProvider>
          
          <Header />
          <Separator />
          {children}
          <Footer />

        </CartProvider>
        
      </body>
    </html>
  );
}