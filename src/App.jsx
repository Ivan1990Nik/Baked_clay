import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Header from './components/header/Header'
import Products from './components/products/Products'
import Reviews from './components/reviews/Reviews'

import Product from './pages/products/productList'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
        
          <Header />
          <About />
          <Products />
          <Reviews />
          <Contact />
        </>
      } />

      {/* Отдельная страница с деталями работы — только детали! */}
      <Route path="/product" element={<Product />} />
    </Routes>
  )
}

export default App
