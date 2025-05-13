import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../css/CartPage.scss";
import { CartContext } from "../contexts/CartContext";
import PageLoader from "../components/PageLoader";
import CheckoutForm from "../components/CheckoutForm";

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  // Ждем, пока cartItems загрузятся
  useEffect(() => {
    setLoading(false);
  }, [cartItems]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.variantPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Header />
      <Breadcrumbs />
      <h1 className="cart-title">Ваша корзина</h1>

      {loading ? (
        <PageLoader />
      ) : cartItems.length === 0 ? (
        <p style={{ marginLeft: "80px", fontFamily: "Inter" }}>
          Ваша корзина пуста
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="cart-col-photo">Фото</th>
                <th className="cart-col-title">Название</th>
                <th className="cart-col-quantity">Количество</th>
                <th className="cart-col-price">Цена за 1 шт.</th>
                <th className="cart-col-total">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.article_number + (item.selectedVariant || "")}>
                  <td>
                    <img
                      src={`https://famarket.ru${item.images?.[0]?.link || ""}`}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </td>
                  <td className="cart-item-title">
                    <div className="cart-title-text">
                      {item.title}{" "}
                      {item.selectedVariant ? `(${item.selectedVariant})` : ""}
                    </div>
                  </td>
                  <td>
                    <button className="quantity-button">
                      <span
                        className="minus"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.quantity > 1) {
                            updateQuantity(item, item.quantity - 1);
                          } else {
                            removeItem(item);
                          }
                        }}
                      >
                        -
                      </span>
                      <span className="quantity-now">{item.quantity}</span>
                      <span
                        className="plus"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, item.quantity + 1);
                        }}
                      >
                        +
                      </span>
                    </button>
                  </td>
                  <td>
                    {(item.variantPrice || item.price).toLocaleString("ru-RU")}{" "}
                    ₽
                  </td>
                  <td>
                    {(
                      (item.variantPrice || item.price) * item.quantity
                    ).toLocaleString("ru-RU")}{" "}
                    ₽
                  </td>
                </tr>
              ))}
              <tr className="cart-total-row">
                <td>Итого:</td>
                <td></td>
                <td className="total-quantity">{totalQuantity} шт.</td>
                <td></td>
                <td className="total-price">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </td>
              </tr>
            </tbody>
          </table>
          <CheckoutForm />
        </>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
