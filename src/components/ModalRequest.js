import React, { useState } from "react";
import "../css/ModalRequest.scss";
import useIsMobile from "../hooks/useIsMobile";

const ModalRequest = ({ product, onClose }) => {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь отправка данных
    alert(`Заявка отправлена на ${product.title}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        {isMobile ? (
          <>
            <div className="modal-product">
              <img
                src={`https://famarket.ru${product.images?.[0]?.link}`}
                alt={product.title}
                className="product-request-image"
              />
              <div className="product-text">
                <p className="product-name">{product.title}</p>
                <p className="product-request-price">
                  {product.price > 0
                    ? `${product.price.toLocaleString("ru-RU")} ₽`
                    : "Цена: нет"}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={form.email}
                onChange={handleChange}
                required
              />
              <p className="privacy">
                Нажимая «Оставить заявку» вы соглашаетесь с{" "}
                <a href="/legal">правилами обработки личных данных</a>
              </p>
              <button type="submit" className="submit-button">
                Оставить заявку
              </button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={form.email}
                onChange={handleChange}
                required
              />
              <p className="privacy">
                Нажимая «Оставить заявку» вы соглашаетесь с{" "}
                <a href="/legal">правилами обработки личных данных</a>
              </p>
              <button type="submit" className="submit-button">
                Оставить заявку
              </button>
            </form>
            <div className="modal-product">
              <img
                src={`https://famarket.ru${product.images?.[0]?.link}`}
                alt={product.title}
                className="product-request-image"
              />
              <p className="product-name">{product.title}</p>
              <p className="product-request-price">
                {product.price > 0
                  ? `Цена: ${product.price.toLocaleString("ru-RU")} ₽`
                  : "Цена: нет"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalRequest;
