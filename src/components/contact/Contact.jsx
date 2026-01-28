import bro from "../../assets/logo.PNG"
import "./contact.css";

function Contact() {
  return (
    <footer id="contacts" className="contact">
      <div className="contact__overlay">
        <div className="contact__container">

          <div className="contact__info">
            <h2 className="contact__title">Контакты</h2>

            <p>
              Если хотите заказать кружку или задать вопрос — напишите мне 💌
            </p>

            <div className="contact__items">
  <a href="https://t.me/YanaYan4" className="contact__item">📱 Telegram</a>
  <a href="https://t.me/Baked_clay_of_Yana" className="contact__item">💬 Telegram группа</a>
  <a href="https://max.ru/u/f9LHodD0cOL0lVjrp8-JMNXao1V4zR3iwTJjnHxs42IqU-dRYZMlWO87S6Q" className="contact__item">💬 max</a>
</div>
          </div>

          <div className="contact__bottom">
            <p>© 2026 Авторская лепка на кружках</p>
            <p>
              Сайт разработал{" "}
              <a
                href="https://ivan1990nik.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <img src={bro} alt="" style={{width: 100}}/>
                {/* Бро.dev */}
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Contact;
