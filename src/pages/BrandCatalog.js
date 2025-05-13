import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ModalRequest from "../components/ModalRequest";
import PageLoader from "../components/PageLoader";
import "../css/CategoryPage.scss";

const PRODUCTS_PER_PAGE = 20;

const BrandCatalog = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("name");

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const [modalProduct, setModalProduct] = useState(null);

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  useEffect(() => {
    if (!brand) return;

    setLoading(true);

    fetch(
      `/products?brand=${encodeURIComponent(
        brand
      )}&limit=${PRODUCTS_PER_PAGE}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        const products = data.products || [];
        setAllProducts(products);
        const totalProducts = data.count || products.length;
        setTotalPages(Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
      })
      .catch((err) => {
        console.error("Ошибка при получении товаров бренда:", err);
        setAllProducts([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [brand, currentPage]);

  return (
    <div className="category-page">
      <Header />
      <Breadcrumbs />
      <h1 className="category-title">Товары бренда: {brand}</h1>

      {loading ? (
        <PageLoader />
      ) : (
        <div className="products-section">
          {/* <FilterBar /> */}
          {allProducts.map((product) => (
            <ProductCard
              key={product.article_number}
              product={product}
              openModal={openModal}
            />
          ))}
        </div>
      )}

      {modalProduct && (
        <ModalRequest product={modalProduct} onClose={closeModal} />
      )}

      <Footer />
    </div>
  );
};

export default BrandCatalog;
