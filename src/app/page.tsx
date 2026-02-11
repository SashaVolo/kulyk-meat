import { client } from "@/sanity/lib/client";
import Catalog from "@/components/Catalog";
import Hero from "@/components/Hero";
import Separator from "@/components/Separator";
import HomeReviews from "@/components/HomeReview";


// Важливо: це змушує сторінку оновлювати дані при кожному запиті,
// щоб нові відгуки з'являлися відразу після схвалення в адмінці.
export const revalidate = 0;

async function getReviews() {
  // Запит: беремо тільки схвалені відгуки (isApproved == true),
  // сортуємо від найновіших і беремо останні 6 штук.
  const query = `*[_type == "review" && isApproved == true] | order(_createdAt desc)[0...6] {
    _id,
    name,
    text,
    rating,
    emoji,
    // Якщо відгук прив'язаний до товару, витягуємо його назву
    product->{
      title,
      _id
    }
  }`;
  
  return await client.fetch(query);
}

export default async function Home() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <Separator />

      <Catalog />

      {/* Додаємо невеликий відступ або ще один розділювач перед відгуками */}
      <div className="py-4">
        <Separator />
      </div>

      {/* Передаємо завантажені відгуки у наш новий компонент */}
      <HomeReviews reviews={reviews} />
    </main>
  );
}