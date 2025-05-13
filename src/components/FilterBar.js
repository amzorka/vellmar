import React, { useState, useEffect } from "react";
import "../css/FilterBar.scss";
import SortDropdown from "./SortDropdown";

const FilterBar = ({
  minPrice = 0,
  maxPrice = 0,
  selectedSort,
  setSelectedSort,
  onPriceChange,
}) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  // Когда minPrice/maxPrice приходят снаружи, обновляем локальные стейты
  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
    onPriceChange(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value) || 0;
    setMin(value);
    onPriceChange(value, max);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value) || 0;
    setMax(value);
    onPriceChange(min, value);
  };

  return (
    <div className="filter-bar">
      <div className="sort-section">
        <span className="label">Сначала:</span>
        <SortDropdown selected={selectedSort} onChange={setSelectedSort} />
      </div>

      <div className="price-section">
        <span className="label">Цена:</span>
        <span className="price-label">От</span>
        <input
          type="number"
          value={min}
          min={0}
          max={max}
          onChange={handleMinChange}
        />
        <span className="price-label">До</span>
        <input
          type="number"
          value={max}
          min={min}
          max={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default FilterBar;
