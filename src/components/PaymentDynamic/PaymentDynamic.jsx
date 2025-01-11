import "./PaymentDynamic.scss";

const paymentDetails = [
  { amount: "5000€", description: "Rezervacija" },
  { amount: "30%", description: "Prilikom overe ugovora" },
  { amount: "70%", description: "Fazno na 6 mesečnih rata" },
];

export const PaymentDynamic = () => {
  return (
    <div className="payment-dynamic">
      <div className="payment-dynamic__wrapper">
        {paymentDetails.map((detail, index) => (
          <div key={index} className="payment-dynamic__content">
            <h3 className="payment-dynamic__title">{detail.amount}</h3>
            <p className="payment-dynamic__text">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
