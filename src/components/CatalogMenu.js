import React, { useState } from "react";
import "../css/CatalogMenu.scss";
import { ReactComponent as MenuIcon } from "../images/burger.svg";
import { Link } from "react-router-dom";

const CatalogMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="catalog-wrapper">
      <button
        className={`catalog-button ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <MenuIcon className="icon" />
        <span>{isOpen ? "Закрыть" : "Каталог"}</span>
      </button>

      <div className={`catalog-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/mixes">СМЕСИ СТРОИТЕЛЬНЫЕ</Link>
          </li>
          <li>
            <Link to="/general">ОБЩЕСТРОЙ</Link>
          </li>
          <li>
            <Link to="/isolation">ИЗОЛЯЦИЯ</Link>
          </li>
          <li>
            <Link to="/instrument">ИНСТРУМЕНТ</Link>
          </li>
          <li>
            <Link to="/lumber">ПИЛОМАТЕРИАЛЫ</Link>
          </li>
          <li>
            <Link to="/metal">МЕТАЛЛ</Link>
          </li>
          <li>
            <Link to="/paints">ЛАКОКРАСОЧНЫЕ МАТЕРИАЛЫ</Link>
          </li>
          <li>
            <Link to="/electrogoods">ЭЛЕКТРОТОВАРЫ</Link>
          </li>
          <li>
            <Link to="/engineering">ИНЖЕНЕРНАЯ ТЕХНИКА</Link>
          </li>
          <li>
            <Link to="/finishing">ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatalogMenu;
