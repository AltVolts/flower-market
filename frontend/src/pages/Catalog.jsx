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
    <div className="bg-cream min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold mb-10 text-warm">Каталог</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory ? Number(selectedCategory) : null}
              onSelect={handleCategorySelect}
            />
          </aside>

          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-warm-light text-xl">Товары не найдены</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
