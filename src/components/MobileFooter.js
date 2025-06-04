import React from "react";
import { NavLink } from "react-router-dom";
import "../css/MobileFooter.scss";
import EmptyLogo from "../images/EmptyLogo.png";
import whatsapp from "../images/whatsapp.png";
import telegram from "../images/telegram.png";
import darkPhone from "../images/darkPhone.png";
import darkMail from "../images/darkMail.png";
import rs from "../images/rsLogo.png";

const MobileFooter = () => {
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
    <div className="mobile-footer">
      <img src={EmptyLogo} alt="logo" className="mobile-footer__logo" />
      <div className="mobile-footer__social">
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={telegram} className="footer__social-icon" />
        </a>
        <a
          href="https://wa.me/+79933367514"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsapp} className="footer__social-icon" />
        </a>
      </div>
      <div className="mobile-footer__contact">
        <img src={darkPhone} />
        <span>+7 (495) 532-99-75</span>
      </div>
      <div className="mobile-footer__contact">
        <img src={darkMail} />
        <span>hello@vellmar.ru</span>
      </div>
      <div className="mobile-footer__address">
        Юридический адрес: 117342, г. Москва, <br />
        вн.тер.г. муниципальный округ Коньково, <br />
        ул. Обручева, д. 52, стр. 3 <br />
        пн-сб: 8:00–20:00, вс: 09:00–19:00
      </div>
      <div className="mobile-footer__address" style={{ color: "#767676" }}>
        © 2020-2025 ООО «Джинова»
      </div>
      <div className="mobile-footer__section">
        <h2>КАТАЛОГ</h2>
        {categories.map((c, i) => (
          <NavLink key={i} to={c.link}>
            {c.name}
          </NavLink>
        ))}
      </div>
      <div className="mobile-footer__section">
        <h2>МЕНЮ И ИНФОРМАЦИЯ</h2>
        {menuLinks.map((l, i) => (
          <NavLink key={i} to={l.link}>
            {l.name}
          </NavLink>
        ))}
      </div>
      <div className="mobile-footer__powered">
        powered by <a href="https://rightshift.dev">right.shift</a>
        <img src={rs} />
      </div>
    </div>
  );
};

export default MobileFooter;
