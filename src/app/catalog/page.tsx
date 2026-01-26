import { client } from "@/sanity/lib/client";
import FilteredCatalog from "@/components/FilteredCatalog";

// Функція завантаження (тільки на сервері)
async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    title,
    price,
    image,
    category,
    weight,
    isHit,
    isSpicy
  }`;
  
  return await client.fetch(query);
}
export const revalidate = 60;
export default async function CatalogPage() {
  // Отримуємо дані з Sanity
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase mb-4">
            Наші <span className="text-[#D02020]">Смаколики</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Обирайте найкраще до вашого столу. Тільки натуральні інгредієнти та перевірені рецепти.
          </p>
        </div>

        {/* Вставляємо наш розумний каталог з фільтрами */}
        <FilteredCatalog products={products} />

      </div>
    </main>
  );
}