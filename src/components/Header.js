import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/Header.scss";
import logo from "../images/logo.png";
import Searchbar from "./Searchbar";
import CatalogMenu from "./CatalogMenu";
import cart from "../images/cart.png";
import mail from "../images/mailNew.png";
import phone from "../images/phoneNew.png";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const headerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  const handleScroll = () => {
    const currentY = window.scrollY;

    if (currentY > lastScrollY && currentY > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(currentY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`nav-menu ${hidden ? "header-hidden" : ""}`}
      ref={headerRef}
    >
      <header className="header">
        <div className="header__brands">
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <CatalogMenu />
          <Searchbar />
          <Link to="/cart" className="cart-icon-wrapper">
            <img
              src={cart}
              alt="cart"
              style={{ width: "25px", height: "25px" }}
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
          <a href="tel:+74955329975">
            <img
              src={phone}
              alt="phone"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
            />
          </a>
          <a
            href="mailto:hello@vellmar.ru"
            className="contact-link"
            style={{ marginLeft: "40px" }}
          >
            hello@vellmar.ru
          </a>
          <a href="mailto:hello@vellmar.ru">
            <img
              src={mail}
              alt="mail"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
            />
          </a>
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
            <NavLink to="/contacts">Контакты</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
