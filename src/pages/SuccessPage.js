import React from "react";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import MobileHeader from "../components/MobileHeader";
import MobileFooter from "../components/MobileFooter";
import useIsMobile from "../hooks/useIsMobile";

const SuccessPage = () => {
  const isMobile = useIsMobile();
  const { state } = useLocation();
  const orderNumber = state?.orderNumber || 1000;

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      <OrderConfirmation orderNumber={orderNumber} />
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
};

export default SuccessPage;
