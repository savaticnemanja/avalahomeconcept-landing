import "./PaymentDynamic.scss";

const paymentDetails = [
  { amount: "5000€", description: "Rezervacija" },
  { amount: "30%", description: "Prilikom overe ugovora" },
  { amount: "70%", description: "4 rate po završetku svake faze gradnje" },
];

export const PaymentDynamic = () => {
  return (
    <div className="payment-dynamic">
      <h2 className="payment-dynamic__heading">Dinamika plaćanja</h2>
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
