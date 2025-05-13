import React from "react";
import "../css/PartnersSection.scss";

import logo1 from "../images/partners/photo_2025-05-13 3.50.43 PM.jpeg";
import logo2 from "../images/partners/logo-3.png";
import logo3 from "../images/partners/logo-3-2.png";
import logo4 from "../images/partners/logo-2.png";
import logo5 from "../images/partners/logo_header.png";
import logo6 from "../images/partners/jetbau1_prod.png";
import logo7 from "../images/partners/logo-4.png";
import logo8 from "../images/partners/logo-2-2.png";
import logo9 from "../images/partners/logo-4-2.png";
import logo10 from "../images/partners/nn41hn9qoui1kjkqal6fj91n8frvox49 1.png";
import logo11 from "../images/partners/KNAUF_Logo_2024.svg.png";
import logo12 from "../images/partners/kerama-marazzi-new-logo.png";
import logo13 from "../images/partners/be1d787068ab37f348845c13b8635e76.png";
import logo14 from "../images/partners/medium_4d1442025f64e9ecaa0c0ea80eec44eb.png";

const PartnersSection = () => {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
    logo13,
    logo14,
  ];

  return (
    <section className="partners-section">
      <div className="logos-container">
        <div className="logos-track">
          {logos.concat(logos).map((logo, index) => (
            // Дублируем массив чтобы был бесконечный скролл
            <div key={index} className="logo-item">
              <img src={logo} alt={`Partner logo ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
