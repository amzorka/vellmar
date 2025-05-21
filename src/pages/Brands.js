import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";
import Breadcrumbs from "../components/Breadcrumbs";
import PageLoader from "../components/PageLoader"; // ← добавили лоадер
import useIsMobile from "../hooks/useIsMobile";
import "../css/Brands.scss";

function Brands() {
  const isMobile = useIsMobile();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // ← добавили состояние загрузки

  useEffect(() => {
    fetch("https://api.vellmar.ru/brands")
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((brand) => brand.name.trim());
        setBrands(names);
      })
      .catch((err) => console.error("Ошибка загрузки брендов:", err))
      .finally(() => setLoading(false)); // ← завершили загрузку
  }, []);

  // Группировка брендов по первой букве
  const groupedBrands = {};
  brands.forEach((brand) => {
    const firstLetter = brand[0]?.toUpperCase();
    if (!groupedBrands[firstLetter]) {
      groupedBrands[firstLetter] = [];
    }
    groupedBrands[firstLetter].push(brand);
  });

  const alphabet = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  ];

  return (
    <div className="brands-page">
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />

      <h1 className="category-title">Бренды</h1>

      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="alphabet-nav">
            {alphabet.map((letter) =>
              groupedBrands[letter] ? (
                <a key={letter} href={`#letter-${letter}`}>
                  {letter}
                </a>
              ) : (
                <span key={letter} className="disabled-letter">
                  {letter}
                </span>
              )
            )}
          </div>

          <div className="brands-list">
            {alphabet.map(
              (letter) =>
                groupedBrands[letter] && (
                  <div
                    key={letter}
                    id={`letter-${letter}`}
                    className="letter-group"
                  >
                    <h2>{letter}</h2>
                    <div className="brand-buttons">
                      {groupedBrands[letter].map((brand) => (
                        <Link
                          key={brand}
                          to={`/brand-products?name=${encodeURIComponent(
                            brand
                          )}`}
                          className="brand-card"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      )}
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default Brands;
