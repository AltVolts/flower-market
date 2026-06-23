import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Order from './pages/Order'
import Contacts from './pages/Contacts'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Categories from './pages/admin/Categories'
import Orders from './pages/admin/Orders'
import Settings from './pages/admin/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={
            <div className="flex min-h-screen bg-cream">
              <aside className="w-64 bg-warm text-cream min-h-screen p-6">
                <a href="/" className="flex items-center space-x-2 mb-8">
                  <span className="text-2xl">🌸</span>
                  <span className="font-heading font-bold">Админ</span>
                </a>
                <nav className="space-y-1">
                  <a href="/admin" className="block px-4 py-3 rounded-xl hover:bg-warm-light/20 transition-colors">Главная</a>
                  <a href="/admin/products" className="block px-4 py-3 rounded-xl hover:bg-warm-light/20 transition-colors">Товары</a>
                  <a href="/admin/categories" className="block px-4 py-3 rounded-xl hover:bg-warm-light/20 transition-colors">Категории</a>
                  <a href="/admin/orders" className="block px-4 py-3 rounded-xl hover:bg-warm-light/20 transition-colors">Заказы</a>
                  <a href="/admin/settings" className="block px-4 py-3 rounded-xl hover:bg-warm-light/20 transition-colors">Настройки</a>
                </nav>
              </aside>
              <main className="flex-1 p-8">
                <Routes>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/categories" element={<Categories />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          } />
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/contacts" element={<Contacts />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
