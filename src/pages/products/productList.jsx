import { useEffect, useState, useRef } from "react";
import { Data } from "../../data/DataBase";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import work from "/images/work.png";

function ProductList() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalContentRef = useRef(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const MIN_SWIPE_DISTANCE = 40;

  const isSwipe = () => {
    if (!touchStart || !touchEnd) return false;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    return Math.abs(distanceX) > MIN_SWIPE_DISTANCE && Math.abs(distanceY) < 30;
  };

  const handleSwipe = () => {
    if (!isSwipe()) return;

    const distanceX = touchStart.x - touchEnd.x;
    if (distanceX > 0) nextImage();
    else prevImage();
  };

  const nextImage = () => {
    if (currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
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

  // ESC закрытие
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Стрелки клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  // 🔥 КЛЮЧЕВОЙ ИСПРАВЛЕНИЕ: УБИРАЕМ ПОПЫТКУ ПОДВЕСИТЬ СВАЙП НА .modal-content
  // Вместо этого — ВЕСЬ .modal-overlay ЛОВИТ СВАЙПЫ, а .modal-content — просто отображается
  // И НАСТРОЙКА cursor: pointer — на самом .modal-overlay, а не на .modal-content!
  useEffect(() => {
    const modalOverlay = document.querySelector(".modal-overlay");
    if (!modalOverlay) return;

    const handleTouchStart = (e) => {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchMove = (e) => {
      setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = () => {
      handleSwipe();
      setTouchStart(null);
      setTouchEnd(null);
    };

    // ✅ ВАЖНО: СЛУШАТЕЛИ НА .modal-overlay, а не на .modal-content
    modalOverlay.addEventListener("touchstart", handleTouchStart, { passive: true });
    modalOverlay.addEventListener("touchmove", handleTouchMove, { passive: true });
    modalOverlay.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      modalOverlay.removeEventListener("touchstart", handleTouchStart);
      modalOverlay.removeEventListener("touchmove", handleTouchMove);
      modalOverlay.removeEventListener("touchend", handleTouchEnd);
    };
  }, []); // ✅ ПУСТОЙ МАССИВ — только один раз

  // Запрет прокрутки
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedProject]);

  return (
    <>
      {/* Основной список */}
      <section className="product-list">
        <button className="product-list__back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        <div className="product-list__container">
          <img src={work} alt="Work background" className="product-list__banner" />

          <div className="product-list__grid">
            {Data.map((item) => (
              <div
                key={item.id}
                className="product-list__card"
                onClick={() => handleImageClick(item)}
                tabIndex={0}
                aria-label={`Открыть ${item.name}`}
              >
                <div className="product-list__card-image">
                  <img src={item.images[0]} alt={item.name} loading="lazy" />
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

      {/* 🔥 ИСПРАВЛЕНИЕ: СВАЙП ЛОВИТСЯ НА .modal-overlay, а не на .modal-content */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          aria-hidden="true"
          style={{ cursor: "pointer" }} // ✅ КЛЮЧЕВОЕ: ЭТОТ ЭЛЕМЕНТ ЛОВИТ СВАЙПЫ — ДОЛЖЕН БЫТЬ ИНТЕРАКТИВНЫМ
        >
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()} // Не закрывать при клике внутри
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Закрыть модальное окно"
            >
              ×
            </button>

            <button
              className="modal-nav-btn modal-nav-btn--prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              disabled={currentImageIndex === 0}
              aria-label="Предыдущее изображение"
            >
              ←
            </button>

            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.name} - фото ${currentImageIndex + 1}`}
              className="modal-image"
              loading="lazy"
              id="modal-title"
            />

            <button
              className="modal-nav-btn modal-nav-btn--next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              disabled={currentImageIndex === selectedProject.images.length - 1}
              aria-label="Следующее изображение"
            >
              →
            </button>

            <div className="modal-indicator" id="modal-description">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
