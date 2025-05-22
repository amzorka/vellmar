import React from "react";
import "../css/AboutPage.scss";
import aboutImage1 from "../images/about/1.jpg";
import aboutImage2 from "../images/about/2.jpg";
import aboutImage3 from "../images/about/3.jpg";
import aboutImage4 from "../images/about/4.jpg";
import aboutImage5 from "../images/about/5.jpg";
import aboutImageMob from "../images/about/1-mobile.jpg";

import Breadcrumbs from "../components/Breadcrumbs";
import PartnersSection from "../components/PartnersSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useIsMobile from "../hooks/useIsMobile";
import MobileFooter from "../components/MobileFooter";
import MobileHeader from "../components/MobileHeader";

function About() {
  const isMobile = useIsMobile();

  return (
    <div className="about-page">
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      <section className="about-section about-section-1">
        <h1 className="about-section-1__main-title">О НАС</h1>
        {isMobile ? (
          <img
            className="about-section-1__image"
            src={aboutImageMob}
            alt="О компании Веллмар"
          />
        ) : (
          <img
            className="about-section-1__image"
            src={aboutImage1}
            alt="О компании Веллмар"
          />
        )}

        <h2 className="about-section-1__subtitle">О компании Веллмар</h2>
        <p className="about-section-1__text">
          Веллмар — российская компания, специализирующаяся на комплексных
          поставках строительных материалов, инструмента и сопутствующей
          продукции для профессионального сегмента. Мы работаем на рынке более 5
          лет
          <br /> и за это время стали надёжным партнёром для десятков крупных
          организаций, включая строительные холдинги, подрядчиков, логистические
          комплексы, производственные и ремонтно-эксплуатационные предприятия по
          всей стране.
        </p>
      </section>

      <section className="about-section about-section-2">
        <div className="about-section-2__content">
          <div className="about-section-2__text-block">
            <h2 className="about-section-2__subtitle">Наш подход</h2>
            <p className="about-section-2__text">
              Мы не просто продаём строительные товары — мы выстраиваем надёжные
              логистические и сервисные цепочки, ориентируясь на реальные
              потребности бизнеса. Понимая, насколько важны точность сроков,
              доступность ассортимента и стабильность поставок, мы выстраиваем
              работу так, чтобы клиент мог сосредоточиться на
              <br /> своём проекте, не отвлекаясь на оперативные мелочи.
              <br />
              <br />
              Наша команда — это специалисты с опытом в строительной отрасли
              <br /> и снабжении. Мы умеем слушать, точно понимать задачу и
              <br /> предлагать эффективные решения. Будь то крупный оптовый
              заказ
              <br /> или проектное снабжение объекта — мы подходим с одинаковой
              степенью ответственности и внимательности.
            </p>
          </div>
          <img
            className="about-section-2__image"
            src={aboutImage2}
            alt="Наш подход"
          />
        </div>
      </section>

      <section className="about-section about-section-3">
        <img
          className="about-section-3__image"
          src={aboutImage3}
          alt="Ассортимент Веллмар"
        />
        <h2 className="about-section-3__subtitle">Ассортимент</h2>
        <div className="about-section-3__text">
          <p>
            Ассортимент Веллмар охватывает ключевые товарные категории,
            необходимые для современного
            <br /> строительства и ремонта:
          </p>
          <ul>
            <li>Электроинструмент и ручной инструмент ведущих брендов</li>
            <li>Крепёж</li>
            <li>Строительные и отделочные смеси</li>
            <li>Изоляционные, кровельные и фасадные материалы</li>
            <li>Расходные материалы, средства малярных и монтажных работ</li>
            <li>Сопутствующие товары для обустройства строительных площадок</li>
          </ul>
          <p>
            Весь товар проходит проверку на соответствие требованиям
            профессионального использования. Мы
            <br /> сотрудничаем с надёжными поставщиками и производителями, что
            позволяет поддерживать оптимальное соотношение цены и качества.
          </p>
        </div>
      </section>

      <section className="about-section-four">
        <div className="about-four__container">
          <div className="about-four__text-block">
            <h2 className="about-four__title">Наши клиенты</h2>
            <p className="about-four__text">
              Среди наших постоянных клиентов — строительные компании,
              обслуживающие крупные объекты коммерческой и жилой недвижимости,
              подрядчики федеральных проектов, организации ЖКХ, ремонтные
              службы, оптовые компании и розничные сети.
              <br /> Мы выстраиваем долгосрочные отношения и<br /> стремимся
              быть не просто поставщиком, а<br /> полноценным партнёром,
              разделяющим цели и задачи бизнеса клиента.
            </p>
          </div>
          <img src={aboutImage4} alt="Клиенты" className="about-four__image" />
        </div>
      </section>

      <div className="about-final-image">
        <img
          src={aboutImage5}
          style={{ maxWidth: "760px", height: "507px" }}
        ></img>
      </div>
      <PartnersSection />
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default About;
