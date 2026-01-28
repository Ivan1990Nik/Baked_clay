// src/components/products/Products.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./products.css";

import { getImage } from "../../utils/getImage";
import { useNavigate } from "react-router-dom"; // ✅ Импортируем useNavigate

const imageFiles = [
  "flora.png",
  "unicorn.png",
  "face.png",
  "bear.jpg",
  "love.png",
];

const images = imageFiles.map(file => getImage("carusel", file));

function Products() {
  const navigate = useNavigate(); // ✅ Используем хук

  return (
    <section id="products" className="products">
      <div className="products__container">
        <h2 className="products__title">Мои работы</h2>

        <div className="products__slider">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            loop={true}
            centeredSlides={true}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="product-card">
                  <img src={img} alt={`Товар ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button 
          className="products__btn"
          onClick={() => navigate("/product")} // ✅ SPA-переход, без перезагрузки
        >
          Посмотреть все работы
        </button>
      </div>
    </section>
  );
}

export default Products;
