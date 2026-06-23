export default function Contacts() {
  return (
    <div className="bg-cream min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold mb-10 text-warm">Контакты</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-surface rounded-3xl shadow-soft p-8">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-warm">Свяжитесь с нами</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-warm-light font-medium">Телефон</p>
                  <p className="text-warm text-lg">+7 (XXX) XXX-XX-XX</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-warm-light font-medium">Адрес</p>
                  <p className="text-warm text-lg">г. Йошкар-Ола, Марий Эл</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-warm-light font-medium">Время работы</p>
                  <p className="text-warm">Пн-Пт: 8:00 - 18:00</p>
                  <p className="text-warm">Сб-Вс: 9:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-3xl shadow-soft p-8">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-warm">Как нас найти</h2>
            <div className="aspect-video bg-cream rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-5xl mb-4 block">🗺️</span>
                <p className="text-warm-light">Карта будет здесь</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
