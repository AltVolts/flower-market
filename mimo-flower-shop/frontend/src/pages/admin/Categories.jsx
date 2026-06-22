import { useState, useEffect } from 'react'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../api/client'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ name: '', sort_order: 0 })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    fetchCategories().then(setCategories)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingCategory) {
      await updateCategory(editingCategory.id, formData)
    } else {
      await createCategory(formData)
    }
    setShowModal(false)
    setEditingCategory(null)
    setFormData({ name: '', sort_order: 0 })
    loadCategories()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({ name: category.name, sort_order: category.sort_order })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Удалить категорию? Товары в ней не будут удалены.')) {
      await deleteCategory(id)
      loadCategories()
    }
  }

  const CategoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-heading font-bold mb-4">
          {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Название" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full mb-3 px-3 py-2 border rounded" required />
          <input type="number" placeholder="Порядок" value={formData.sort_order}
            onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
            className="w-full mb-3 px-3 py-2 border rounded" />
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Сохранить</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingCategory(null); }}
              className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold">Категории</h1>
        <button onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
          + Добавить категорию
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 text-left">Название</th>
              <th className="p-4 text-left">Порядок</th>
              <th className="p-4 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-4">{category.name}</td>
                <td className="p-4">{category.sort_order}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(category)}
                    className="text-primary hover:underline mr-2">Ред.</button>
                  <button onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:underline">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <CategoryModal />}
    </div>
  )
}
