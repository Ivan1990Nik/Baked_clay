// src/components/header/Header.jsx
import { useState } from "react";
import "./header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo">
          Baked clay of <span>Yana</span>
        </div>

        {/* НАВИГАЦИЯ */}
        <nav className={`nav ${isOpen ? "nav--open" : ""}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>Обо мне</a>
          <a href="#products" onClick={() => setIsOpen(false)}>Товары</a>
          <a href="#reviews" onClick={() => setIsOpen(false)}>Отзывы</a>
          <a href="#contacts" onClick={() => setIsOpen(false)}>Контакты</a>
        </nav>

        {/* БУРГЕР */}
        <div
          className={`burger ${isOpen ? "burger--open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </div>

      </div>
    </header>
  );
}
