import { useNavigate } from "react-router-dom";
import { Data } from "../../data/DataBase";
import "./productList.css";
import { useEffect, useState } from "react";

function ProductList() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); // Состояние для открытого изображения

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Обработка нажатия на Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <section className="product-list">
        <button 
          className="product-list__back-btn"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>

        <div className="product-list__container">
          <h1>Все мои работы</h1>
          <div className="product-list__grid">
            {Data.map((item) => (
              <div key={item.id} className="product-list__card">
                <div 
                  className="product-list__card-image"
                  onClick={() => handleImageClick(item.img)}
                >
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="product-list__card-content">
                  <h3 className="product-list__card-title">{item.name}</h3>
                  <p className="product-list__card-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно увеличения изображения */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img src={selectedImage} alt="увеличенная работа" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
