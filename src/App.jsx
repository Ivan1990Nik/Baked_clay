import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Header from './components/header/Header'
import Products from './components/products/Products'
import Reviews from './components/reviews/Reviews'
import Layout from './components/layout/Layout.jsx';

import ProductList from './pages/products/productList'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Layout />
          <Header />
          <About />
          <Products />
          <Reviews />
          <Contact />
        </>
      } />
      <Route path="/product" element={<ProductList />} />
    </Routes>
  )
}

export default App
