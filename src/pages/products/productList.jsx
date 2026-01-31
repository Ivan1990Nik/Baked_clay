import { useEffect, useState, useRef } from "react";
import { Data } from "../../data/DataBase";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import work from "/images/work.png"

function ProductList() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalContentRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const MIN_SWIPE_DISTANCE = 40; // Уменьшено для лучшей отзывчивости


  

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.classList.remove("modal-open");
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

  // Навигация стрелками
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  // 🔥 КЛЮЧЕВОЙ ЭФФЕКТ: Привязка свайпов — с правильными настройками
  useEffect(() => {
  const modal = modalContentRef.current;
  if (!modal) return;

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

 const handleTouchMove = (e) => {
  e.preventDefault(); // 🔥 КРИТИЧНО ДЛЯ iOS
  setTouchEnd({
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  });

  // ✅ Визуальный эффект: "тянем" модалку вниз
  const modal = modalContentRef.current;
  if (modal && touchStart && touchEnd) {
    const deltaY = touchEnd.y - touchStart.y;
    if (deltaY > 0 && deltaY < 200) { // только при свайпе вниз, не слишком далеко
      modal.style.transform = `translateY(${deltaY * 0.6}px)`; // 60% от движения пальца
      modal.style.opacity = `${1 - deltaY / 400}`; // плавное прозрачное исчезновение
    } else {
      modal.style.transform = "none";
      modal.style.opacity = "1";
    }
  }
};

const handleTouchEnd = (e) => {
  if (!touchStart) return;

  const end = touchEnd || {
    x: e?.changedTouches?.[0]?.clientX || touchStart.x,
    y: e?.changedTouches?.[0]?.clientY || touchStart.y,
  };

  const distanceX = touchStart.x - end.x;
  const deltaY = end.y - touchStart.y; // 👈 ВНИМАНИЕ: end - start — теперь логично!

  // ✅ ЗАКРЫВАЕМ ПРИ СВАЙПЕ ВНИЗ (на 100px+)
  if (deltaY > 100 && Math.abs(distanceX) < 50) {
    closeModal();
    setTouchStart(null);
    setTouchEnd(null);
    return;
  }

  // ✅ ПЕРЕКЛЮЧАЕМ ИЗОБРАЖЕНИЯ ПРИ ГОРИЗОНТАЛЬНОМ СВАЙПЕ
  if (Math.abs(distanceX) > 30 && Math.abs(deltaY) < 50) {
    if (distanceX > 0) {
      nextImage(); // Палец двигался влево → следующее фото
    } else {
      prevImage(); // Палец двигался вправо → предыдущее фото
    }
  }

  setTouchStart(null);
  setTouchEnd(null);
};

  modal.addEventListener("touchstart", handleTouchStart, { passive: false });
  modal.addEventListener("touchmove", handleTouchMove, { passive: false });
  modal.addEventListener("touchend", handleTouchEnd, { passive: false });
  

  return () => {
    modal.removeEventListener("touchstart", handleTouchStart);
    modal.removeEventListener("touchmove", handleTouchMove);
    modal.removeEventListener("touchend", handleTouchEnd);
  };
}, [touchStart, touchEnd, nextImage, prevImage]);

  // Запрет прокрутки страницы
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedProject]);

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
          <img src={work} alt="work" />
          <div className="product-list__grid">
            {Data.map((item) => (
              <div
                key={item.id}
                className="product-list__card"
                onClick={() => handleImageClick(item)}
              >
                <div className="product-list__card-image">
                  <img src={item.images[0]} alt={item.name} />
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
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
           /*  style={{ cursor: "pointer" }} // 🔴 КРИТИЧНО ДЛЯ iOS */
          >
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
              onClick={(e) => e.stopPropagation()}
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
