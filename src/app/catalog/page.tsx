import { client } from "@/sanity/lib/client";
import FilteredCatalog from "@/components/FilteredCatalog";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    price,
    category,
    weight,
    isHit,
    isSpicy,
    "image": gallery[_type == "image"][0]
  }`;
  
  const data = await client.fetch(query);
  
  return data;
}

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase mb-4">
            Наші <span className="text-[#D02020]">Смаколики</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Обирайте найкраще до вашого столу. Тільки натуральні інгредієнти та перевірені рецепти.
          </p>
        </div>

        <FilteredCatalog products={products} />

      </div>
    </main>
  );
}