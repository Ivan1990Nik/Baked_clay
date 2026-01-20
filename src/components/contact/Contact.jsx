// src/components/contact/Contact.jsx
import "./contact.css";

function Contact() {
  return (
    <footer className="contact">
      <div className="contact__overlay">
        <div className="contact__container">

          <div className="contact__info">
            <h2 className="contact__title">Контакты</h2>

            <p>
              Если хотите заказать кружку или задать вопрос — напишите мне 💌
            </p>

            <div className="contact__items">
              <a href="tel:+79999999999">📞 +7 (999) 999-99-99</a>
              <a href="mailto:example@mail.ru">✉️ example@mail.ru</a>
              <a href="https://instagram.com" target="_blank">📸 Instagram</a>
              <a href="https://wa.me/79999999999" target="_blank">💬 WhatsApp</a>
            </div>
          </div>

          <div className="contact__bottom">
            <p>© 2026 Авторская лепка на кружках</p>
            <p>
              Сайт сделан с ❤️  
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Contact;
