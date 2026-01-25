"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Props {
  large?: boolean;
  product?: {
    uniqueId: string;
    title: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ large = false, product }: Props) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
      addToCart(product);
      
      // Анімація "Додано"
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1000);
    }
  };

  return (
    <button 
      onClick={handleAdd}
      className={`
        flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95
        ${large 
          ? "bg-[#D02020] text-white rounded-xl px-8 py-4 font-bold text-lg gap-3 w-full hover:bg-red-700" 
          : "bg-[#D02020] text-white w-10 h-10 rounded-full hover:bg-red-700 z-20 relative"
        }
        ${isAdded ? "!bg-green-600" : ""}
      `}
    >
      {isAdded ? (
        // Галочка (успіх)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={large ? "w-6 h-6" : "w-5 h-5"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      ) : (
        // Кошик (звичайний стан)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={large ? "w-6 h-6" : "w-5 h-5"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )}

      {large && <span>{isAdded ? "Додано!" : "В кошик"}</span>}
    </button>
  );
}