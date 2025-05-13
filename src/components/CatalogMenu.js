import React, { useState } from "react";
import "../css/CatalogMenu.scss";
import { ReactComponent as MenuIcon } from "../images/burger.svg";

const CatalogMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="catalog-wrapper">
      <button className="catalog-button" onClick={toggleMenu}>
        <MenuIcon className="icon" />
        <span>{isOpen ? "Закрыть" : "Каталог"}</span>
      </button>
      {isOpen && (
        <div className="catalog-menu">
          <ul>
            <li>СМЕСИ СТРОИТЕЛЬНЫЕ</li>
            <li>ОБЩЕСТРОЙ</li>
            <li>ИЗОЛЯЦИЯ</li>
            <li>ИНСТРУМЕНТ</li>
            <li>ПИЛОМАТЕРИАЛЫ</li>
            <li>МЕТАЛЛ</li>
            <li>ЛАКОКРАСОЧНЫЕ МАТЕРИАЛЫ</li>
            <li>ЭЛЕКТРОТОВАРЫ</li>
            <li>ИНЖЕНЕРНАЯ ТЕХНИКА</li>
            <li>ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CatalogMenu;
