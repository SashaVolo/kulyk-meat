import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (

    <section className="w-full bg-[#1A1A1A] py-12 md:py-24 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D02020]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold uppercase leading-none drop-shadow-lg">
            {/* Білий текст */}
            <span className="text-white block mb-2">
              Домашні балики <br /> та реберця
            </span>
            <span className="text-white block mb-2">
              М'ясна Мастерня
            </span>
            {/* Червоний текст */}
            <span className="text-[#D02020]">
              Братів Куликів
            </span>
          </h1>
          
          {/* Світло-сірий опис */}
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-md opacity-90">
            Створені з любов’ю за традиціями наших предків. 
            Справжній смак, натуральні інгредієнти.
          </p>

          <Link 
            href="/catalog"
            className="bg-[#D02020] text-white font-bold py-4 px-10 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-900/30 text-lg uppercase tracking-wider mt-4"
          >
            Перейти до смаколиків
          </Link>
        </div>

        <div className="relative h-[400px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-800/50 ring-1 ring-[#D02020]/20">
           <Image 
             src="/b1.jpg" 
             alt="М'ясна нарезка балик" 
             fill

             className="object-cover hover:scale-105 transition-transform duration-700"
             priority
           />

           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}