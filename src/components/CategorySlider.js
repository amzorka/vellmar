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

import React, { useRef } from "react";
import "../css/CategorySlider.scss";
import ArrowLeft from "../images/ArrowLeft.png";
import ArrowRight from "../images/ArrowRight.png";
import { ReactComponent as ArrowIcon } from "../images/Vector 1.svg";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 240; // Ширина одной карточки
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categories = [
    { name: "СМЕСИ СТРОИТЕЛЬНЫЕ", image: mixes, link: "/catalog/mixes" },
    { name: "ОБЩЕСТРОЙ", image: general, link: "/catalog/general" },
    { name: "ИНСТРУМЕНТ", image: instrument, link: "/catalog/instrument" },
    { name: "ЛАКОКРАСОЧНЫЕ МАТЕРИАЛЫ", image: paints, link: "/catalog/paints" },
    { name: "ИЗОЛЯЦИЯ", image: isolation, link: "/catalog/isolation" },
    {
      name: "ИНЖЕНЕРНАЯ САНТЕХНИКА",
      image: plumbing,
      link: "/catalog/plumbing",
    },
    {
      name: "ЭЛЕКТРОТОВАРЫ",
      image: electrogoods,
      link: "/catalog/electrogoods",
    },
    {
      name: "ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ",
      image: finishing,
      link: "/catalog/finishing",
    },
    { name: "ПИЛОМАТЕРИАЛЫ", image: lumber, link: "/catalog/lumber" },
    { name: "МЕТАЛЛ", image: metal, link: "/catalog/metal" },
  ];

  return (
    <div className="category-slider-container">
      <a href="/catalog" className="catalog-link">
        <h2 className="slider-title">
          Каталог
          <ArrowIcon className="title-arrow" />
        </h2>
      </a>
      <div className="slider-wrapper">
        <button className="slider-arrow left" onClick={() => scroll("left")}>
          <img src={ArrowLeft} alt="arrow" style={{ width: "20px" }}></img>
        </button>

        <div className="cards-scroll-container" ref={scrollRef}>
          <div className="cards-track">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <div key={index} className="category-card">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-image"
                  />
                  <h3 className="card-title">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button className="slider-arrow right" onClick={() => scroll("right")}>
          {" "}
          <img src={ArrowRight} alt="arrow" style={{ width: "20px" }}></img>
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
