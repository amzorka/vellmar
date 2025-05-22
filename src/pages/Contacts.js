import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import MobileFooter from "../components/MobileFooter";
import useIsMobile from "../hooks/useIsMobile";
import React from "react";
import "../css/ContactsPage.scss";
import telegramIcon from "../images/telegram.png";
import whatsappIcon from "../images/whatsapp.png";

function Contacts() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <Breadcrumbs />
      <section className="contacts-page">
        <h1 className="contacts-title">Контакты</h1>
        <div className="contacts-columns">
          <div className="contacts-column-left">
            <div>
              <div className="contacts-subtitle">почта</div>
              <div className="contacts-info">hello@vellmar.ru</div>
            </div>
            <div>
              <div className="contacts-subtitle">телефон</div>
              <div className="contacts-info">+7 (495) 532-99-75</div>
            </div>
            <div>
              <div className="contacts-subtitle">социальные сети</div>
              <div className="contacts-socials">
                <a href="#" target="_blank" rel="noreferrer">
                  <img src={telegramIcon} alt="Telegram" />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <img src={whatsappIcon} alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>

          <div className="contacts-column-right">
            <div className="contacts-subtitle">офис</div>
            <div className="contacts-office">
              <p>
                Юридический <br /> адрес: 117342, г.
                <br /> Москва, вн.тер.г.
                <br /> муниципальный
                <br />
                округ Коньково,
                <br /> ул. Обручева, д. 52,
                <br /> стр. 3
              </p>
            </div>
            <div className="contacts-copyright">© 2025 ООО «Джинова»</div>
          </div>
        </div>
      </section>
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
}

export default Contacts;
