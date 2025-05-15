import Icon1 from "../images/whyUsIcons/free-icon-handshake-3113031 1.png";
import Icon2 from "../images/whyUsIcons/free-icon-box-3639291 1.png";
import Icon3 from "../images/whyUsIcons/free-icon-experience-2303952 1.png";
import RightImage from "../images/whyUsIcons/image 12.jpg";

function FourBlocksSection() {
  return (
    <div className="cards-and-image-wrapper">
      <div className="info-left">
        <div className="top-row">
          <div className="info-card small">
            <div className="icon-and-title">
              <img
                src={Icon1}
                alt="Icon 1"
                className="why-us-icon"
                style={{ marginBottom: "10px" }}
              />
              <h3 className="card-title">1000+ ДОВОЛЬНЫХ КЛИЕНТОВ</h3>
            </div>
            <p className="card-text">
              Наш подход ценят за стабильное качество, ответственность и
              внимание к деталям.
            </p>
          </div>
          <div className="info-card small">
            <div className="icon-and-title">
              <img
                src={Icon2}
                alt="Icon 1"
                className="why-us-icon"
                style={{ marginBottom: "10px" }}
              />
              <h3 className="card-title">3000+ ПОЗИЦИЙ В АССОРТИМЕНТЕ</h3>
            </div>
            <p className="card-text">
              Большой ассортимент строительных материалов с постоянным складским
              запасом.
            </p>
          </div>
        </div>

        <div className="info-card large">
          <div className="icon-and-text">
            <img
              src={Icon3}
              alt="Icon 3"
              className="why-us-icon"
              style={{ marginTop: "20px" }}
            />
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
  );
}

export default FourBlocksSection;
