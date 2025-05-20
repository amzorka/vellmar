import React from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryTree } from "../constants/categoryTree";
import "../css/SubcategoriesBlock.scss";
import useIsMobile from "../hooks/useIsMobile";

// --- Функция для поиска подкатегорий по текущим слагам ---
const findSubcategories = (slugs, tree) => {
  let currentLevel = tree;
  for (const slug of slugs) {
    const found = currentLevel.find((cat) => cat.slug === slug);
    if (!found) return []; // Не найдено
    currentLevel = found.children || [];
  }
  return currentLevel;
};

const SubcategoriesBlock = () => {
  const isMobile = useIsMobile();
  const { categorySlug, subCategorySlug, subSubCategorySlug } = useParams();
  const slugs = [categorySlug, subCategorySlug, subSubCategorySlug].filter(
    Boolean
  );

  const subcategories = findSubcategories(slugs, CategoryTree);

  if (!subcategories.length) return null; // Если нет подкатегорий, не выводим блок

  if (isMobile) {
    return (
      <div className="subcategories-block mobile">
        <div className="subcategories-list">
          {subcategories.map((subcategory) => {
            const path = `/catalog/${[...slugs, subcategory.slug].join("/")}`;
            return (
              <Link
                key={subcategory.slug}
                to={path}
                className="subcategory-card"
              >
                {subcategory.name}
              </Link>
            );
          })}
        </div>
        <div className="subcategory-divider" />
      </div>
    );
  }

  // Десктопный вариант (оставь тут свой текущий JSX)
  return (
    <div className="subcategories-block desktop">
      {subcategories.map((subcategory) => {
        const path = `/catalog/${[...slugs, subcategory.slug].join("/")}`;
        return (
          <Link key={subcategory.slug} to={path} className="subcategory-card">
            {subcategory.name}
          </Link>
        );
      })}
      <div className="subcategory-divider" />
    </div>
  );
};

export default SubcategoriesBlock;
