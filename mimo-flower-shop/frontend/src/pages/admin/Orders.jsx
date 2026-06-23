import { useState, useEffect } from 'react'
import { fetchOrders, updateOrderStatus } from '../../api/client'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadOrders()
  }, [filter])

  const loadOrders = () => {
    fetchOrders(filter === 'all' ? null : filter).then(setOrders)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus)
    loadOrders()
  }

  const getStatusLabel = (status) => {
    const labels = { new: 'Новый', in_progress: 'В работе', completed: 'Выполнен' }
    return labels[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Заказы</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'new', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status ? 'bg-primary text-white' : 'bg-white text-warm'
            }`}
          >
            {status === 'all' ? 'Все' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Заказ #{order.id}</h3>
                <p className="text-warm text-sm">{order.customer_name} • {order.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            {order.comment && (
              <p className="text-warm mb-4">Комментарий: {order.comment}</p>
            )}
            <div className="flex gap-2">
              {order.status !== 'in_progress' && (
                <button onClick={() => handleStatusChange(order.id, 'in_progress')}
                  className="text-primary hover:underline">В работу</button>
              )}
              {order.status !== 'completed' && (
                <button onClick={() => handleStatusChange(order.id, 'completed')}
                  className="text-green-600 hover:underline">Выполнен</button>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-8 text-warm">Заказов пока нет</div>
        )}
      </div>
    </div>
  )
}
