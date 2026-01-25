import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddCartButton";

// Описуємо інтерфейс товару з Sanity
interface Product {
  _id: string;
  title: string;
  price: number;
  image: any;
  description: string;
  weight: string;
  category: string;
}

// Функція для отримання товару з бази даних
async function getProduct(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    title,
    price,
    image,
    description,
    weight,
    category
  }`;

  return await client.fetch(query, { id });
}

// Типізація параметрів (для Next.js 15)
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage(props: Props) {
  // 1. Отримуємо ID з URL (асинхронно)
  const params = await props.params;
  const id = params.id;

  // 2. Завантажуємо товар з Sanity
  const product: Product = await getProduct(id);

  // 3. Якщо товару немає — показуємо 404
  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Хлібні крихти */}
        <div className="text-sm breadcrumbs text-gray-500 mb-8 flex items-center flex-wrap">
          <Link href="/" className="hover:text-[#D02020] transition">
            Головна
          </Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-[#D02020] transition">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ФОТО */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-200">
            {product.image ? (
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-300">
                Немає фото
              </div>
            )}
          </div>

          {/* ІНФОРМАЦІЯ */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#D02020] uppercase tracking-widest mb-2 block">
                {product.category === "kovbasa"
                  ? "Ковбаса"
                  : "М'ясні делікатеси"}
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-black uppercase leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-3xl font-bold text-[#D02020]">
                {product.price} ₴
              </span>
              <span className="text-gray-500 mb-1 font-medium">
                {product.weight || "за 1 кг"}
              </span>
            </div>

            <div className="h-px w-full bg-gray-200 my-2"></div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                {product.description ||
                  "Опис цього смаколику скоро з'явиться..."}
              </p>

              {/* Блок складу (можна додати поле ingredients в Sanity пізніше) */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-black mb-2 uppercase text-sm tracking-wider flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#D02020]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  Натуральний продукт
                </h3>
                <p className="text-sm italic opacity-80">
                  Тільки добірне м'ясо, сіль, натуральні спеції та фруктовий
                  дим. Жодних штучних домішок.
                </p>
              </div>
            </div>

            {/* Кнопка "Зателефонувати" */}
            <div className="mt-8">
              {/* Додаємо проп large, щоб кнопка стала великою і з текстом */}
              <AddToCartButton large={true} />

              <p className="text-gray-400 text-sm mt-3 text-center md:text-left">
                * Менеджер уточнить вагу та деталі доставки по телефону
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
