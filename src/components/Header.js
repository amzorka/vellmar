import React, { useContext } from "react";
import "../css/Header.scss";
import logo from "../images/logo.png";
import Searchbar from "./Searchbar";
import CatalogMenu from "./CatalogMenu";
import cart from "../images/cart.png";
import mail from "../images/mail.png";
import phone from "../images/phone.png";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="header">
        <div className="header__brands">
          <img src={logo} alt="logo" className="logo" />
          <CatalogMenu />
          <Searchbar />
          <Link to="/cart" className="cart-icon-wrapper">
            <img
              src={cart}
              alt="cart"
              style={{ width: "30px", height: "30px" }}
            />
            {totalCount > 0 && <div className="cart-badge">{totalCount}</div>}
          </Link>
        </div>
        <div className="header__contacts">
          <a
            href="tel:+74955329975"
            className="contact-link"
            style={{ marginLeft: "75px" }}
          >
            +7 (495) 532-99-75
          </a>
          <img
            src={phone}
            alt="phone"
            style={{ width: "20px", height: "20px", marginLeft: "15px" }}
          />
          <a
            href="mailto:hello@vellmar.ru"
            className="contact-link"
            style={{ marginLeft: "40px" }}
          >
            hello@vellmar.ru
          </a>
          <img
            src={mail}
            alt="mail"
            style={{ width: "20px", height: "20px", marginLeft: "15px" }}
          />
        </div>
      </header>

      <div className="nav-bar">
        <div className="nav-bar__content">
          <div className="primary-nav">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/catalog">Каталог</NavLink>
            <NavLink to="/brands">Бренды</NavLink>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/delivery">Доставка и разгрузка</NavLink>
            <NavLink to="/legal">Правовая информация</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
