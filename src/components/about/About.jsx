// src/components/about/About.jsx
import "./about.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="about__overlay">
        <div className="about__content">
          <h2>Обо мне</h2>

          <p>
            Меня зовут <strong>Яна</strong>.  
            Я создаю уникальные кружки с ручной лепкой —
            каждая работа сделана с душой и вниманием к деталям.
          </p>

          <p>
            Для меня важно, чтобы вещь была не просто красивой,
            а тёплой и «живой», чтобы радовала каждый день.
          </p>

          <p className="about__signature">
            Handmade • Индивидуальный подход • Любовь к деталям
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
