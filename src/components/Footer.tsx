import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t-4 border-[#D02020]">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          <div className="flex flex-col gap-4">
            <div className="uppercase font-heading font-bold text-2xl leading-none">
              <span className="text-[#D02020]">М'ясна Майстерня</span> <br />
              <span className="text-white">Братів Куликів</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Справжні домашні смаколики, виготовлені з любов'ю за старовинними рецептами. Натурально, смачно, як для своїх.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg text-[#D02020] uppercase tracking-wider mb-2">Навігація</h3>
            <ul className="flex flex-col gap-3 text-gray-300 font-medium">
              <li><Link href="/" className="hover:text-[#D02020] transition">Головна</Link></li>
              <li><Link href="/catalog" className="hover:text-[#D02020] transition">Каталог товарів</Link></li>
              <li><Link href="/about" className="hover:text-[#D02020] transition">Про нас</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 items-start md:items-end text-left md:text-right relative">
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Замовити смаколики:</p>
              <a href="tel:+380689396142" className="text-2xl font-heading font-bold text-white hover:text-[#D02020] transition">
                +38 (068) 939 61 42
              </a>
            </div>

            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#D02020]/30 shadow-xl bg-white p-2">
              <Image 
                src="/logo3.png" 
                alt="Козаки" 
                fill
                className="object-contain"
              />
            </div>

          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>2026 М'ясна Майстерня Братів Куликів.</p>
          <p>Зроблено з любов'ю до України 🇺🇦</p>
          <Link href="/admin" className="opacity-10 hover:opacity-100 transition ml-2">🔐</Link>
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ letter }: { letter: string }) {
  return (
    <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold hover:bg-[#D02020] transition-colors duration-300">
      {letter}
    </Link>
  );
}