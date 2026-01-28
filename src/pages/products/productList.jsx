// src/pages/products/ProductList.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/getImage";

const imageFiles = [
  "flora.png",
  "face.png",
  "face.png",
  "bear.jpg",
  "love.png",
];

const images = imageFiles.map(file => getImage("carusel", file));

function ProductList() {
  const navigate = useNavigate();

  // При загрузке страницы можно добавить логику (например, загрузку данных)
  useEffect(() => {
    console.log("ProductList page loaded");
  }, []);

  return (
    <section className="product-list">
      <button 
          className="product-list__back-btn"
          onClick={() => navigate(-1)} // Вернуться назад
        >
          ← Назад
        </button>
      <div className="product-list__container">
        <h1>Все мои работы</h1>
        <div className="product-list__grid">
          {images.map((img, index) => (
            <div key={index} className="product-list__card">
              <img src={img} alt={`Работа ${index + 1}`} />
              <p>Работа {index + 1}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

export default ProductList;
