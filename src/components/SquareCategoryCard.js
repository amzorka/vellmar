import React from 'react';
import '../css/SquareCategoryCard.scss';

const SquareCategoryCard = ({ name, image, link }) => {
  return (
    <a href={link} className="square-category-card">
      <div 
        className="card-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h3 className="card-title">{name}</h3>
    </a>
  );
};

export default SquareCategoryCard;