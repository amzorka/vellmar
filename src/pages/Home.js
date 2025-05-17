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
import useIsMobile from "../hooks/useIsMobile";
import MobileHeader from "../components/MobileHeader";
import MobileInfoBlock from "../components/MobileInfoBlock";
import MobileFooter from "../components/MobileFooter";
import "../css/Home.scss";

function Home() {
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
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <img className="home-banner" alt="banner" src={banner}></img>
          <CategorySlider />
          <ProductSection />
          <h2 className="partners-title">Наши партнеры и поставщики</h2>
          <PartnersSection />
          <FourBlocksSection />
          {isMobile ? <MobileInfoBlock /> : <InfoBlocksSection />}
          {isMobile ? <MobileFooter /> : <Footer />}
        </>
      )}
    </>
  );
}

export default Home;
