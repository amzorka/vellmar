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
import "../css/CategoryPage.scss";

// --- Функция для поиска названия категории ---
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
  const { categorySlug, subCategorySlug, subSubCategorySlug } = useParams();
  const slugs = [categorySlug, subCategorySlug, subSubCategorySlug]
    .filter(Boolean)
    .filter((slug) => slug.toLowerCase() !== "главная");
  const { name: categoryTitle, path } = findCategoryBySlugs(slugs);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const brand = params.get("brand");
  const categoryParam = params.get("category");

  if (!path && categoryParam) {
    path = categoryParam;
    categoryTitle = categoryParam.split("->").pop().trim();
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

  // --- Загружаем максимальную цену ---
  useEffect(() => {
    // Если ни категория, ни бренд — не делаем запрос
    if (!path && !brand) return;

    setMinPrice(0); // Минимальная цена всегда 0

    let url = `https://api.vellmar.ru/products-max-price?`;
    if (path) url += `category=${encodeURIComponent(path)}`;
    if (brand) url += `${path ? "&" : ""}brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const maxP = Number(data.max_price) || 0;
        setMaxPrice(maxP);
        setPriceRange({ min: 0, max: maxP });
      })
      .catch((err) => {
        console.error("Ошибка при получении максимальной цены:", err);
        setMaxPrice(0);
        setPriceRange({ min: 0, max: 0 });
      });
  }, [path, brand]);

  // --- Загружаем товары ---
  // 👇 Добавлено
  const [maxPriceLoaded, setMaxPriceLoaded] = useState(false);

  // --- Загружаем максимальную цену ---
  useEffect(() => {
    if (!path && !brand) return;

    setMinPrice(0);
    setMaxPriceLoaded(false); // 👈 Устанавливаем флаг загрузки

    let url = `https://api.vellmar.ru/products-max-price?`;
    if (path) url += `category=${encodeURIComponent(path)}`;
    if (brand) url += `${path ? "&" : ""}brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const maxP = Number(data.max_price) || 0;
        setMaxPrice(maxP);
        setPriceRange({ min: 0, max: maxP });
        setMaxPriceLoaded(true); // 👈 Только здесь разрешаем загрузку товаров
      })
      .catch((err) => {
        console.error("Ошибка при получении максимальной цены:", err);
        setMaxPrice(0);
        setPriceRange({ min: 0, max: 0 });
        setMaxPriceLoaded(true);
      });
  }, [path, brand]);

  // --- Загружаем товары ---
  useEffect(() => {
    if ((!path && !brand) || !maxPriceLoaded) return;

    setLoading(true);
    const ascending = selectedSort === "cheap";

    let url = `https://api.vellmar.ru/products?limit=${PRODUCTS_PER_PAGE}&offset=${offset}&order_by=price&ascending=${ascending}&min_price=0&max_price=${priceRange.max}`;

    if (path) url += `&category=${encodeURIComponent(path)}`;
    if (brand) url += `&brand=${encodeURIComponent(brand)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let products = data.products || [];

        // 👇 Ручная сортировка: цена 0 — в конец
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
  }, [path, brand, selectedSort, currentPage, priceRange, maxPriceLoaded]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    setCurrentPage(1); // Сброс на первую страницу при смене цены
  };

  // --- Если не выбрано ни категория, ни бренд — показываем корневую страницу ---
  if (!path && !brand) {
    return (
      <div className="category-page">
        <Header />
        <Breadcrumbs />
        <h1 className="category-title">Каталог</h1>
        <SubcategoriesBlock />
        <Footer />
      </div>
    );
  }

  return (
    <div className="category-page">
      <Header />
      <Breadcrumbs />
      <h1 className="category-title">
        {categoryTitle || (brand ? `Товары бренда ${brand}` : "Категория")}
      </h1>

      {path && <SubcategoriesBlock />}

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

      <Footer />
      {modalProduct && (
        <ModalRequest product={modalProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default CategoryPage;
