// src/components/about/About.jsx
import "./about.css";
import velcome from "../../../public/images/velcome.png"


function About() {
  return (
    <section id="about" className="about">
      <div className="about__overlay">
        <div className="about__content">
          <img src={velcome} alt="" /* style={{width: 500}} *//>

          <p>
            Меня зовут <strong>Яна</strong>.
            Я создаю уникальные кружки с ручной лепкой —
            каждая работа сделана с душой и вниманием к деталям.
          </p>
          <p>
            Занимаюсь творчеством с 2019 года.
          </p>
          <p>
            Это невероятно красивое занятие, которое успокаивает нервы и добавляет вкуса к жизни.
          </p>
          <p>
            Для меня важно, чтобы вещь была не просто красивой,
            а тёплой и «живой», чтобы она радовала каждый день.
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
