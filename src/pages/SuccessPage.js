import React from "react";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const SuccessPage = () => {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber || 1000;

  return (
    <>
      <Header />
      <Breadcrumbs />
      <OrderConfirmation orderNumber={orderNumber} />
      <Footer />
    </>
  );
};

export default SuccessPage;
