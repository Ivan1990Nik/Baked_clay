// src/components/header/Header.jsx
import { useState } from "react";
import "./header.css";

import logo from "/images/logo3.png"
import log from "/images/log.PNG"

import sticHeader from "/images/stic-header.png"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo">
          <img src={logo} alt="logo" style={{ width: 230, height: 70 }} />
        </div>

        <nav className={`nav ${isOpen ? "nav--open" : ""}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>Обо мне</a>
          <a href="#products" onClick={() => setIsOpen(false)}>Мой работы</a>
          <a href="#reviews" onClick={() => setIsOpen(false)}>Отзывы</a>
          <a href="#contacts" onClick={() => setIsOpen(false)}>Контакты</a>
        </nav>
        <div
          className={`burger ${isOpen ? "burger--open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="header__main">
        <img src={sticHeader} alt="logo" className="header__main__img"  />
        <div className="header__main__item">
          <img src={log} alt="logos"  />
          <p className="header__main__title" >«Здесь глина превращается в настроение, а кружки — в маленькие истории»</p>
        </div>
      </div>
    </header>
  );
}
