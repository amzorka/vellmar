import React from "react";
import { NavLink } from "react-router-dom";
import "../css/MobileMenu.scss";

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <NavLink to="/" className="mobile-menu__link" onClick={onClose}>
          Главная
        </NavLink>
        <NavLink to="/catalog" className="mobile-menu__link" onClick={onClose}>
          Каталог
        </NavLink>
        <NavLink to="/brands" className="mobile-menu__link" onClick={onClose}>
          Бренды
        </NavLink>
        <NavLink to="/about" className="mobile-menu__link" onClick={onClose}>
          О нас
        </NavLink>
        <NavLink to="/delivery" className="mobile-menu__link" onClick={onClose}>
          Доставка и разгрузка
        </NavLink>
        <NavLink to="/legal" className="mobile-menu__link" onClick={onClose}>
          Правовая информация
        </NavLink>
        <NavLink to="/contacts" className="mobile-menu__link" onClick={onClose}>
          Контакты
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
