export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">О нас</h3>
            <p className="text-cream text-sm">
              Мы выращиваем цветы в теплицах Марий Эл и собираем ягоды и грибы в лесах нашего края.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Контакты</h3>
            <p className="text-cream text-sm">Телефон: +7 (XXX) XXX-XX-XX</p>
            <p className="text-cream text-sm">Адрес: г. Йошкар-Ола</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Режим работы</h3>
            <p className="text-cream text-sm">Пн-Пт: 8:00 - 18:00</p>
            <p className="text-cream text-sm">Сб-Вс: 9:00 - 16:00</p>
          </div>
        </div>
        <div className="border-t border-primary mt-8 pt-4 text-center text-cream text-sm">
          © 2024 Цветы Марий Эл. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
