import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-primary-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🌸</span>
            <div>
              <h1 className="text-xl font-heading font-bold">Цветы Марий Эл</h1>
              <p className="text-xs text-cream">Цветы и дары природы из сердца Марий Эл</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-cream transition">Каталог</Link>
            <Link to="/contacts" className="hover:text-cream transition">Контакты</Link>
            <Link to="/order" className="bg-cream text-primary-dark px-4 py-2 rounded-lg font-semibold hover:bg-white transition">
              Заказать
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
