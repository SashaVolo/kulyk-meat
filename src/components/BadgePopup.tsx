"use client";

import { useState } from "react";
import Image from "next/image";

export default function BadgePopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="absolute top-4 left-4 z-10 w-20 h-20 hover:scale-110 transition-transform cursor-pointer"
        title="Натисніть, щоб збільшити"
      >
        <Image 
          src="/icon1.png" 
          alt="Натуральне копчення" 
          fill 
          className="object-contain drop-shadow-md"
        />
      </button>

      {/* ВЕЛИКЕ ВІКНО (MODAL) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all"
          onClick={() => setIsOpen(false)} // Закрити при кліку на фон
        >
          {/* Контейнер для великої картинки */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 animate-in fade-in zoom-in duration-300">
            <Image 
              src="/icon.png" 
              alt="Натуральне копчення" 
              fill 
              className="object-contain"
            />
            <p className="absolute -bottom-10 w-full text-center text-white text-sm opacity-80">
              Натисніть будь-де, щоб закрити
            </p>
          </div>
        </div>
      )}
    </>
  );
}