import React, { useState } from "react";
import "../css/CheckoutForm.scss";

const CheckoutForm = () => {
  const [orderType, setOrderType] = useState("individual");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const requiredFields = {
    individual: ["name", "phone", "email", "address"],
    company: ["companyName", "inn", "contact", "phone", "email", "address"],
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    const fields = requiredFields[orderType];
    const newErrors = {};

    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Данные отправлены:", formData);
    }
  };

  const renderInput = (field, placeholder) => (
    <input
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
        <button className="checkout-submit" onClick={handleSubmit}>
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
