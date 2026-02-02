"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export interface GalleryItem {
  _key: string;
  _type: "image" | "file";
  asset: any;
  videoUrl?: string;
}

interface Props {
  items: GalleryItem[];
  title: string;
}

export default function ProductGallery({ items, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className="relative aspect-square w-full rounded-3xl bg-gray-100 flex items-center justify-center text-gray-300 border border-gray-200">
        Немає фото
      </div>
    );
  }

  const currentItem = items[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      {/* ГОЛОВНИЙ ЕКРАН */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-200 group margin-buttom-4">
        
        {currentItem._type === "file" && currentItem.videoUrl ? (
          <video 
            src={currentItem.videoUrl} 
            controls 
            className="w-full h-full object-cover" 
          />
        ) : (
          <Image
            src={urlFor(currentItem.asset).url()}
            alt={title}
            fill
            className="object-cover transition-all duration-500"
            priority={currentIndex === 0}
          />
        )}

        {/* Стрілки */}
        {items.length > 1 && (
          <>
            <button onClick={prevSlide} title="Previous" aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextSlide} title="Next" aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* МІНІАТЮРИ */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {items.map((item, index) => (
            <button
              key={item._key}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-[#D02020] opacity-100 scale-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item._type === "file" ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#D02020]">
                     <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                   </svg>
                </div>
              ) : (
                <Image 
                  src={urlFor(item.asset).url()} 
                  alt="Thumb" 
                  fill 
                  className="object-cover" 
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}