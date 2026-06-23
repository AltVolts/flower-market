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
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-heading font-bold mb-4 text-primary-dark">
              {product.name}
            </h1>
            <p className="text-warm mb-6">{product.description}</p>
            <div className="mb-4">
              <span className="text-primary-dark font-bold text-3xl">
                {product.price} ₽
              </span>
            </div>
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.in_stock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.in_stock ? 'В наличии' : 'Под заказ'}
              </span>
            </div>
            <Link
              to="/order"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
