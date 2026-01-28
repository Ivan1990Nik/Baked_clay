// src/components/header/Header.jsx
import { useState } from "react";
import "./header.css";

import logo from "../../../public/images/logo2.png"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo">
          <img src={logo} alt="" style={{width: 178, height: 60}}/>
          {/* Baked clay of <span>Yana</span> */}
        </div>

        <nav className={`nav ${isOpen ? "nav--open" : ""}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>Обо мне</a>
          <a href="#products" onClick={() => setIsOpen(false)}>Товары</a>
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
    </header>
  );
}
