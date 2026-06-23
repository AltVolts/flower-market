import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg mb-2 text-warm group-hover:text-primary-dark transition-colors">
          {product.name}
        </h3>
        <p className="text-warm-light text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-dark font-bold text-xl">{product.price} ₽</span>
          <Link
            to={`/product/${product.id}`}
            className="btn-primary text-sm py-2 px-4"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
