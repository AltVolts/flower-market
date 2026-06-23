const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function fetchProducts(categoryId = null) {
  const url = categoryId
    ? `${API_BASE}/products/?category_id=${categoryId}`
    : `${API_BASE}/products/`
  const res = await fetch(url)
  return res.json()
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`)
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`)
  return res.json()
}

export async function createOrder(order) {
  const res = await fetch(`${API_BASE}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  return res.json()
}

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings/`)
  return res.json()
}

export async function createProduct(product) {
  const res = await fetch(`${API_BASE}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return res.json()
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

export async function createCategory(category) {
  const res = await fetch(`${API_BASE}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  })
  return res.json()
}

export async function updateCategory(id, category) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  })
  return res.json()
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

export async function fetchOrders(status = null) {
  const url = status
    ? `${API_BASE}/orders/?status=${status}`
    : `${API_BASE}/orders/`
  const res = await fetch(url)
  return res.json()
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API_BASE}/orders/${id}/status?status=${status}`, {
    method: 'PUT'
  })
  return res.json()
}

export async function updateSettings(settings) {
  const res = await fetch(`${API_BASE}/settings/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
  return res.json()
}
