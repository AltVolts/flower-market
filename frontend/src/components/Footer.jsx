export default function Footer() {
  return (
    <footer className="bg-warm text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">О нас</h3>
            <p className="text-cream/80 text-sm leading-relaxed">
              Мы выращиваем цветы в теплицах Марий Эл и собираем ягоды и грибы в лесах нашего края. 
              Каждый товар — это частичка нашей любви к природе.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Контакты</h3>
            <div className="space-y-2 text-cream/80 text-sm">
              <p>📞 +7 (XXX) XXX-XX-XX</p>
              <p>📍 г. Йошкар-Ола, Марий Эл</p>
              <p>✉️ info@flowers-mel.ru</p>
            </div>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Режим работы</h3>
            <div className="space-y-2 text-cream/80 text-sm">
              <p>Пн-Пт: 8:00 - 18:00</p>
              <p>Сб-Вс: 9:00 - 16:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/20 mt-8 pt-6 text-center text-cream/60 text-sm">
          © 2024 Цветы Марий Эл. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
