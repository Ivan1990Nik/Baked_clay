import { useEffect, useState } from "react";
import { Data } from "../../data/DataBase";
import "./productList.css";
import { useNavigate } from "react-router-dom";



function ProductList() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Сбрасываем на первое фото
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Навигация стрелками клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

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
              <div
                key={item.id}
                className="product-list__card"
                onClick={() => handleImageClick(item)}
              >
                <div className="product-list__card-image">
                  <img src={item.images[0]} alt={item.name} /> {/* Показываем первое фото */}
                </div>
                <div className="product-list__card-content">
                  <h3 className="product-list__card-title">{item.name}</h3>
                  <p className="product-list__card-price">{item.price}₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно галереи */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <button
              className="modal-nav-btn modal-nav-btn--prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              disabled={currentImageIndex === 0}
            >
              ←
            </button>

            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.name} - фото ${currentImageIndex + 1}`}
              className="modal-image"
              onClick={(e) => e.stopPropagation()} // Не закрывать при клике на фото
            />

            <button
              className="modal-nav-btn modal-nav-btn--next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              disabled={currentImageIndex === selectedProject.images.length - 1}
            >
              →
            </button>

            <div className="modal-indicator">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
