import React from 'react';
import '../css/CategoryList.scss'; 
import mixes from '../images/categories/mix.jpg';
import general from '../images/categories/general.jpg';
import instrument from '../images/categories/instrument.jpg';
import paints from '../images/categories/paints.jpg';
import finishing from '../images/categories/finishing.jpg';
import plumbing from '../images/categories/plumbing.jpg';
import electrogoods from '../images/categories/electrogoods.jpg';
import isolation from '../images/categories/isolation.jpg';
import lumber from '../images/categories/lumber.jpg';
import metal from '../images/categories/metal.jpg';
import { Link } from 'react-router-dom';



const categories = [
  { name: 'Смеси строительные', imgSrc: mixes, link: '/catalog/mixes' },
  { name: 'Общестрой', imgSrc: general, link: '/catalog/general' },
  { name: 'Инструменты', imgSrc: instrument, link: '/catalog/instrument' },
  { name: 'Лакокрасочные материалы', imgSrc: paints, link: '/catalog/paints' },
  { name: 'Отделочные материалы', imgSrc: finishing, link: '/catalog/finishing' },
  { name: 'Инженерная сантехника', imgSrc: plumbing, link: '/catalog/plumbing' },
  { name: 'Электротовары', imgSrc: electrogoods, link: '/catalog/electrogoods' },
  { name: 'Изоляция', imgSrc: isolation, link: '/catalog/isolation' },
  { name: 'Пиломатериалы', imgSrc: lumber, link: '/catalog/lumber' },
  { name: 'Металл', imgSrc: metal, link: '/catalog/metal' },
];

const CategoryList = () => {
  return (
    <div className="category-list-container">
      <div className="categories-cards">
        {categories.map((category, index) => (
        <Link to={category.link} key={index} className="category-card-link">
          <div key={index} className="categories-card">
            <img src={category.imgSrc} alt={category.name} className="categories-image" />
            <div className="categories-name">{category.name}</div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;