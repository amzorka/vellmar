import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../images/Vector 1.svg";
import "../css/ProductSection.scss";
import AddToCartButton from "../components/AddToCartButton";

// --- Корректные пути категорий ---
const CATEGORY_PATHS = {
  "Смеси строительные": "Главная -> Смеси строительные",
  "Лак и растворитель":
    "Главная -> Лакокрасочные материалы -> Лак и растворитель",
  Утеплители: "Главная -> Изоляция -> Утеплители",
  Инструменты: "Главная -> Инструмент",
};

// --- Ссылки для кнопок "Перейти" ---
const CATEGORY_LINKS = {
  "Смеси строительные": "/catalog/mixes",
  "Лак и растворитель": "/catalog/paints/varnish-and-solvent",
  Утеплители: "/catalog/isolation/insulation-materials",
  Инструменты: "/catalog/instrument",
};

const ProductSection = () => {
  const [productsByCategory, setProductsByCategory] = useState({
    "Смеси строительные": [],
    "Лак и растворитель": [],
    Утеплители: [],
    Инструменты: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const newProducts = {};

      for (const [categoryName, fullPath] of Object.entries(CATEGORY_PATHS)) {
        try {
          const response = await fetch(
            `https://api.vellmar.ru/products?category=${encodeURIComponent(
              fullPath
            )}&limit=5&offset=0`
          );
          const data = await response.json();
          newProducts[categoryName] = data.products || [];
        } catch (error) {
          console.error(
            `Ошибка загрузки товаров для категории ${categoryName}:`,
            error
          );
          newProducts[categoryName] = [];
        }
      }

      setProductsByCategory(newProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {Object.entries(CATEGORY_PATHS).map(([categoryName]) => (
        <section key={categoryName} className="product-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                <Link
                  to={CATEGORY_LINKS[categoryName]}
                  className="category-link"
                >
                  {categoryName}
                </Link>
                <ArrowIcon className="title-arrow" />
              </h2>
            </div>

            {productsByCategory[categoryName] &&
            productsByCategory[categoryName].length > 0 ? (
              <div className="products-grid">
                {productsByCategory[categoryName].map((product, index) => {
                  const sortedImages = (product.images || []).sort(
                    (a, b) => a.order_number - b.order_number
                  );
                  const imageUrl =
                    sortedImages.length > 0
                      ? `https://famarket.ru${sortedImages[0].link}`
                      : "";

                  return (
                    <div key={index} className="product-card">
                      <Link
                        to={`/product${product.link}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="product-image-container">
                          <img
                            src={imageUrl}
                            alt={product.title}
                            className="product-image"
                          />
                        </div>
                        <h3 className="product-title">{product.title}</h3>
                      </Link>
                      <div className="product-price">
                        Цена:{" "}
                        {product.price > 0
                          ? `${product.price} руб.`
                          : "По запросу"}
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Товары не найдены.</p>
            )}
          </div>
        </section>
      ))}

      <div className="open-catalog-button-wrapper">
        <Link to="/catalog" className="open-catalog-button">
          Весь каталог
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
