import React from "react";
import LeftArrowIcon from "../images/LeftArrow.png";
import RightArrowIcon from "../images/RightArrow.png";

import "../css/Pagination.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page === "...") return;
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className="arrow-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={LeftArrowIcon} className="arrow-left" alt="Previous" />
        </button>

        <div className="page-numbers">
          {visiblePages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="dots">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`page-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="arrow-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={RightArrowIcon} className="arrow-right" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
