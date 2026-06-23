import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchSettings } from '../api/client'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchCategories().then(setCategories)
    fetchSettings().then(setSettings)
  }, [])

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary/30 via-cream to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-warm leading-tight">
              {settings.slogan || 'Цветы и дары природы из сердца Марий Эл'}
            </h1>
            <p className="text-xl mb-8 text-warm-light leading-relaxed">
              Свежие цветы из теплиц, ягоды и грибы из леса. 
              Каждый товар — это частичка нашей любви к природе.
            </p>
            <Link
              to="/catalog"
              className="btn-primary inline-block text-lg"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* About Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold mb-8 text-warm">
              О нас
            </h2>
            <p className="text-warm-light text-xl leading-relaxed">
              {settings.about || 'Мы — небольшой цветочный бизнес из Марий Эл. Выращиваем цветы в наших теплицах и собираем ягоды и грибы в лесах родного края.'}
            </p>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-warm">
            Популярные товары
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="btn-secondary inline-block"
            >
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-warm">
            Наши категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="card p-8 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-5xl mb-4 block transition-transform duration-300 group-hover:scale-125">
                  {category.name === 'Цветы' && '🌸'}
                  {category.name === 'Кашпо и горшки' && '🪴'}
                  {category.name === 'Ягоды' && '🍓'}
                  {category.name === 'Грибы' && '🍄'}
                  {category.name === 'Аксессуары' && '🧤'}
                </span>
                <span className="font-heading font-semibold text-warm group-hover:text-primary-dark transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
