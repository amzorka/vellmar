import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import RequestButton from "../components/RequestButton";
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
  const hasRequestedRef = useRef(false); // Защита от повторного запроса
  const imgRef = useRef(null); // Для обновления src

  const handleImageError = () => {
    if (hasRequestedRef.current || !product.link) return;

    hasRequestedRef.current = true;
    console.log("🔄 Отправка на перепарсинг по link:", product.link);

    fetch(
      `https://api.vellmar.ru/collect-product?link=${encodeURIComponent(
        product.link
      )}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка перепарсинга");
        console.log("✅ Перепарсинг успешно запущен");

        // Обновляем изображение через 3 секунды
        setTimeout(() => {
          if (imgRef.current) {
            imgRef.current.src = `${imageUrl}?v=${Date.now()}`; // обход кэша
          }
        }, 3000);
      })
      .catch((err) => {
        console.error("❌ Ошибка запроса на collect-product:", err);
      });
  };

  return (
    <div className="product-card">
      <Link to={`/product${product.link}`}>
        <img
          ref={imgRef}
          src={imageUrl}
          alt={product.title.replace(/;+$/, "")}
          className="product-image"
          onError={handleImageError}
        />
        <h3 className="product-title">{product.title.replace(/;+$/, "")}</h3>
      </Link>

      <p className="product-price">
        {product.price > 0
          ? `"Цена:" ${new Intl.NumberFormat("ru-RU", {
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
