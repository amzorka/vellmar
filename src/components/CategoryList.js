import React from "react";
import "../css/CategoryList.scss";
import mixes from "../images/categories/mix.jpg";
import general from "../images/categories/general.jpg";
import instrument from "../images/categories/instrument.jpg";
import paints from "../images/categories/paints.jpg";
import finishing from "../images/categories/finishing.jpg";
import plumbing from "../images/categories/plumbing.jpg";
import electrogoods from "../images/categories/electrogoods.jpg";
import isolation from "../images/categories/isolation.jpg";
import lumber from "../images/categories/lumber.jpg";
import metal from "../images/categories/metal.jpg";
import { Link } from "react-router-dom";

const categories = [
  { name: "СМЕСИ СТРОИТЕЛЬНЫЕ", imgSrc: mixes, link: "/catalog/mixes" },
  { name: "ОБЩЕСТРОЙ", imgSrc: general, link: "/catalog/general" },
  { name: "ИНСТРУМЕНТЫ", imgSrc: instrument, link: "/catalog/instrument" },
  { name: "ЛАКОКРАСОЧНЫЕ МАТЕРИАЛЫ", imgSrc: paints, link: "/catalog/paints" },
  {
    name: "ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ",
    imgSrc: finishing,
    link: "/catalog/finishing",
  },
  {
    name: "ИНЖЕНЕРНАЯ САНТЕХНИКА",
    imgSrc: plumbing,
    link: "/catalog/plumbing",
  },
  {
    name: "ЭЛЕКТРОТОВАРЫ",
    imgSrc: electrogoods,
    link: "/catalog/electrogoods",
  },
  { name: "ИЗОЛЯЦИЯ", imgSrc: isolation, link: "/catalog/isolation" },
  { name: "ПИЛОМАТЕРИАЛЫ", imgSrc: lumber, link: "/catalog/lumber" },
  { name: "МЕТАЛЛ", imgSrc: metal, link: "/catalog/metal" },
];

const CategoryList = () => {
  return (
    <div className="category-list-container">
      <div className="categories-cards">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-card-link">
            <div key={index} className="categories-card">
              <img
                src={category.imgSrc}
                alt={category.name}
                className="categories-image"
              />
              <div className="categories-name">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
