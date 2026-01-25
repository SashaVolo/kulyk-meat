import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, items, total } = body;

    // Створюємо документ в Sanity
    const newOrder = await client.create({
      _type: 'order',
      clientName: name,
      phone: phone,
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`, // Генеруємо короткий номер
      products: items.map((item: any) => ({
        _key: item.uniqueId,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: total,
      status: 'new'
    });

    return NextResponse.json({ success: true, id: newOrder._id });
  } catch (error) {
    console.error("Помилка створення замовлення:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}