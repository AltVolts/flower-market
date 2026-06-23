export default function Contacts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Свяжитесь с нами</h2>
          <div className="space-y-4">
            <div>
              <p className="text-warm font-semibold">Телефон:</p>
              <p className="text-primary-dark">+7 (XXX) XXX-XX-XX</p>
            </div>
            <div>
              <p className="text-warm font-semibold">Адрес:</p>
              <p className="text-primary-dark">г. Йошкар-Ола, Марий Эл</p>
            </div>
            <div>
              <p className="text-warm font-semibold">Время работы:</p>
              <p className="text-primary-dark">Пн-Пт: 8:00 - 18:00</p>
              <p className="text-primary-dark">Сб-Вс: 9:00 - 16:00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Как нас найти</h2>
          <div className="aspect-video bg-cream rounded-lg flex items-center justify-center">
            <p className="text-warm">Карта будет здесь</p>
          </div>
        </div>
      </div>
    </div>
  )
}
