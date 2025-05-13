import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext"; // <-- подключаем контекст!
import "../css/AddToCartButton.scss";
import CartNotification from "../components/CartNotification";

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useContext(CartContext); // <-- достаем addToCart

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityClick = () => {
    setIsEditing(true);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    if (value === "") {
      setQuantity("");
    } else {
      setQuantity(Math.max(1, parseInt(value, 10)));
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
    setIsEditing(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowNotification(true);
  };

  return (
    <div className="add-to-cart-button">
      <div className="quantity-controls">
        <button className="control-button" onClick={handleDecrease}>
          -
        </button>
        {isEditing ? (
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            autoFocus
            className="quantity-input"
          />
        ) : (
          <span className="quantity" onClick={handleQuantityClick}>
            {quantity}
          </span>
        )}
        <button className="control-button" onClick={handleIncrease}>
          +
        </button>
      </div>
      <div className="add-to-cart" onClick={handleAddToCart}>
        В корзину
      </div>
      {showNotification && (
        <CartNotification onClose={() => setShowNotification(false)} />
      )}
    </div>
  );
};

export default AddToCartButton;
