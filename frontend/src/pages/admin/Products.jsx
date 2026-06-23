import { useState, useEffect } from 'react'
import { fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct } from '../../api/client'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    in_stock: true,
    category_id: ''
  })

  useEffect(() => {
    loadProducts()
    fetchCategories().then(setCategories)
  }, [])

  const loadProducts = () => {
    fetchProducts().then(setProducts)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      category_id: parseInt(formData.category_id)
    }
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData)
    } else {
      await createProduct(productData)
    }
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', image_url: '', in_stock: true, category_id: '' })
    loadProducts()
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image_url: product.image_url || '',
      in_stock: product.in_stock,
      category_id: product.category_id
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Удалить товар?')) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-surface rounded-3xl p-8 w-full max-w-md shadow-medium">
        <h2 className="text-2xl font-heading font-bold mb-6 text-warm">
          {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Название" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="input mb-4" required />
          <textarea placeholder="Описание" value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="input mb-4 resize-none" rows={3} />
          <input type="number" placeholder="Цена" value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="input mb-4" required />
          <input type="text" placeholder="URL изображения" value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="input mb-4" />
          <select value={formData.category_id}
            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            className="input mb-4" required>
            <option value="">Выберите категорию</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="flex items-center mb-6 text-warm">
            <input type="checkbox" checked={formData.in_stock}
              onChange={(e) => setFormData({...formData, in_stock: e.target.checked})}
              className="mr-3 w-4 h-4 accent-primary" />
            В наличии
          </label>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">Сохранить</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); }}
              className="px-6 py-3 rounded-xl border border-gray-200 text-warm hover:bg-cream transition-colors">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-warm">Товары</h1>
        <button onClick={() => setShowModal(true)}
          className="btn-primary">
          + Добавить товар
        </button>
      </div>

      <div className="bg-surface rounded-3xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream/50">
            <tr>
              <th className="p-5 text-left font-heading font-semibold text-warm">Название</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Категория</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Цена</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Наличие</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-100 hover:bg-cream/30 transition-colors">
                <td className="p-5 font-medium text-warm">{product.name}</td>
                <td className="p-5 text-warm-light">{product.category?.name}</td>
                <td className="p-5 font-semibold text-warm">{product.price} ₽</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.in_stock ? 'bg-secondary/20 text-secondary-dark' : 'bg-primary/20 text-primary-dark'
                  }`}>
                    {product.in_stock ? 'В наличии' : 'Под заказ'}
                  </span>
                </td>
                <td className="p-5">
                  <button onClick={() => handleEdit(product)}
                    className="text-primary-dark hover:underline mr-3 font-medium">Ред.</button>
                  <button onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-600 font-medium">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <ProductModal />}
    </div>
  )
}
