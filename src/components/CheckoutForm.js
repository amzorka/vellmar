import React, { useState, useContext } from "react";
import "../css/CheckoutForm.scss";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("individual");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("cartItems:", cartItems);

  const products = cartItems.map((item) => ({
    link: `/product/${item.link || ""}`,
    name: item.selectedVariant
      ? `${item.title || item.name || "Неизвестный товар"} (${
          item.selectedVariant
        })`
      : item.title || item.name || "Неизвестный товар",
    price: item.price,
    count: item.quantity,
  }));

  const requiredFields = {
    individual: ["name", "phone", "email", "address"],
    company: ["companyName", "inn", "contact", "phone", "email", "address"],
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async () => {
    const fields = requiredFields[orderType];
    const newErrors = {};

    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }

      if (
        field === "email" &&
        formData[field] &&
        !/\S+@\S+\.\S+/.test(formData[field])
      ) {
        newErrors[field] = true;
      }

      if (
        field === "phone" &&
        formData[field] &&
        !/^\+?\d{10,15}$/.test(formData[field])
      ) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const body =
      orderType === "individual"
        ? {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            address: formData.address,
            total,
            products,
          }
        : {
            company_name: formData.companyName,
            inn: formData.inn,
            kpp: formData.kpp,
            legal_address: formData.legalAddress,
            contact_person: formData.contact,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            total,
            products,
          };

    const endpoint =
      orderType === "individual"
        ? "https://api.vellmar.ru/order-natural"
        : "https://api.vellmar.ru/order-legal";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Ошибка при отправке");

      const orderId = Date.now().toString().slice(-7); // примерный ID
      clearCart?.(); // очистка корзины, если доступна

      navigate("/success", { state: { orderNumber: orderId } });
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке заявки");
    }
  };

  const renderInput = (field, placeholder, type = "text") => (
    <input
      type={type}
      className={errors[field] ? "error" : ""}
      placeholder={placeholder}
      onChange={(e) => handleChange(field, e.target.value)}
    />
  );

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
              {renderInput("companyName", "Наименование компании *")}
              {renderInput("inn", "ИНН *")}
              {renderInput("kpp", "КПП")}
              {renderInput("legalAddress", "Юридический адрес")}
            </>
          ) : (
            <>
              {renderInput("name", "Имя *")}
              {renderInput("phone", "Телефон *")}
              {renderInput("email", "e-mail *")}
            </>
          )}
        </div>

        <div className="form-column">
          {orderType === "company" ? (
            <>
              {renderInput("contact", "Контактное лицо *")}
              {renderInput("phone", "Телефон *")}
              {renderInput("email", "e-mail *")}
              {renderInput("address", "Адрес доставки *")}
            </>
          ) : (
            <>
              {renderInput("city", "Город")}
              {renderInput("address", "Адрес доставки *")}
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
        <button
          className="checkout-submit"
          type="button"
          onClick={handleSubmit}
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
