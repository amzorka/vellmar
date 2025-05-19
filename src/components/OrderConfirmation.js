import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/OrderConfirmation.scss";

const OrderConfirmation = ({ orderNumber }) => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <h1 className="order-title">Ваш заявка оформлена!</h1>
      <p className="order-number">Заявка №{orderNumber}</p>
      <p className="order-message">
        Спасибо за Ваш заказ. В ближайшее время с Вами свяжется наш менеджер для
        уточнения деталей и дальнейшего оформления.
      </p>
      <button className="order-home-btn" onClick={() => navigate("/")}>
        На главную
      </button>
    </div>
  );
};

export default OrderConfirmation;
