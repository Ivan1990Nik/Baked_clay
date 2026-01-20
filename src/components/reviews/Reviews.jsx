
// src/components/reviews/Reviews.jsx
import "./reviews.css";

function Reviews() {
  const reviews = [
    {
      name: "Анна",
      text: "Очень красивые кружки! Видно, что сделано с душой. Спасибо огромное!",
    },
    {
      name: "Мария",
      text: "Заказывала кружку в подарок — получилось просто шикарно!",
    },
    {
      name: "Екатерина",
      text: "Качество супер, лепка аккуратная, обязательно закажу ещё 💛",
    },
    {
      name: "Ольга",
      text: "Очень приятное общение и быстрая доставка. Рекомендую!",
    },
  ];

  return (
    <section className="reviews">
      <div className="reviews__overlay">
        <div className="reviews__container">
          <h2 className="reviews__title">Отзывы</h2>

          <div className="reviews__list">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`review-card ${index % 2 === 0 ? "left" : "right"}`}
              >
                <p className="review-text">“{review.text}”</p>
                <span className="review-name">— {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
