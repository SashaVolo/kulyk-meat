import ProductCard from "./ProductCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";


export const revalidate = 0;

async function getProducts() {

  const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    price,
    weight,
    isHit,
    isSpicy,
    "image": gallery[_type == "image"][0]
  }`;

  return await client.fetch(query);
}

export default async function Catalog() {
  const products = await getProducts();

  return (
    <section className="py-16 bg-gray-50" id="catalog">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-black uppercase mb-4">
            Каталог <span className="text-[#D02020]">Смаколиків</span>
          </h2>
          <div className="h-1 w-24 bg-[#D02020] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard 
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              weight={product.weight || "за 1 кг"}
              image={product.image ? urlFor(product.image).url() : '/b1.jpg'}
              isHit={product.isHit}
              isSpicy={product.isSpicy}
            />
          ))}
        </div>

      </div>
    </section>
  );
}