import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  const { categorySlug, subCategorySlug, subSubCategorySlug } = useParams();
  const slugs = [categorySlug, subCategorySlug, subSubCategorySlug]
    .filter(Boolean)
    .filter((slug) => slug.toLowerCase() !== "главная");
  const { name: categoryTitle, path } = findCategoryBySlugs(slugs);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const brand = params.get("brand");
  const categoryParam = params.get("category");

  const [categoryPath, setCategoryPath] = useState(path);
  const [categoryName, setCategoryName] = useState(categoryTitle);

  useEffect(() => {
    if (!path && categoryParam) {
      setCategoryPath(categoryParam);
      setCategoryName(categoryParam.split("->").pop().trim());
    } else {
      setCategoryPath(path);
      setCategoryName(categoryTitle);
    }
  }, [path, categoryParam, categoryTitle]);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedSort, setSelectedSort] = useState("expensive");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  const [maxPriceLoaded, setMaxPriceLoaded] = useState(false);

  useEffect(() => {
    if (!categoryPath && !brand) return;

    setPriceRange({ min: 0, max: 0 });
    setMaxPriceLoaded(false);

    let url = `https://api.vellmar.ru/products-max-price?`;
    if (categoryPath) url += `category=${encodeURIComponent(categoryPath)}`;
    if (brand)
      url += `${categoryPath ? "&" : ""}brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const maxP = Number(data.max_price) || 0;
        setPriceRange({ min: 0, max: maxP });
        setMaxPriceLoaded(true);
      })
      .catch((err) => {
        console.error("Ошибка при получении максимальной цены:", err);
        setMaxPriceLoaded(true);
      });
  }, [categoryPath, brand]);

  useEffect(() => {
    if ((!categoryPath && !brand) || !maxPriceLoaded) return;

    setLoading(true);
    const ascending = selectedSort === "cheap";

    let url = `https://api.vellmar.ru/products?limit=${PRODUCTS_PER_PAGE}&offset=${offset}&order_by=price&ascending=${ascending}`;
    url += `&min_price=${priceRange.min}&max_price=${priceRange.max}`;

    if (categoryPath) url += `&category=${encodeURIComponent(categoryPath)}`;
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
    categoryPath,
    brand,
    selectedSort,
    currentPage,
    priceRange,
    maxPriceLoaded,
  ]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    setCurrentPage(1);
  };

  if (!categoryPath && !brand) {
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
        {categoryName || (brand ? `Товары бренда ${brand}` : "Категория")}
      </h1>

      {categoryPath && <SubcategoriesBlock />}

      <FilterBar
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        minPrice={priceRange.min}
        maxPrice={priceRange.max}
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
