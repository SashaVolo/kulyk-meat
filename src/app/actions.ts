"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Створюємо клієнта з правами запису
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Беремо токен з .env
  useCdn: false,
});

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string;
  const text = formData.get("text") as string;
  const rating = Number(formData.get("rating"));
  const emoji = formData.get("emoji") as string;
  
  // Отримуємо ID, але він може бути пустим (для головної сторінки)
  const productId = formData.get("productId") as string;

  try {
    // Формуємо об'єкт для Sanity
    const doc: any = {
      _type: "review",
      name,
      text,
      rating,
      emoji,
      isApproved: false, // Відгук потребує модерації
    };

    if (productId && productId.length > 5) {
      doc.product = {
        _type: "reference",
        _ref: productId,
      };
    }

    await writeClient.create(doc);

    return { success: true };
  } catch (error) {
    console.error("Помилка при створенні відгуку:", error);
    return { success: false };
  }
}

export async function getAllReviewsForAdmin() {
  const query = `*[_type == "review"] | order(_createdAt desc) {
    _id,
    name,
    text,
    rating,
    emoji,
    isApproved,
    _createdAt,
    product->{
      title
    }
  }`;
  
  return await writeClient.fetch(query);
}

export async function toggleReviewStatus(id: string, currentStatus: boolean) {
  try {
    await writeClient
      .patch(id)
      .set({ isApproved: !currentStatus }) // Міняємо на протилежний
      .commit();
    
    return { success: true };
  } catch (error) {
    console.error("Помилка оновлення статусу:", error);
    return { success: false };
  }
}

// Видалити відгук назавжди
export async function deleteReview(id: string) {
  try {
    await writeClient.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Помилка видалення:", error);
    return { success: false };
  }
}

export async function updateOrderStatus(id: string, newStatus: string) {
  try {
    await writeClient
      .patch(id)
      .set({ status: newStatus })
      .commit();
    return { success: true };
  } catch (error) {
    console.error("Помилка оновлення замовлення:", error);
    return { success: false };
  }
}

// Видалити замовлення
export async function deleteOrder(id: string) {
  try {
    await writeClient.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Помилка видалення замовлення:", error);
    return { success: false };
  }
}