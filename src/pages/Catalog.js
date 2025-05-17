import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PageLoader from "../components/PageLoader";
import CategoryList from "../components/CategoryList";
import { useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import MobileHeader from "../components/MobileHeader";
import MobileFooter from "../components/MobileFooter";

function Catalog() {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Имитация загрузки 500 мс (потом можно заменить на реальную)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <CategoryList />
          {isMobile ? <MobileFooter /> : <Footer />}
        </>
      )}
    </>
  );
}

export default Catalog;
