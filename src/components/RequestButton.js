import "../css/RequestButton.scss";

const RequestButton = ({ product, onRequestClick }) => {
  return (
    <button className="request-button" onClick={() => onRequestClick(product)}>
      Оставить заявку
    </button>
  );
};

export default RequestButton;
