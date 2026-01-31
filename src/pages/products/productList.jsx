import { useEffect, useState, useRef } from "react";
import { Data } from "../../data/DataBase";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import work from "/images/work.png"; // ✅ ИСПРАВЛЕНО: /images/ — папка public

function ProductList() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalContentRef = useRef(null);

  // Для свайпов
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const MIN_SWIPE_DISTANCE = 40;

  // Проверка: был ли свайп?
  const isSwipe = () => {
    if (!touchStart || !touchEnd) return false;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    return Math.abs(distanceX) > MIN_SWIPE_DISTANCE && Math.abs(distanceY) < 30;
  };

  // Обработка свайпа
  const handleSwipe = () => {
    if (!isSwipe()) return;

    const distanceX = touchStart.x - touchEnd.x;

    if (distanceX > 0) {
      nextImage(); // Смахнули влево → следующее
    } else {
      prevImage(); // Смахнули вправо → предыдущее
    }
  };

  // Следующее изображение
  const nextImage = () => {
    if (currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Предыдущее изображение
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Открыть модалку
  const handleImageClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  // Закрыть модалку
  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.classList.remove("modal-open");
  };

  // Закрытие по ESC
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

  // 🔥 КЛЮЧЕВОЙ: Навешивание свайпов на модалку (только один раз!)
  useEffect(() => {
    const modal = modalContentRef.current;
    if (!modal) return;

    // Определяем обработчики внутри useEffect — чтобы они не менялись
    const handleTouchStart = (e) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    };

    const handleTouchMove = (e) => {
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

    // Добавляем слушатели с passive: true — для плавности на мобильных
    modal.addEventListener("touchstart", handleTouchStart, { passive: true });
    modal.addEventListener("touchmove", handleTouchMove, { passive: true });
    modal.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Очистка
    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchmove", handleTouchMove);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, []); // ✅ ПУСТОЙ МАССИВ — слушатели вешаются ОДИН РАЗ

  // Запрет прокрутки страницы при открытии модалки
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedProject]);

  return (
    <>
      {/* Основной список продуктов */}
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
                tabIndex={0} // ✅ Для клавиатурной навигации
                aria-label={`Открыть ${item.name}`}
              >
                <div className="product-list__card-image">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    loading="lazy" // ✅ Ленивая загрузка
                  />
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

      {/* Модальное окно — отображается только при selectedProject */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          aria-hidden="true"
        >
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()} // Не закрывать при клике внутри
            style={{ cursor: "pointer" }} // ✅ Критично для iOS свайпов!
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Закрыть кнопка */}
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Закрыть модальное окно"
            >
              ×
            </button>

            {/* Кнопка "Назад" */}
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

            {/* Изображение */}
            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.name} - фото ${currentImageIndex + 1}`}
              className="modal-image"
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              id="modal-title"
            />

            {/* Кнопка "Вперёд" */}
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

            {/* Индикатор */}
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
