import CategorySlider from "../components/CategorySlider";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import banner from "../images/banner.png";
import PartnersSection from "../components/PartnersSection";
import InfoBlocksSection from "../components/InfoBlocksSection";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import { useState, useEffect } from "react";
import FourBlocksSection from "../components/FourBlocksSection";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки 500 мс (потом можно заменить на реальную)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <img
            alt="banner"
            src={banner}
            style={{
              margin: "50px auto 80px auto",
              display: "flex",
              maxWidth: "1280px",
            }}
          ></img>
          <CategorySlider />
          <ProductSection />
          <h2 className="partners-title">Наши партнеры и поставщики</h2>
          <PartnersSection />
          <FourBlocksSection />
          <InfoBlocksSection />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
