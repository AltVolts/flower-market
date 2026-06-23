import { useState, useEffect } from 'react'
import { fetchOrders } from '../../api/client'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    completedOrders: 0
  })

  useEffect(() => {
    fetchOrders().then(orders => {
      setStats({
        totalOrders: orders.length,
        newOrders: orders.filter(o => o.status === 'new').length,
        completedOrders: orders.filter(o => o.status === 'completed').length
      })
    })
  }, [])

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-heading font-bold mb-8 text-warm">Главная</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface p-8 rounded-3xl shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-warm-light mb-2">Всего заказов</p>
              <p className="text-4xl font-bold text-warm">{stats.totalOrders}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-3xl shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-warm-light mb-2">Новых заказов</p>
              <p className="text-4xl font-bold text-primary-dark">{stats.newOrders}</p>
            </div>
            <span className="text-4xl">🆕</span>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-3xl shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-warm-light mb-2">Выполнено</p>
              <p className="text-4xl font-bold text-secondary-dark">{stats.completedOrders}</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>
      </div>
    </div>
  )
}
