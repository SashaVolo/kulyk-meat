"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";

interface SanityProduct {
  _id: string;
  title: string;
  price: number;
  image: any; 
  category: string;
  weight: string;
  isHit: boolean;
  isSpicy: boolean;
}

interface Props {
  products: SanityProduct[];
}

export default function FilteredCatalog({ products }: Props) {
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div>
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <FilterButton 
            label="Всі товари" 
            isActive={filter === "all"} 
            onClick={() => setFilter("all")} 
        />
        <FilterButton 
            label="М'ясні делікатеси" 
            isActive={filter === "meat"} 
            onClick={() => setFilter("meat")} 
        />
      </div>

      {/* Сітка товарів */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          let imageUrl = '/b1.jpg'; // Заглушка
          
          if (product.image) {
            try {
              imageUrl = urlFor(product.image).url();
            } catch (e) {
              console.error("Помилка генерації URL картинки для:", product.title);
            }
          }

          return (
            <ProductCard 
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              weight={product.weight || "за 1 кг"}
              image={imageUrl}
              isHit={product.isHit}
              isSpicy={product.isSpicy}
            />
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          У цій категорії поки що пусто...
        </div>
      )}
    </div>
  );
}

function FilterButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
        isActive 
          ? "bg-[#D02020] text-white shadow-lg scale-105" 
          : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}