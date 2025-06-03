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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      total: product.price || 0,
      product: {
        link: product.link,
        name: product.title,
        price: product.price || 0,
      },
    };

    try {
      const res = await fetch("https://api.vellmar.ru/order-one-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Ошибка при отправке заявки");
      }

      alert("Спасибо за заявку! Наш администратор свяжется с вами.");
      onClose();
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка при отправке заявки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const FormFields = (
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
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Отправка..." : "Оставить заявку"}
      </button>
    </form>
  );

  const ProductInfo = (
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
            ? `Цена: ${product.price.toLocaleString("ru-RU")} ₽`
            : "Цена: нет"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Оставить заявку</h2>
        <div className="modal-body">
          {isMobile ? (
            <>
              {ProductInfo}
              {FormFields}
            </>
          ) : (
            <>
              {FormFields}
              {ProductInfo}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalRequest;
