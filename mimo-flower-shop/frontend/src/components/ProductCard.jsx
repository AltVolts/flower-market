import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image_url || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-warm text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-dark font-bold text-xl">{product.price} ₽</span>
          <Link
            to={`/product/${product.id}`}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
