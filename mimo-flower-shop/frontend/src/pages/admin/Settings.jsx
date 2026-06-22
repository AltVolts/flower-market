import { useState, useEffect } from 'react'
import { fetchSettings, updateSettings } from '../../api/client'

export default function Settings() {
  const [settings, setSettings] = useState({
    store_name: '',
    phone: '',
    address: '',
    work_hours: '',
    about: '',
    slogan: ''
  })

  useEffect(() => {
    fetchSettings().then(data => {
      setSettings(prev => ({ ...prev, ...data }))
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateSettings(settings)
    alert('Настройки сохранены!')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Настройки</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block text-warm mb-2">Название магазина</label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => setSettings({...settings, store_name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Слоган</label>
            <input
              type="text"
              value={settings.slogan}
              onChange={(e) => setSettings({...settings, slogan: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Телефон</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({...settings, phone: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Адрес</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">Время работы</label>
            <input
              type="text"
              value={settings.work_hours}
              onChange={(e) => setSettings({...settings, work_hours: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-warm mb-2">О нас</label>
            <textarea
              value={settings.about}
              onChange={(e) => setSettings({...settings, about: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
