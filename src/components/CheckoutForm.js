import React, { useState } from "react";
import "../css/CheckoutForm.scss";

const CheckoutForm = () => {
  const [orderType, setOrderType] = useState("individual");

  return (
    <div className="checkout-section">
      <h2 className="checkout-title">Оформление заказа</h2>
      <p className="checkout-subtitle">Я оформляю заказ как:</p>
      <div className="checkout-type-switch">
        <button
          className={`type-btn ${orderType === "individual" ? "active" : ""}`}
          onClick={() => setOrderType("individual")}
        >
          Физическое лицо
        </button>
        <button
          className={`type-btn ${orderType === "company" ? "active" : ""}`}
          onClick={() => setOrderType("company")}
        >
          Юридическое лицо
        </button>
      </div>

      <div className="checkout-form">
        <div className="form-column">
          {orderType === "company" ? (
            <>
              <input type="text" placeholder="Наименование компании *" />
              <input type="text" placeholder="ИНН *" />
              <input type="text" placeholder="КПП" />
              <input type="text" placeholder="Юридический адрес" />
            </>
          ) : (
            <>
              <input type="text" placeholder="Имя *" />
              <input type="text" placeholder="Телефон *" />
              <input type="email" placeholder="e-mail *" />
            </>
          )}
        </div>

        <div className="form-column">
          {orderType === "company" ? (
            <>
              <input type="text" placeholder="Контактное лицо *" />
              <input type="text" placeholder="Телефон *" />
              <input type="email" placeholder="e-mail *" />
              <input type="text" placeholder="Адрес доставки *" />
            </>
          ) : (
            <>
              <input type="text" placeholder="Город" />
              <input type="text" placeholder="Адрес доставки *" />
            </>
          )}
        </div>
      </div>
      <div className="checkout-bottom">
        <p className="checkout-note">
          Отправляя заказ, вы соглашаетесь с{" "}
          <a href="/legal" className="checkout-link">
            условиями обработки персональных данных
          </a>
          .
        </p>
        <button className="checkout-submit">Оставить заявку</button>
      </div>
    </div>
  );
};

export default CheckoutForm;
