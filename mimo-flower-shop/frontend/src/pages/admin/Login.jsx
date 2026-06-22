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
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-heading font-bold text-center mb-6 text-primary-dark">
          Админ-панель
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-warm mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
