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
            <Link to="/catalog/mixes">СМЕСИ СТРОИТЕЛЬНЫЕ</Link>
          </li>
          <li>
            <Link to="/catalog/general">ОБЩЕСТРОЙ</Link>
          </li>
          <li>
            <Link to="/catalog/isolation">ИЗОЛЯЦИЯ</Link>
          </li>
          <li>
            <Link to="/catalog/instrument">ИНСТРУМЕНТ</Link>
          </li>
          <li>
            <Link to="/catalog/lumber">ПИЛОМАТЕРИАЛЫ</Link>
          </li>
          <li>
            <Link to="/catalog/metal">МЕТАЛЛ</Link>
          </li>
          <li>
            <Link to="/catalog/paints">ЛАКОКРАСОЧНЫЕ МАТЕРИАЛЫ</Link>
          </li>
          <li>
            <Link to="/catalog/electrogoods">ЭЛЕКТРОТОВАРЫ</Link>
          </li>
          <li>
            <Link to="/catalog/plumbing">ИНЖЕНЕРНАЯ САНТЕХНИКА</Link>
          </li>
          <li>
            <Link to="/catalog/finishing">ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatalogMenu;
