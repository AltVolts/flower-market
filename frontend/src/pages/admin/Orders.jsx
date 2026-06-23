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
      new: 'bg-primary/20 text-primary-dark',
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-secondary/20 text-secondary-dark'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-heading font-bold mb-8 text-warm">Заказы</h1>

      <div className="flex gap-3 mb-8">
        {['all', 'new', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              filter === status 
                ? 'bg-primary text-warm shadow-soft' 
                : 'bg-surface text-warm-light hover:bg-cream'
            }`}
          >
            {status === 'all' ? 'Все' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-heading font-semibold text-xl text-warm">Заказ #{order.id}</h3>
                <p className="text-warm-light mt-1">{order.customer_name} • {order.phone}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            {order.comment && (
              <p className="text-warm-light mb-4 bg-cream/50 p-4 rounded-xl">Комментарий: {order.comment}</p>
            )}
            <div className="flex gap-3 mt-4">
              {order.status !== 'in_progress' && (
                <button onClick={() => handleStatusChange(order.id, 'in_progress')}
                  className="px-4 py-2 rounded-xl border border-primary text-primary-dark hover:bg-primary/10 transition-colors font-medium">
                  В работу
                </button>
              )}
              {order.status !== 'completed' && (
                <button onClick={() => handleStatusChange(order.id, 'completed')}
                  className="px-4 py-2 rounded-xl border border-secondary text-secondary-dark hover:bg-secondary/10 transition-colors font-medium">
                  Выполнен
                </button>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-warm-light text-xl">Заказов пока нет</p>
          </div>
        )}
      </div>
    </div>
  )
}
