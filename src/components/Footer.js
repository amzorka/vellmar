import React from "react";
import { NavLink } from "react-router-dom"; // Импортируем Link для маршрутизации
import "../css/Footer.scss";
import EmptyLogo from "../images/EmptyLogo.png";
import whatsapp from "../images/whatsapp.png";
import telegram from "../images/telegram.png";
import darkPhone from "../images/darkPhone.png";
import darkMail from "../images/darkMail.png";
import rs from "../images/rsLogo.png";

const Footer = () => {
  const categories = [
    { name: "Смеси строительные", link: "/catalog/mixes" },
    { name: "Общестрой", link: "/catalog/general" },
    { name: "Инструмент", link: "/catalog/instrument" },
    { name: "Лакокрасочные материалы", link: "/catalog/paints" },
    { name: "Отделочные материалы", link: "/catalog/finishing" },
    { name: "Инженерная техника", link: "/catalog/plumbing" },
    { name: "Электротовары", link: "/catalog/electrogoods" },
    { name: "Изоляция", link: "/catalog/isolation" },
    { name: "Пиломатериалы", link: "/catalog/lumber" },
    { name: "Металл", link: "/catalog/metal" },
  ];

  const menuLinks = [
    { name: "Главная", link: "/" },
    { name: "О нас", link: "/about" },
    { name: "Доставка и разгрузка", link: "/delivery" },
    { name: "Правовая информация", link: "/legal" },
    { name: "Контакты", link: "/contacts" },
  ];

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer__left">
          <h2 className="footer__title">КАТАЛОГ</h2>
          <div className="footer__links">
            {categories.map((category, index) => (
              <NavLink
                key={index}
                className="footer__link"
                to={category.link}
                activeclassname="active"
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="footer__right">
          <h2 className="footer__title">МЕНЮ И ИНФОРМАЦИЯ</h2>
          <div className="footer__links--right">
            {menuLinks.map((link, index) => (
              <NavLink
                key={index}
                className="footer__link"
                to={link.link}
                activeclassname="active"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="footer__contact">
          <div className="footer__logo">
            <img src={EmptyLogo} alt="logo"></img>
          </div>

          <div className="footer__social-icons">
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telegram} className="footer__social-icon" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsapp} className="footer__social-icon" />
            </a>
          </div>

          <div className="footer__contacts">
            <div className="footer__contact-item">
              +7 (495) 532-99-75
              <img src={darkPhone} className="footer__contact-icon" />
            </div>
            <div className="footer__contact-item">
              hello@vellmar.ru
              <img src={darkMail} className="footer__contact-icon" />
            </div>
            <div className="footer__contact-item" style={{ marginTop: "30px" }}>
              Юридический адрес: 117342, г. Москва,
              <br /> вн.тер.г. муниципальный округ Коньково,
              <br /> ул. Обручева, д. 52, стр. 3<br /> пн-пт: 9:00-18:00
            </div>
            <div
              className="footer__contact-item"
              style={{ marginTop: "30px", color: "#767676" }}
            >
              © 2020-2025 ООО «Джинова»
            </div>
          </div>
        </div>
        <div className="footer__powered">
          powered by{" "}
          <div className="footer__powered-link-block">
            <a
              href="https://rightshift.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__powered-link"
            >
              right.shift
            </a>
            <img
              src={rs}
              alt="RightShift Icon"
              className="footer__powered-icon"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
