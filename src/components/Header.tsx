"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const phoneNumber = "+380689396142";
  const formattedPhone = "+38 (068) 939 61 42";

  return (
    <header className="bg-white sticky top-0 z-[100] border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3 md:gap-5 group relative z-[101]"
          onClick={() => setIsMobileMenuOpen(false)}
        >

          <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image src="/lg3.png" alt="Логотип" fill className="object-contain" />
          </div>


          <div className="flex flex-col items-start justify-center">
            <span className="text-[#D02020] font-heading font-bold text-base md:text-xl lg:text-3xl leading-none transition whitespace-nowrap">
              М'ЯСНА МАЙСТЕРНЯ
            </span>
            <span className="text-black font-heading font-bold text-xs md:text-lg lg:text-2xl leading-none mt-1 lg:mt-2 whitespace-nowrap">
              БРАТІВ КУЛИКІВ
            </span>
          </div>
        </Link>


        <nav className="hidden md:flex gap-6 lg:gap-10 font-bold text-sm lg:text-base tracking-widest uppercase items-center">
          <NavLink href="/catalog">Каталог</NavLink>
          <NavLink href="/about">Про нас</NavLink>
          <NavLink href="/contact">Контакти</NavLink>
        </nav>

        <div className="flex items-center gap-3 md:gap-6 z-[101]">


          <a
            href={`tel:${phoneNumber}`}
            className="hidden lg:flex items-center gap-3 font-bold text-black hover:text-[#D02020] transition group"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#D02020] group-hover:bg-[#D02020] group-hover:text-white transition shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <span className="whitespace-nowrap text-lg">{formattedPhone}</span>
          </a>


          <Link href="/cart" className="relative p-2 text-black hover:text-[#D02020] transition group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>


            {items.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#D02020] text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                {items.length}
              </span>
            )}
          </Link>


          <button
            className="md:hidden p-2 text-black hover:text-[#D02020] transition relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </div>


      <div
        className={`md:hidden fixed inset-0 top-[90px] bg-white z-40 transition-transform duration-300 ease-in-out border-t border-gray-100 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20 p-6">
          <MobileNavLink href="/catalog" onClick={() => setIsMobileMenuOpen(false)}>Каталог</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>Про нас</MobileNavLink>
          <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Контакти</MobileNavLink>

          <div className="h-px w-20 bg-gray-200 my-4"></div>

          <a href={`tel:${phoneNumber}`} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#D02020] flex items-center justify-center text-white shadow-lg animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <span className="font-bold text-2xl text-black">{formattedPhone}</span>
          </a>
        </div>
      </div>

    </header>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-[#D02020] transition-colors relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D02020] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-2xl font-heading font-bold text-black uppercase hover:text-[#D02020] transition-colors active:scale-95"
    >
      {children}
    </Link>
  );
}