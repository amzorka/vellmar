import Header from "../components/Header";
import PartnersSection from "../components/PartnersSection";
import InfoBlocksSection from "../components/InfoBlocksSection";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PageLoader from "../components/PageLoader";
import CategoryList from "../components/CategoryList";
import { useState, useEffect } from "react";

function Catalog() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки 500 мс (потом можно заменить на реальную)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumbs />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <CategoryList />
          <Footer />
        </>
      )}
    </>
  );
}

export default Catalog;
