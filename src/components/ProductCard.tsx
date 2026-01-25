"use client";

import Image from "next/image";
import Link from "next/link"; 
import AddToCartButton from "./AddCartButton";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  weight: string;
  image: string;
  isHit?: boolean;
  isSpicy?: boolean;
}

export default function ProductCard({ id, title, price, weight, image, isHit, isSpicy }: ProductProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      

      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isHit && (
          <span className="bg-[#D02020] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            Хіт
          </span>
        )}
        {isSpicy && (
          <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
            🌶 Гостре
          </span>
        )}
      </div>


      <Link href={`/product/${id}`} className="flex-grow">
        

        <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-110 transition duration-700"
          />
        </div>


        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-black group-hover:text-[#D02020] transition mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm font-medium">{weight}</p>
        </div>
      </Link>


      <div className="px-6 pb-6 mt-auto flex items-center justify-between">
        <span className="text-2xl font-bold text-[#D02020]">
          {price} ₴
        </span>


        <AddToCartButton 
          product={{ 
            uniqueId: id, 
            title, 
            price, 
            image 
          }} 
        />
      </div>

    </div>
  );
}