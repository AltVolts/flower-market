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
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-heading font-bold mb-4 text-primary-dark">
          Заказ отправлен!
        </h1>
        <p className="text-warm mb-8">
          Мы свяжемся с вами для подтверждения заказа.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Вернуться на главную
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-warm mb-2">Ваше имя *</label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-warm mb-2">Телефон *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            placeholder="+7 (XXX) XXX-XX-XX"
          />
        </div>

        <div className="mb-6">
          <label className="block text-warm mb-2">Комментарий</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            rows={4}
            placeholder="Пожелания к заказу..."
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Отправить заказ
        </button>
      </form>
    </div>
  )
}
