import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-surface/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-4xl">🌸</span>
            <div>
              <h1 className="text-xl font-heading font-bold text-warm">Цветы Марий Эл</h1>
              <p className="text-xs text-warm-light">Цветы и дары природы из сердца Марий Эл</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-warm hover:text-primary-dark font-medium transition-colors duration-300">
              Каталог
            </Link>
            <Link to="/contacts" className="text-warm hover:text-primary-dark font-medium transition-colors duration-300">
              Контакты
            </Link>
            <Link to="/order" className="btn-primary">
              Заказать
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-warm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/catalog" className="text-warm hover:text-primary-dark font-medium" onClick={() => setIsMenuOpen(false)}>
                Каталог
              </Link>
              <Link to="/contacts" className="text-warm hover:text-primary-dark font-medium" onClick={() => setIsMenuOpen(false)}>
                Контакты
              </Link>
              <Link to="/order" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
                Заказать
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
