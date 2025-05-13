import React from "react";
import "../css/InfoBlocksSection.scss";
import Icon1 from "../images/whyUsIcons/free-icon-handshake-3113031 1.png";
import Icon2 from "../images/whyUsIcons/free-icon-box-3639291 1.png";
import Icon3 from "../images/whyUsIcons/free-icon-experience-2303952 1.png";
import RightImage from "../images/whyUsIcons/image 12.jpg";
import BigLogo from "../images/BigLogo.png";

const InfoBlocksSection = () => {
  return (
    <section className="info-container">
      <div className="cards-and-image-wrapper">
        <div className="info-left">
          <div className="top-row">
            <div className="info-card small">
              <div className="icon-and-title">
                <img src={Icon1} alt="Icon 1" className="why-us-icon" />
                <h3 className="card-title">1000+ ДОВОЛЬНЫХ КЛИЕНТОВ</h3>
              </div>
              <p className="card-text">
                Наш подход ценят за стабильное качество, ответственность и
                внимание к деталям.
              </p>
            </div>
            <div className="info-card small">
              <div className="icon-and-title">
                <img src={Icon2} alt="Icon 1" className="why-us-icon" />
                <h3 className="card-title">3000+ ПОЗИЦИЙ В АССОРТИМЕНТЕ</h3>
              </div>
              <p className="card-text">
                Большой ассортимент строительных материалов с постоянным
                складским запасом.
              </p>
            </div>
          </div>

          <div className="info-card large">
            <div className="icon-and-text">
              <img src={Icon3} alt="Icon 3" className="why-us-icon" />
              <div className="text-content">
                <h3 className="big-card-title">БОЛЕЕ 5 ЛЕТ УСПЕШНОЙ РАБОТЫ</h3>
                <p className="big-card-text">
                  С 2020 года обеспечиваем бесперебойные поставки строительных
                  материалов для частных и коммерческих проектов.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-right">
          <img src={RightImage} alt="Веллмар" className="right-image" />
        </div>
      </div>

      <div className="dark-text-block">
        <div className="slogan">
          <img src={BigLogo} alt="Веллмар" className="slogan-logo" />
          <div className="slogan-texts">
            <p className="slogan-line first-line">
              — надёжный поставщик строительных{" "}
            </p>
          </div>
          <p className="slogan-line second-line">решений по всей России</p>
        </div>

        <div className="dark-block-text">
          <p>
            Веллмар — надёжный поставщик строительных решений по всей России
            Компания Веллмар уже более 5 лет уверенно занимает своё место на
            рынке поставок строительных материалов и инструмента. Мы работаем с
            крупными строительными и ремонтными организациями по всей России,
            предлагая комплексные поставки и персонализированный подход к
            каждому клиенту.
          </p>
          <p>
            Наша специализация — это обеспечение строительных объектов всем
            необходимым: от профессионального электроинструмента до отделочных и
            кровельных материалов, от крепежа до изоляции, от сухих смесей до
            расходников. Мы чётко понимаем, насколько важна надёжность в
            поставках, особенно в условиях интенсивного строительного графика.
            Именно поэтому делаем ставку на проверенных производителей,
            выстроенные логистические процессы и чёткую работу команды.
          </p>
          <p>
            С нами удобно: мы умеем работать с оптовыми заказами, предлагаем
            конкурентные условия для компаний, соблюдаем сроки, сопровождаем
            сделку на всех этапах и всегда готовы предложить альтернативные
            решения под задачи заказчика. Многие наши клиенты — это крупные
            подрядчики, логистические и производственные компании, которые ценят
            чёткое выполнение договорённостей, стабильность поставок и
            экспертную консультацию.
          </p>
          <p>
            Веллмар — это не просто магазин стройматериалов. Это партнёр,
            который понимает бизнес в строительстве, умеет слышать и предлагать
            решения. Мы сопровождаем клиентов от первого запроса до закрытия
            объекта — профессионально, гибко и с пониманием реальных задач
            отрасли.
          </p>
          <p>
            Строительство — это всегда про точность, сроки и ответственность. С
            Веллмар вы можете быть уверены: нужный товар будет в наличии,
            отгрузка — вовремя, а сотрудничество — комфортным.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoBlocksSection;
