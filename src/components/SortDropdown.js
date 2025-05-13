import React, { useState, useEffect, useRef } from 'react';
import '../css/SortDropdown.scss';

const SortDropdown = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sort-dropdown" ref={ref}>
      <span className="sort-label" onClick={() => setOpen(!open)}>
        {selected === 'cheap' ? 'Дешевле' : 'Дороже'} <span className="arrow">⌄</span>
      </span>
      <ul className={`dropdown-menu ${open ? 'open' : ''}`}>
        <li onClick={() => handleSelect('cheap')}>Дешевле</li>
        <li onClick={() => handleSelect('expensive')}>Дороже</li>
      </ul>
    </div>
  );
};

export default SortDropdown;