import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CategoryTree } from "../constants/categoryTree";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import SubcategoriesBlock from "../components/SubcategoriesBlock";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import ModalRequest from "../components/ModalRequest";
import PageLoader from "../components/PageLoader";
import useIsMobile from "../hooks/useIsMobile";
import MobileFooter from "../components/MobileFooter";
import MobileHeader from "../components/MobileHeader";
import "../css/CategoryPage.scss";

const findCategoryBySlugs = (slugs, tree = CategoryTree) => {
  if (!slugs.length) return { name: null, path: null };
  let currentLevel = tree;
  let foundName = null;
  let path = "Главная";

  for (const slug of slugs) {
    if (!Array.isArray(currentLevel)) return { name: null, path: null };
    const found = currentLevel.find((cat) => cat.slug === slug);
    if (!found) return { name: null, path: null };
    foundName = found.name;
    path += ` -> ${found.name}`;
    currentLevel = found.children || [];
  }

  return { name: foundName, path };
};

const PRODUCTS_PER_PAGE = 20;

const CategoryPage = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const slugs = location.pathname
    .replace("/catalog/", "")
    .split("/")
    .filter(Boolean);
  const { name: categoryTitle, path } = findCategoryBySlugs(slugs);

  const params = new URLSearchParams(location.search);
  const brand = params.get("brand");
  const categoryParam = params.get("category");

  let computedPath = path;
  let computedTitle = categoryTitle;
  if (!path && categoryParam) {
    computedPath = categoryParam;
    computedTitle = categoryParam.split("->").pop().trim();
  }

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  const [selectedSort, setSelectedSort] = useState("expensive");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const [modalProduct, setModalProduct] = useState(null);
  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);
  const [maxPriceLoaded, setMaxPriceLoaded] = useState(false);

  useEffect(() => {
    if (!computedPath && !brand) return;

    setMinPrice(0);
    setMaxPriceLoaded(false);

    let url = `https://api.vellmar.ru/products-max-price?`;
    if (computedPath) url += `category=${encodeURIComponent(computedPath)}`;
    if (brand)
      url += `${computedPath ? "&" : ""}brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const maxP = Number(data.max_price) || 0;
        setMaxPrice(maxP);
        setPriceRange({ min: 0, max: maxP });
        setMaxPriceLoaded(true);
      })
      .catch((err) => {
        console.error("Ошибка при получении максимальной цены:", err);
        setMaxPrice(0);
        setPriceRange({ min: 0, max: 0 });
        setMaxPriceLoaded(true);
      });
  }, [computedPath, brand]);

  useEffect(() => {
    if ((!computedPath && !brand) || !maxPriceLoaded) return;

    setLoading(true);
    const ascending = selectedSort === "cheap";

    let url = `https://api.vellmar.ru/products?limit=${PRODUCTS_PER_PAGE}&offset=${offset}&order_by=price&ascending=${ascending}&min_price=${priceRange.min}&max_price=${priceRange.max}`;
    if (computedPath) url += `&category=${encodeURIComponent(computedPath)}`;
    if (brand) url += `&brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let products = data.products || [];
        products = products.sort((a, b) => {
          const aPrice = a.price || 0;
          const bPrice = b.price || 0;
          if (aPrice === 0 && bPrice > 0) return 1;
          if (bPrice === 0 && aPrice > 0) return -1;
          return 0;
        });
        setAllProducts(products);
        const totalProducts = data.count || products.length;
        setTotalPages(Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
      })
      .catch((err) => {
        console.error("Ошибка при получении товаров:", err);
        setAllProducts([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [
    computedPath,
    brand,
    selectedSort,
    currentPage,
    priceRange,
    maxPriceLoaded,
  ]);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, computedPath, loading]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  if (!computedPath && !brand) {
    return (
      <div className="category-page">
        {isMobile ? <MobileHeader /> : <Header />}
        <Breadcrumbs />
        <h1 className="category-title">Каталог</h1>
        <SubcategoriesBlock />
        {isMobile ? <MobileFooter /> : <Footer />}
      </div>
    );
  }

  return (
    <div className="category-page">
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      <h1 className="category-title">
        {computedTitle || (brand ? `Товары бренда ${brand}` : "Категория")}
      </h1>

      {computedPath && <SubcategoriesBlock />}

      <FilterBar
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
      />

      {loading ? (
        <PageLoader />
      ) : (
        <div className="products-section">
          {allProducts.length ? (
            allProducts.map((product) => (
              <ProductCard
                key={product.article_number}
                product={product}
                openModal={openModal}
              />
            ))
          ) : (
            <div style={{ fontFamily: "Inter" }}>Товары не найдены</div>
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

      {isMobile ? <MobileFooter /> : <Footer />}
      {modalProduct && (
        <ModalRequest product={modalProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default CategoryPage;
