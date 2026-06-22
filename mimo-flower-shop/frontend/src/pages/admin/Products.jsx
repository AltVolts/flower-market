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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-heading font-bold mb-4">
          {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Название" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" required />
          <textarea placeholder="Описание" value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" />
          <input type="number" placeholder="Цена" value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" required />
          <input type="text" placeholder="URL изображения" value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" />
          <select value={formData.category_id}
            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" required>
            <option value="">Выберите категорию</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="flex items-center mb-3">
            <input type="checkbox" checked={formData.in_stock}
              onChange={(e) => setFormData({...formData, in_stock: e.target.checked})}
              className="mr-2" />
            В наличии
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Сохранить</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); }}
              className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold">Товары</h1>
        <button onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
          + Добавить товар
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 text-left">Название</th>
              <th className="p-4 text-left">Категория</th>
              <th className="p-4 text-left">Цена</th>
              <th className="p-4 text-left">Наличие</th>
              <th className="p-4 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category?.name}</td>
                <td className="p-4">{product.price} ₽</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.in_stock ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.in_stock ? 'В наличии' : 'Под заказ'}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleEdit(product)}
                    className="text-primary hover:underline mr-2">Ред.</button>
                  <button onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline">Удалить</button>
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
