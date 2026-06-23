import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      localStorage.setItem('admin_token', 'true')
      navigate('/admin')
    } else {
      alert('Неверный пароль')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center animate-fade-in">
      <div className="bg-surface p-10 rounded-3xl shadow-soft w-96">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">🌸</span>
          <h1 className="text-2xl font-heading font-bold text-warm">
            Админ-панель
          </h1>
          <p className="text-warm-light mt-2">Цветы Марий Эл</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-warm font-medium mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
