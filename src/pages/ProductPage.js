import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import useIsMobile from "../hooks/useIsMobile";

import { CartContext } from "../contexts/CartContext"; // сюда добавится
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";

import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";

import CartNotification from "../components/CartNotification";
import ModalRequest from "../components/ModalRequest";
import Pageloader from "../components/PageLoader";
import "../css/ProductPage.scss";

import trashBagsImage from "../images/trash-bags.jpg";
import vetoshImage from "../images/vetosh.jpeg";
import boardImage from "../images/doska.png"; // путь подставь свой

const ProductPage = () => {
  const isMobile = useIsMobile();

  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const [modalProduct, setModalProduct] = useState(null);

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const cleanSlug = location.pathname.replace("/product", "");
      try {
        const response = await fetch(
          `https://api.vellmar.ru/products/search?link=${encodeURIComponent(
            cleanSlug
          )}`
        );
        const data = await response.json();
        if (data && data.link) {
          setProduct(data);

          // --- Выбор вариации по умолчанию ---
          const variants = Object.entries(data.variants || {});
          if (variants.length > 0) {
            const [firstVariantName, firstVariantPrice] = variants[0];
            setSelectedVariant(firstVariantName);
            setCurrentPrice(firstVariantPrice);
          } else {
            setCurrentPrice(data.price || 0);
          }
        } else {
          console.warn("Товар не найден");
        }
      } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [location.pathname]);

  if (loading)
    return (
      <div>
        <Pageloader />
      </div>
    );
  if (!product)
    return <div style={{ fontFamily: "Inter" }}>Товар не найден</div>;

  // --- Сортировка картинок по order_number ---
  const sortedImages = (product.images || [])
    .slice() // чтобы не мутировать оригинал
    .sort((a, b) => a.order_number - b.order_number);

  if (product.link === "/id/meshki-dlya-musora-1746.html") {
    sortedImages.splice(0, 1, { link: trashBagsImage }); // заменяем первую картинку
  }

  if (product.link === "/id/vetosh-5111.html") {
    sortedImages.splice(0, 1, { link: vetoshImage });
  }

  const cleanDescription = (product.description || "").replace(
    /<\/?d\.name>/g,
    ""
  );

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedVariant,
      variantPrice: currentPrice,
      price: currentPrice, // <<< обязательно!
    };

    console.log("Добавляется товар:", productToAdd, "Количество:", quantity);
    addToCart(productToAdd, quantity);
    setShowNotification(true);
  };

  return (
    <div className="product-page">
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs
        // product={product}
        categoryPathFromProduct={product.category}
      />
      <div className={`product-content ${isMobile ? "mobile-layout" : ""}`}>
        <div className="product-images-section">
          <div className="product-main-image">
            <img
              src={
                typeof product.category === "string" &&
                product.category.includes("Обрезная доска")
                  ? boardImage
                  : `https://famarket.ru${sortedImages[activeImageIndex]?.link}`
              }
              alt={product.title}
            />
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-page-title">{product.title}</h1>
          {product.variants && Object.keys(product.variants).length > 0 && (
            <div className="variants-section">
              <div className="variant-title">Варианты:</div>
              <div className="variant-cards">
                {Object.entries(product.variants).map(
                  ([variantName, price], i) => (
                    <button
                      key={i}
                      className={`variant-card ${
                        selectedVariant === variantName ? "active-variant" : ""
                      }`}
                      onClick={() => {
                        setSelectedVariant(variantName);
                        setCurrentPrice(price);
                      }}
                    >
                      {variantName}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="product-page-price">
            {currentPrice > 0
              ? `${new Intl.NumberFormat("ru-RU", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })
                  .format(currentPrice)
                  .replace(",", ".")} ₽`
              : "Цена по запросу"}
          </div>

          {currentPrice > 0 ? (
            <div className="product-add-to-cart-button">
              <div className="product-quantity-controls">
                <button
                  className="product-control-button"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  className="product-quantity-input"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button
                  className="product-control-button"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <>
                <button
                  className="product-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Добавить в корзину
                </button>
                {showNotification && (
                  <CartNotification
                    onClose={() => setShowNotification(false)}
                  />
                )}
              </>
            </div>
          ) : (
            <>
              <button
                className="product-request-button"
                onClick={() => openModal(product)}
              >
                Оставить заявку
              </button>
              {modalProduct && (
                <ModalRequest product={modalProduct} onClose={closeModal} />
              )}
            </>
          )}

          <div className="product-characteristics">
            {Object.entries(product.characteristics || {}).map(
              ([key, value]) => (
                <div className="characteristic-item" key={key}>
                  <div className="characteristic-key">{key}</div>
                  <div className="characteristic-value">{value}</div>
                </div>
              )
            )}
          </div>

          {cleanDescription && (
            <div
              className="product-page-description"
              style={{ marginTop: "40px" }}
            >
              <h2>Описание</h2>
              <div dangerouslySetInnerHTML={{ __html: cleanDescription }}></div>
            </div>
          )}
        </div>
      </div>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default ProductPage;
