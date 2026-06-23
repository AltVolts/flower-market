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
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Главная</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Всего заказов</h3>
          <p className="text-3xl font-bold text-primary-dark">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Новых заказов</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.newOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-warm">Выполнено</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
        </div>
      </div>
    </div>
  )
}
