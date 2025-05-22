import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/CartNotification.scss";

const CartNotification = ({ onClose }) => {
  const [visibleClass, setVisibleClass] = useState("show");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleClass("hide");
      setTimeout(onClose, 500); // дождаться завершения анимации
    }, 3000000); // показывать 3 секунды

    return () => clearTimeout(timer); // очистка при размонтировании
  }, [onClose]);

  const notification = (
    <div className={`cart-notification ${visibleClass}`}>
      <span>Отлично! Ваш товар добавлен в корзину. </span>
      <Link to="/cart" className="cart-notification-link">
        Перейти
      </Link>
      <button className="cart-notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );

  return ReactDOM.createPortal(
    notification,
    document.getElementById("notification-root")
  );
};

export default CartNotification;
