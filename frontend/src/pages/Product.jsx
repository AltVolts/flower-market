import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../api/client'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct(id).then(setProduct)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-warm-light text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface rounded-3xl shadow-soft overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image_url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="md:w-1/2 p-10">
              <h1 className="text-4xl font-heading font-bold mb-6 text-warm">
                {product.name}
              </h1>
              <p className="text-warm-light text-lg mb-8 leading-relaxed">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-primary-dark font-bold text-4xl">
                  {product.price} ₽
                </span>
              </div>
              
              <div className="mb-8">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  product.in_stock
                    ? 'bg-secondary/20 text-secondary-dark'
                    : 'bg-primary/20 text-primary-dark'
                }`}>
                  {product.in_stock ? '✓ В наличии' : '⏳ Под заказ'}
                </span>
              </div>
              
              <Link
                to="/order"
                className="btn-primary inline-block text-lg"
              >
                Заказать
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
