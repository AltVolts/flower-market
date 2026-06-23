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
    <div>
      <section className="relative h-96 bg-gradient-to-r from-primary-dark to-primary">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {settings.slogan || 'Цветы и дары природы из сердца Марий Эл'}
            </h1>
            <p className="text-xl mb-6 text-cream">
              Свежие цветы из теплиц, ягоды и грибы из леса
            </p>
            <Link
              to="/catalog"
              className="bg-cream text-primary-dark px-6 py-3 rounded-lg font-semibold hover:bg-white transition inline-block"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            О нас
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-warm text-lg mb-4">
              {settings.about || 'Мы — небольшой цветочный бизнес из Марий Эл. Выращиваем цветы в наших теплицах и собираем ягоды и грибы в лесах родного края.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            Популярные товары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/catalog"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
            >
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary-dark">
            Наши категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="bg-cream p-6 rounded-lg text-center hover:shadow-md transition"
              >
                <span className="text-3xl mb-2 block">
                  {category.name === 'Цветы' && '🌸'}
                  {category.name === 'Кашпо и горшки' && '🪴'}
                  {category.name === 'Ягоды' && '🍓'}
                  {category.name === 'Грибы' && '🍄'}
                  {category.name === 'Аксессуары' && '🧤'}
                </span>
                <span className="font-heading font-semibold text-primary-dark">
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
