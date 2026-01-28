"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

export default function CartPage() {
  // 👇 ВИПРАВЛЕНО: використовуємо items та totalPrice (як у вашому контексті)
  const { items, removeFromCart, totalPrice, clearCart } = useCart();
  
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "+380" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Захист: якщо items не існує, використовуємо порожній масив
  const safeItems = items || [];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (!val.startsWith("+380")) {
      setFormData({ ...formData, phone: "+380" });
      return;
    }

    const cleanVal = "+" + val.slice(1).replace(/\D/g, "");
    
    if (cleanVal.length <= 13) {
      setFormData({ ...formData, phone: cleanVal });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.phone.length !== 13) {
      setErrorMsg("Будь ласка, введіть повний номер телефону");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          items: safeItems,
          total: totalPrice // Використовуємо totalPrice
        })
      });

      if (res.ok) {
        setStatus("success");
        clearCart();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Замовлення прийнято!</h1>
        <p className="text-gray-600 mb-8">Ми зателефонуємо вам на {formData.phone} для підтвердження.</p>
        <Link href="/catalog" className="bg-[#D02020] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition">
          Повернутися в каталог
        </Link>
      </div>
    );
  }

  if (safeItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl font-bold mb-4">Кошик порожній</h1>
        <Link href="/catalog" className="text-[#D02020] border-b border-[#D02020] pb-1 hover:text-black transition">
          Перейти до вибору смаколиків
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Оформлення замовлення</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {safeItems.map((item) => {
              // --- ЛОГІКА ОБРОБКИ КАРТИНКИ (Щоб не ламалося) ---
              let imageUrl = null;
              
              if (item.image) {
                if (typeof item.image === 'string') {
                  imageUrl = item.image;
                } else if (typeof item.image === 'object') {
                  try {
                    imageUrl = urlFor(item.image).url();
                  } catch (e) {
                    imageUrl = null;
                  }
                }
              }
              // ------------------------------------------------

              return (
                <div key={item.uniqueId} className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={item.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">No Photo</div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-500">{item.price} ₴ x {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg mb-2">{item.price * item.quantity} ₴</p>
                    <button onClick={() => removeFromCart(item.uniqueId)} className="text-red-500 text-sm hover:underline">
                      Видалити
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Ваші дані</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ім'я</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#D02020]"
                  placeholder="Іван"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Телефон</label>
                <input 
                  type="tel" 
                  required
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:border-[#D02020] ${errorMsg ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                  placeholder="+380"
                  value={formData.phone}
                  onChange={handlePhoneChange} 
                />
                {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
              </div>

              <div className="border-t border-gray-100 my-4 pt-4 flex justify-between items-center">
                <span className="text-gray-500">До сплати:</span>
                <span className="text-2xl font-bold text-[#D02020]">{totalPrice} ₴</span>
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-[#D02020] text-white font-bold py-4 rounded-xl hover:bg-red-700 transition disabled:opacity-50"
              >
                {status === "loading" ? "Обробка..." : "Підтвердити замовлення"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-center text-sm mt-2">Сталася помилка. Спробуйте ще раз.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}