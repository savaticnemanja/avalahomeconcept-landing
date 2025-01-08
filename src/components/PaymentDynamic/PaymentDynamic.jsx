import "./PaymentDynamic.scss";

export const PaymentDynamic = () => {
  return (
    <div className="payment-dynamic">
      <div className="payment-dynamic__content">
        <h3 className="payment-dynamic__title">5000&#8364;</h3>
        <p className="payment-dynamic__text">Rezervacija</p>
      </div>
      <div className="payment-dynamic__content">
        <h3 className="payment-dynamic__title">30%</h3>
        <p className="payment-dynamic__text">Prilikom overe ugovora</p>
      </div>
      <div className="payment-dynamic__content">
        <h3 className="payment-dynamic__title">70%</h3>
        <p className="payment-dynamic__text">Fazno na 12 mesečnih rata</p>
      </div>
    </div>
  );
};
