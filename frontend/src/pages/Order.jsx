import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../api/client'

export default function Order() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    comment: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrder({
      ...formData,
      items: []
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-4xl font-heading font-bold mb-4 text-warm">
            Заказ отправлен!
          </h1>
          <p className="text-warm-light text-xl mb-8">
            Мы свяжемся с вами для подтверждения заказа.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-10 text-warm">Оформление заказа</h1>

          <form onSubmit={handleSubmit} className="bg-surface rounded-3xl shadow-soft p-8">
            <div className="mb-6">
              <label className="block text-warm font-medium mb-2">Ваше имя *</label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                className="input"
                placeholder="Как к вам обращаться?"
              />
            </div>

            <div className="mb-6">
              <label className="block text-warm font-medium mb-2">Телефон *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>

            <div className="mb-8">
              <label className="block text-warm font-medium mb-2">Комментарий</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="input resize-none"
                rows={4}
                placeholder="Пожелания к заказу..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-lg"
            >
              Отправить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
