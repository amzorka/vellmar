import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CategoryTree } from "../constants/categoryTree";
import "../css/Breadcrumbs.scss";

// Статические маршруты
const STATIC_PAGES = {
  "/about": "О нас",
  "/delivery": "Доставка и разгрузка",
  "/legal": "Правовая информация",
  "/contacts": "Контакты",
  "/cart": "Корзина",
  "/brands": "Бренды",
  "/catalog": "Каталог",
};

function findSlugByName(name, tree = CategoryTree) {
  for (let item of tree) {
    if (item.name.trim() === name.trim()) return item.slug;
    if (item.children) {
      const childSlug = findSlugByName(name, item.children);
      if (childSlug) return `${item.slug}/${childSlug}`;
    }
  }
  return "";
}

function findCategoryPath(slugs) {
  let path = [];
  let currentLevel = CategoryTree;

  for (let slug of slugs) {
    const node = currentLevel.find((item) => item.slug === slug);
    if (node) {
      path.push({ name: node.name, slug: slug });
      currentLevel = node.children || [];
    } else {
      break;
    }
  }

  return path;
}

const Breadcrumbs = ({ categoryPathFromProduct }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Проверяем статическую страницу
  if (STATIC_PAGES[pathname]) {
    return (
      <nav className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span> → {STATIC_PAGES[pathname]}</span>
      </nav>
    );
  }

  let categoryPath = [];

  if (categoryPathFromProduct) {
    const parts = categoryPathFromProduct
      .split("->")
      .map((p) => p.trim())
      .filter((p) => p.toLowerCase() !== "главная");

    categoryPath = parts.map((name) => {
      const fullSlug = findSlugByName(name);
      const slugParts = fullSlug.split("/").filter(Boolean);
      return {
        name,
        slug: slugParts[slugParts.length - 1] || "",
        fullSlug,
      };
    });
  } else {
    const pathnames = pathname
      .split("/")
      .filter(
        (x) =>
          x &&
          x !== "catalog" &&
          decodeURIComponent(x).toLowerCase() !== "главная"
      );
    categoryPath = findCategoryPath(pathnames);
  }

  return (
    <nav className="breadcrumbs">
      <Link to="/">Главная</Link>
      {categoryPath.length > 0 && <Link to="/catalog"> → Каталог</Link>}
      {categoryPath.map((item, index) => {
        const to =
          "/catalog/" +
          categoryPath
            .slice(0, index + 1)
            .map((i) => i.slug)
            .join("/");

        const isLast = index === categoryPath.length - 1;

        return isLast ? (
          <span key={to}> → {item.name}</span>
        ) : (
          <Link key={to} to={to}>
            {" "}
            → {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
