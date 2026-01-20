// src/components/products/Products.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./products.css";

 const images = [
    "/images/family.jpg",
    "/images/family.jpg",
    "/images/family.jpg",
    "/images/family.jpg",
    "/images/family.jpg",
  ];

function Products() {
 /*  const images = [img1, img2, img3]; */

  return (
    <section className="products">
      <div className="products__container">
        <h2 className="products__title">Товары</h2>

        {/* ВАЖНО: ограничивающий контейнер */}
        <div className="products__slider">
          <Swiper
            modules={[Pagination]}
            slidesPerView={2}
            spaceBetween={10}
            pagination={{ clickable: true }}
            loop={true}
            centeredSlides={true}
            navigation
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

        <button className="products__btn">
          Посмотреть все товары
        </button>
      </div>
    </section>
  );
}

export default Products;
