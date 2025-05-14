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

  return (
    <div className="product-card">
      <div className="product-sku">Артикул: {product.article_number}</div>
      <Link to={`/product${product.link}`}>
        <img
          src={imageUrl}
          alt={product.title.replace(/;+$/, "")}
          className="product-image"
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
