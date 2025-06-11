import React, { useState, useEffect } from "react";
import "../css/Home.scss";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner.jpeg";

const banners = [banner1, banner2];

const HomeBannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // каждые 10 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-banner-slider-wrapper">
      <div
        className="home-banner-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Баннер ${index + 1}`}
            className="home-banner-slide"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBannerSlider;
