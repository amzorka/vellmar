import React from "react";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";

const SuccessPage = () => {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber || 1000;

  return <OrderConfirmation orderNumber={orderNumber} />;
};

export default SuccessPage;
