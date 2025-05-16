import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import cartIcon from "../images/cart.png";
import phoneIcon from "../images/phone.png";
import mailIcon from "../images/mail.png";
import Searchbar from "./Searchbar";
import { CartContext } from "../contexts/CartContext";
import "../css/MobileHeader.scss";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mobile-header">
      <div className="mobile-header__contacts">
        <div className="contacts-mail">
          <a href="mailto:hello@vellmar.ru">hello@vellmar.ru</a>
          <img
            src={mailIcon}
            alt="mail"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
        <div className="contacts-number">
          <a href="tel:+74955329975">+7 (495) 532-99-75</a>
          <img
            src={phoneIcon}
            alt="phone"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
      </div>

      <div className="mobile-header__top">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="mobile-header__logo"
            style={{ width: "112px", height: "34px" }}
          />
        </Link>
        <div className="mobile-header__icons">
          <Link to="/cart">
            <img
              src={cartIcon}
              alt="cart"
              className="mobile-header__cart"
              style={{ width: "26px", height: "28px" }}
            />
            {totalCount > 0 && <div className="cart-badge">{totalCount}</div>}
          </Link>
          <button className="mobile-header__burger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <Searchbar />

      {menuOpen && (
        <div className="mobile-header__menu">
          <ul>
            <li>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li>
              <Link to="/brands">Бренды</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/delivery">Доставка и разгрузка</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
