import AddToCartButton from "./AddToCartButton";
import React from "react";
import { Link } from "react-router-dom";
import RequestButton from "../components/RequestButton";
import { useState } from "react";
import CartNotification from "../components/CartNotification";

const ProductCard = ({ product, openModal }) => {
  const sortedImages = (product.images || []).sort(
    (a, b) => a.order_number - b.order_number
  );
  const imageUrl =
    sortedImages.length > 0 ? `https://famarket.ru${sortedImages[0].link}` : "";

  const hasVariants =
    product.variants && Object.keys(product.variants).length > 0;

  const [showNotification, setShowNotification] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError && product.link) {
      setImageError(true);

      fetch("https://api.vellmar.ru/collect-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.link }), // или product.id если так нужно
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Ошибка перепарсинга");
          }
          console.log("Отправлен на перепарсинг:", product.link);
        })
        .catch((err) => {
          console.error("Ошибка запроса на collect-product:", err);
        });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product${product.link}`}>
        <img
          src={imageUrl}
          alt={product.title.replace(/;+$/, "")}
          className="product-image"
          onError={handleImageError}
        />
        <h3 className="product-title">{product.title.replace(/;+$/, "")}</h3>
      </Link>
      <p className="product-price">
        {product.price > 0
          ? `${new Intl.NumberFormat("ru-RU", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true,
            })
              .format(product.price)
              .replace(",", ".")} ₽`
          : "Цена по запросу"}
      </p>
      {hasVariants ? (
        <Link to={`/product${product.link}`} className="product-choose-button">
          Выбрать
        </Link>
      ) : product.price > 0 ? (
        <>
          <AddToCartButton product={product} />
          {showNotification && (
            <CartNotification onClose={() => setShowNotification(false)} />
          )}
        </>
      ) : (
        <RequestButton
          onClick={() => openModal(product)}
          product={product}
          onRequestClick={(p) => openModal(p)}
        />
      )}
    </div>
  );
};

export default ProductCard;
