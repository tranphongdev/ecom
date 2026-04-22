import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/common/ScrollToTop'
import PromoBanner from './components/common/PromoBanner'
import themeConfig from './theme/themeConfig'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <Router>
          <ScrollToTop />
          <PromoBanner />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='product/:id' element={<ProductDetail />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path=':category' element={<ProductList />} />
              <Route path='products' element={<ProductList />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
