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

  const isSwipe = () => {
    if (!touchStart || !touchEnd) return false;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    // Горизонтальный свайп + минимальное вертикальное смещение
    return Math.abs(distanceX) > MIN_SWIPE_DISTANCE && Math.abs(distanceY) < 30;
  };

  const handleSwipe = () => {
    if (!isSwipe()) return;

    const distanceX = touchStart.x - touchEnd.x;

    if (distanceX > 0) {
      nextImage(); // Смахнули влево → следующее
    } else {
      prevImage(); // Смахнули вправо → предыдущее
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

const handleTouchMove = (e) => {
  e.preventDefault(); // 🔥 КЛЮЧЕВОЕ ДЛЯ IPHONE — запрещаем скролл страницы и перехват жеста
  setTouchEnd({
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  });
};

  const handleTouchEnd = () => {
    handleSwipe();
    setTouchStart(null);
    setTouchEnd(null);
  };

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
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    if (Math.abs(distanceX) > 30 && Math.abs(distanceY) < 50) {
      if (distanceX > 0) {
        nextImage();
      } else {
        prevImage();
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
