import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import PageLoader from "../components/PageLoader";
import ModalRequest from "../components/ModalRequest";
import Pagination from "../components/Pagination";
import useIsMobile from "../hooks/useIsMobile";
import MobileFooter from "../components/MobileFooter";
import MobileHeader from "../components/MobileHeader";
import "../css/CategoryPage.scss";

const PRODUCTS_PER_PAGE = 20;

const SearchResults = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesReady, setImagesReady] = useState(false); // ⬅️
  const [modalProduct, setModalProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://api.vellmar.ru/search?value=${encodeURIComponent(
        query
      )}&limit=${PRODUCTS_PER_PAGE}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        const totalCount = data.count || 0;
        setTotalPages(Math.ceil(totalCount / PRODUCTS_PER_PAGE));
      })
      .catch((err) => {
        console.error("Ошибка при поиске:", err);
        setProducts([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [query, currentPage, offset]);

  useEffect(() => {
    if (loading || !products.length) return;

    let loadedCount = 0;
    let isCancelled = false;

    products.forEach((product) => {
      const image = new Image();
      const sortedImages = (product.images || []).sort(
        (a, b) => a.order_number - b.order_number
      );
      const src =
        sortedImages.length > 0
          ? `https://famarket.ru${sortedImages[0].link}`
          : null;

      if (!src) {
        loadedCount++;
        return;
      }

      image.src = src;

      image.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount === products.length) {
          setImagesReady(true);
        }
      };

      image.onerror = () => {
        if (isCancelled) return;
        fetch(
          `https://api.vellmar.ru/collect-product?link=${encodeURIComponent(
            product.link
          )}`,
          { method: "POST" }
        )
          .then(() => {
            setTimeout(() => {
              if (isCancelled) return;
              const retryImage = new Image();
              retryImage.src = `${src}?v=${Date.now()}`;
              retryImage.onload = () => {
                if (isCancelled) return;
                loadedCount++;
                if (loadedCount === products.length) {
                  setImagesReady(true);
                }
              };
              retryImage.onerror = () => {
                loadedCount++;
                if (!isCancelled && loadedCount === products.length) {
                  setImagesReady(true);
                }
              };
            }, 3000);
          })
          .catch(() => {
            loadedCount++;
            if (!isCancelled && loadedCount === products.length) {
              setImagesReady(true);
            }
          });
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [products, loading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [products]);

  useEffect(() => {
    if (!loading && products.length === 0) {
      setImagesReady(true);
    }
  }, [loading, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [location.search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="category-page">
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      <h1 className="category-title">Результаты поиска: {query}</h1>

      {loading || !imagesReady ? ( // ⬅️
        <PageLoader />
      ) : (
        <div className="products-section">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.article_number}
                product={product}
                openModal={openModal}
              />
            ))
          ) : (
            <p style={{ fontFamily: "Inter" }}>Ничего не найдено</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {modalProduct && (
        <ModalRequest product={modalProduct} onClose={closeModal} />
      )}

      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default SearchResults;
