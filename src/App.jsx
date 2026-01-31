import { Routes, Route } from "react-router-dom";
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Products from './components/products/Products';
import Reviews from './components/reviews/Reviews';
import Layout from './components/layout/Layout.jsx';
import ProductList from './pages/products/productList';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <About />
            <Products />
            <Reviews />
            <Contact />
          </Layout>
        }
      />

      <Route
        path="/product"
        element={
          <Layout>
            <ProductList />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
