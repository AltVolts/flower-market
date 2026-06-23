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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-surface rounded-3xl p-8 w-full max-w-md shadow-medium">
        <h2 className="text-2xl font-heading font-bold mb-6 text-warm">
          {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Название" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="input mb-4" required />
          <input type="number" placeholder="Порядок" value={formData.sort_order}
            onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
            className="input mb-6" />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">Сохранить</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingCategory(null); }}
              className="px-6 py-3 rounded-xl border border-gray-200 text-warm hover:bg-cream transition-colors">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-warm">Категории</h1>
        <button onClick={() => setShowModal(true)}
          className="btn-primary">
          + Добавить категорию
        </button>
      </div>

      <div className="bg-surface rounded-3xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream/50">
            <tr>
              <th className="p-5 text-left font-heading font-semibold text-warm">Название</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Порядок</th>
              <th className="p-5 text-left font-heading font-semibold text-warm">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-gray-100 hover:bg-cream/30 transition-colors">
                <td className="p-5 font-medium text-warm">{category.name}</td>
                <td className="p-5 text-warm-light">{category.sort_order}</td>
                <td className="p-5">
                  <button onClick={() => handleEdit(category)}
                    className="text-primary-dark hover:underline mr-3 font-medium">Ред.</button>
                  <button onClick={() => handleDelete(category.id)}
                    className="text-red-400 hover:text-red-600 font-medium">Удалить</button>
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
