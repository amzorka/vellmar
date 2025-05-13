// Pagination.jsx
import React from 'react';
import  LeftArrowIcon  from '../images/LeftArrow.png'; // Путь к иконке стрелочки
import  RightArrowIcon  from '../images/RightArrow.png'; // Путь к иконке стрелочки

import '../css/Pagination.scss';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button className="arrow-btn" onClick={() => handlePageChange(currentPage - 1)}>
          <img src={LeftArrowIcon} className="arrow-left" />
        </button>

        <div className="page-numbers">
          {pageNumbers.slice(0, 4).map((page) => (
            <button
              key={page}
              className={`page-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <span className="dots">...</span>
          <button
            className="page-number"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </div>

        <button className="arrow-btn" onClick={() => handlePageChange(currentPage + 1)}>
        <img src={RightArrowIcon} className="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;