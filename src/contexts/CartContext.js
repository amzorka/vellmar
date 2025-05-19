import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- Загружаем корзину из localStorage при первом рендере ---
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // --- Сохраняем корзину в localStorage при изменении ---
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Добавить товар в корзину ---
  const addToCart = (product, quantity = 1) => {
    const normalizedVariant = product.selectedVariant || null;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.article_number === product.article_number &&
          item.selectedVariant === normalizedVariant
      );

      if (existingItem) {
        return prev.map((item) =>
          item.article_number === product.article_number &&
          item.selectedVariant === normalizedVariant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            article_number: product.article_number,
            title: product.title,
            price: product.price,
            variantPrice: product.variantPrice || product.price,
            selectedVariant: normalizedVariant,
            quantity,
            images: product.images,
          },
        ];
      }
    });
  };

  // --- Изменить количество ---
  const updateQuantity = (product, newQuantity) => {
    if (newQuantity < 1) return;

    const normalizedVariant = product.selectedVariant || null;

    setCartItems((prev) =>
      prev.map((item) =>
        item.article_number === product.article_number &&
        item.selectedVariant === normalizedVariant
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // --- Удалить товар ---
  const removeItem = (product) => {
    const normalizedVariant = product.selectedVariant || null;

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.article_number === product.article_number &&
            item.selectedVariant === normalizedVariant
          )
      )
    );
  };

  // --- Очистить корзину ---
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); // если используешь localStorage
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
