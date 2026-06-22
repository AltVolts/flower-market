import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../api/client'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory).then(setProducts)
  }, [selectedCategory])

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary-dark">Каталог</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory ? Number(selectedCategory) : null}
            onSelect={handleCategorySelect}
          />
        </aside>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12 text-warm">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
