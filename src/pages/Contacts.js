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

        <div className="contacts-grid">
          {isMobile ? (
            <>
              {/* Почта */}
              <div className="contacts-block">
                <div className="contacts-subtitle">почта</div>
                <a className="contacts-info" href="mailto:hello@vellmar.ru">
                  hello@vellmar.ru
                </a>
              </div>

              {/* Офис */}
              <div className="contacts-office">
                <div className="contacts-subtitle">офис</div>
                <p>
                  Юридический адрес: 117342, <br /> г. Москва, вн.тер.г. <br />
                  муниципальный окру <br /> Коньково,
                  <br /> ул. Обручева, д. 52, стр. 3
                </p>
              </div>

              {/* Соцсети */}
              <div className="contacts-block">
                <div className="contacts-subtitle">социальные сети</div>
                <div className="contacts-socials">
                  <a href="#">
                    <img src={telegramIcon} alt="Telegram" />
                  </a>
                  <a href="#">
                    <img src={whatsappIcon} alt="WhatsApp" />
                  </a>
                </div>
              </div>

              {/* Телефон */}
              <div className="contacts-block">
                <div className="contacts-subtitle">телефон</div>
                <a className="contacts-info" href="tel:+74955329975">
                  +7 (495) 532-99-75
                </a>
              </div>

              {/* Копирайт */}
              <div className="contacts-copyright">© 2025 ООО «Джинова»</div>
            </>
          ) : (
            <>
              {/* Левая колонка: почта + телефон */}
              <div className="contacts-block">
                <div>
                  <div className="contacts-subtitle">почта</div>
                  <a className="contacts-info" href="mailto:hello@vellmar.ru">
                    hello@vellmar.ru
                  </a>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <div className="contacts-subtitle">телефон</div>
                  <a className="contacts-info" href="tel:+74955329975">
                    +7 (495) 532-99-75
                  </a>
                </div>
              </div>

              {/* Центр: офис */}
              <div className="contacts-office">
                <div className="contacts-subtitle">офис</div>
                <p>
                  Юридический адрес: 117342, <br /> г. Москва, вн.тер.г. <br />
                  муниципальный окру <br /> Коньково,
                  <br /> ул. Обручева, д. 52, стр. 3
                </p>
              </div>

              {/* Правая колонка: соцсети + копирайт */}
              <div className="contacts-block">
                <div>
                  <div className="contacts-subtitle">социальные сети</div>
                  <div className="contacts-socials">
                    <a href="#">
                      <img src={telegramIcon} alt="Telegram" />
                    </a>
                    <a href="#">
                      <img src={whatsappIcon} alt="WhatsApp" />
                    </a>
                  </div>
                </div>
                <div className="contacts-copyright">© 2025 ООО «Джинова»</div>
              </div>
            </>
          )}
        </div>
      </section>
      {isMobile ? (
        // 🔸 Мобильный адаптив
        <div className="company-info-mobile">
          <h2 className="company-title">Реквизиты организации</h2>

          {[
            [
              "Название организации",
              "Общество с ограниченной ответственностью «Джинова»",
            ],
            ["ИНН", "9731073184"],
            ["КПП", "772801001"],
            [
              "Юридический адрес",
              "117342, г. Москва, вн.тер.г. муниципальный округ Коньково, ул. Обручева, д. 52, стр. 3",
            ],
            ["Почтовый адрес", "Совпадает с юридическим"],
            ["Банк", "ПАО СБЕРБАНК"],
            ["БИК", "44525225"],
            ["Расчетный счет", "40702810738000221336"],
            ["Корреспондентский счет", "30101810400000000225"],
            ["ОГРН", "1207700462254"],
          ].map(([label, value], index, arr) => (
            <div
              className={`company-row${
                index === arr.length - 1 ? " no-border" : ""
              }`}
              key={label}
            >
              <div className="company-label">{label}</div>
              <div className="company-value">{value}</div>
            </div>
          ))}
        </div>
      ) : (
        <section className="company-info">
          <h2 className="company-title">Реквизиты организации</h2>
          <table className="company-table">
            <tbody>
              <tr>
                <td>Название организации</td>
                <td>Общество с ограниченной ответственностью «Джинова»</td>
              </tr>
              <tr>
                <td>ИНН</td>
                <td>9731073184</td>
              </tr>
              <tr>
                <td>КПП</td>
                <td>772801001</td>
              </tr>
              <tr>
                <td>Юридический адрес</td>
                <td>
                  117342, г. Москва, вн.тер.г. муниципальный округ Коньково, ул.{" "}
                  <br />
                  Обручева, д. 52, стр. 3
                </td>
              </tr>
              <tr>
                <td>Почтовый адрес</td>
                <td>Совпадает с юридическим</td>
              </tr>
              <tr>
                <td>Банк</td>
                <td>ПАО СБЕРБАНК</td>
              </tr>
              <tr>
                <td>БИК</td>
                <td>44525225</td>
              </tr>
              <tr>
                <td>Расчетный счет</td>
                <td>40702810738000221336</td>
              </tr>
              <tr>
                <td>Корреспондентский счет</td>
                <td>30101810400000000225</td>
              </tr>
              <tr>
                <td>ОГРН</td>
                <td>1207700462254</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
}

export default Contacts;
