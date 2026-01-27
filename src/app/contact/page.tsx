export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase mb-4">
            Наші <span className="text-[#D02020]">Контакти</span>
          </h1>
          <p className="text-gray-500 text-lg">Ми завжди на зв'язку та раді відповісти на ваші запитання</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* ЛІВА ЧАСТИНА: Інформація */}
          <div className="space-y-10">
            
            {/* Блок телефону */}
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-[#D02020] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase mb-2">Замовити по телефону</h3>
                <a href="tel:+380689396142" className="text-2xl font-heading font-bold text-gray-800 hover:text-[#D02020] transition">
                  +38 (068) 939 61 42
                </a>
                <p className="text-gray-500 mt-2">Приймаємо дзвінки з 9:00 до 20:00</p>
              </div>
            </div>

            {/* Блок адреси */}
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-[#D02020] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase mb-2">Локація</h3>
                <p className="text-lg text-gray-700">Україна</p>
                <p className="text-gray-500 mt-1">Працюємо в режимі онлайн-магазину з доставкою по всій країні.</p>
              </div>
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА: Карта */}
          <div className="h-[400px] md:h-[500px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663089.094922616!2d28.24357284693892!3d49.52250109968846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2z0KPQutGA0LDRl9C90LA!5e0!3m2!1suk!2sua!4v1709210000000!5m2!1suk!2sua" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition duration-700"
              title="Мапа України"
            ></iframe>
          </div>

        </div>
      </div>
    </main>
  );
}