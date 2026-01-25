"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

// Інтерфейс замовлення
interface Order {
  _id: string;
  orderNumber: string;
  clientName: string;
  phone: string;
  totalPrice: number;
  status: string;
  _createdAt: string; // Використовуємо системне поле Sanity
  products: {
    title: string;
    quantity: number;
    price: number;
  }[];
}

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const SECRET_CODE = "0312"; 

  // Функція входу
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === SECRET_CODE) {
      setIsAuthenticated(true);
      fetchOrders(); 
    } else {
      alert("Невірний код!");
    }
  };

  // Завантаження замовлень з Sanity
  const fetchOrders = async () => {
    setLoading(true);
    // Беремо _createdAt (системна дата створення)
    const query = `*[_type == "order"] | order(_createdAt desc)`;
    const data = await client.fetch(query);
    setOrders(data);
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#D02020] rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Вхід для власника</h1>
          <p className="text-gray-500 mb-6">Введіть код доступу</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Код доступу" 
              className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#D02020]"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-full bg-[#D02020] text-white font-bold py-3 rounded-xl hover:bg-red-700 transition"
            >
              Увійти
            </button>
          </form>
          <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-black">
             ← Повернутися на сайт
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Шапка */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold">📦 Останні замовлення</h1>
          
          <div className="flex gap-4">
            <button onClick={fetchOrders} className="bg-white border border-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Оновити
            </button>

            <Link href="/studio" target="_blank" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Змінити каталог
            </Link>
          </div>
        </div>

        {/* Список */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Завантаження...</div>
        ) : (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400 bg-white rounded-xl shadow-sm">
                Поки що замовлень немає
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-gray-100 gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                         <span className="font-bold text-lg text-[#D02020]">{order.orderNumber || "Без номера"}</span>
                         <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                           {/* Використовуємо _createdAt */}
                           {new Date(order._createdAt).toLocaleString("uk-UA", {
                             day: "numeric",
                             month: "long",
                             hour: "2-digit",
                             minute: "2-digit"
                           })}
                         </span>
                      </div>
                      <h3 className="font-bold text-xl mt-1">{order.clientName}</h3>
                      <a href={`tel:${order.phone}`} className="text-gray-500 hover:text-black flex items-center gap-1 mt-1 font-medium">
                        📞 {order.phone}
                      </a>
                    </div>

                    <div className="text-right">
                       <span className="block text-sm text-gray-500">Сума:</span>
                       <span className="text-2xl font-bold">{order.totalPrice} ₴</span>
                       <div className="mt-2">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                           order.status === 'done' ? 'bg-green-100 text-green-700' : 
                           order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                           'bg-yellow-100 text-yellow-700'
                         }`}>
                           {order.status === 'new' ? 'Новий' : 
                            order.status === 'done' ? 'Виконано' : 
                            order.status === 'cancelled' ? 'Відміна' : order.status}
                         </span>
                       </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">Замовлення:</h4>
                    <ul className="space-y-1">
                      {order.products?.map((prod, index) => (
                        <li key={index} className="flex justify-between text-sm border-b border-gray-200 last:border-0 pb-1 last:pb-0 mb-1 last:mb-0">
                          <span>• {prod.title} (x{prod.quantity})</span>
                          <span className="font-medium">{prod.price * prod.quantity} ₴</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}