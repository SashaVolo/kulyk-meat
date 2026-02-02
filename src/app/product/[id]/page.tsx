import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddCartButton";
import BadgePopup from "@/components/BadgePopup";
import ProductGallery, { GalleryItem } from "@/components/ProductGallery";

export const revalidate = 60;

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  weight: string;
  category: string;
  ingredients?: string;
  gallery: GalleryItem[];
}

async function getProduct(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    title,
    price,
    description,
    weight,
    category,
    ingredients,
    gallery[]{
      _key,
      _type,
      asset,
      _type == "file" => {
        "videoUrl": asset->url
      }
    }
  }`;

  return await client.fetch(query, { id });
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const id = params.id;
  const product: Product = await getProduct(id);

  if (!product) return notFound();

  const galleryItems = product.gallery || [];
  const firstImage = galleryItems.find(item => item._type === 'image');
  
  const productForCart = {
    ...product,
    image: firstImage ? firstImage.asset : null
  };

  return (
    <main className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-sm breadcrumbs text-gray-500 mb-8 flex items-center flex-wrap">
          <Link href="/" className="hover:text-[#D02020] transition">Головна</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-[#D02020] transition">Каталог</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="relative w-full">
            <div className="absolute top-4 left-4 z-30">
               <BadgePopup />
            </div>
            <ProductGallery items={galleryItems} title={product.title} />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#D02020] uppercase tracking-widest mb-2 block">
                {product.category === "kovbasa" ? "Ковбаса" : "М'ясні делікатеси"}
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-black uppercase leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#D02020]">{product.price}</span>
              <span className="text-2xl font-bold text-[#D02020] border-b-2 border-[#D02020] pb-1">грн</span>
              <span className="text-gray-500 font-medium ml-2">{product.weight || "за 1 кг"}</span>
            </div>

            <div className="py-2">
              <AddToCartButton product={productForCart} large={true} />
              <p className="text-gray-400 text-sm mt-3 text-center md:text-left">
                * Менеджер уточнить вагу та деталі доставки по телефону
              </p>
            </div>

            <div className="h-px w-full bg-gray-200 my-2"></div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">{product.description}</p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-black mb-2 uppercase text-sm tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#D02020]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1 1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  Натуральний продукт
                </h3>
                <p className="text-sm italic opacity-80">
                  Тільки добірне м'ясо, сіль, натуральні спеції та фруктовий дим. Жодних штучних домішок.
                </p>
              </div>

              {product.ingredients && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                   <h3 className="font-bold text-black mb-2 uppercase text-sm tracking-wider flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#D02020]">
                       <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                     </svg>
                     Склад
                   </h3>
                   <p className="text-sm italic opacity-80">{product.ingredients}</p>
                </div>
              )}

              <div className="border-2 border-green-600 bg-green-50/50 p-4 rounded-xl mt-4">
                <h3 className="font-bold text-black text-sm uppercase mb-2">Доставка та оплата</h3>
                <p className="text-sm text-gray-700 leading-snug">
                  Оскільки це свіжа крафтова продукція, реальна дата відправки може зміститися на 
                  <span className="font-bold"> 5-7 днів </span> 
                  після замовлення. 
                  <span className="block mt-1 font-bold text-black">Лише 100% передплата.</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}