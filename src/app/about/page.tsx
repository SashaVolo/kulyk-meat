import Separator from "@/components/Separator";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        
        {/* ВІДЕО (Замість Image) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>

        {/* Затемнення (щоб текст читався) */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Текст поверх відео */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase mb-4 tracking-wider animate-fade-in-up">
            Наша <span className="text-[#D02020]">Історія</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Традиції справжнього смаку. Від нашої родини — до вашого столу.
          </p>
        </div>
          </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Текст */}
            <div className="space-y-6">
              <h2 className="text-4xl font-heading font-bold text-black uppercase">
                Традиції <span className="text-[#D02020]">Смаку</span>
              </h2>
              <div className="w-20 h-1 bg-[#D02020] rounded-full"></div>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                М'ясна майстерня <b>Братів Куликів</b> — це не просто бізнес, це сімейна історія, що почалася з бажання їсти справжнє. Тому ми створили продукт, який хочеться поставити на стіл для найрідніших.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                Наша гордість — це <b>ніжний балик та соковиті реберця</b>, приготовані за старовинними рецептами наших дідусів. Ми поєднали традиції з сучасними стандартами безпеки. Жодного рідкого диму, підсилювачів смаку чи вологи для ваги. Тільки добірне м'ясо, та густий дим фруктових дерев.
              </p>

              <div className="pt-4">
                <Link href="/catalog" className="inline-block bg-[#1A1A1A] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#D02020] transition uppercase tracking-wider shadow-lg">
                  Спробувати нашу продукцію
                </Link>
              </div>
            </div>

            {/* Картинка (можеш поставити сюди фото братів або процесу) */}
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-4 border-white">
              <Image 
                src="/b1.jpg" // Заміни на інше фото
                alt="Процес приготування" 
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-black uppercase mb-16">
            Чому обирають <span className="text-[#D02020]">Нас?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Картка 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 border-b-4 border-[#D02020]">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-[#D02020]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">100% Натурально</h3>
              <p className="text-gray-600">
                Ми принципово не використовуємо сою, ГМО, підсилювачі смаку та штучні барвники. Тільки фермерське м'ясо.
              </p>
            </div>

            {/* Картка 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 border-b-4 border-[#D02020]">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-[#D02020]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Справжнє копчення</h3>
              <p className="text-gray-600">
                Коптимо на натуральній трісці (вільха, вишня, дуб). Ніякого "рідкого диму". Процес займає від 12 годин до 40 діб.
              </p>
            </div>

            {/* Картка 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 border-b-4 border-[#D02020]">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-[#D02020]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Зроблено з любов'ю</h3>
              <p className="text-gray-600">
                Кожен шматок балика проходять через наші руки. Ми відповідаємо за якість своїм прізвищем.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}