import { plan2, showcaseFront } from "../../assets";
import "./Showcase.scss";

const descriptions = [
  "Kompleks zatvorenog tipa",
  "Rampa za ulasku u kompleks",
  "Moderna arhitektura",
  "Kompletna infrastruktura",
  '10 min od autoputa, Ikee, novog TC "Ava" sa mnoštvo prodavnica.',
  "20 min od Autokomande, Vračara.",
  "Čvrsta gradnja, premium završni materijali.",
];

export const Showcase = () => {
  return (
    <div className="showcase">
      <img src={plan2} className="showcase__image" alt="" />
      <img src={showcaseFront} className="showcase__image" alt="" />
      <div className="showcase__descriptions">
        {descriptions.map((description, index) => (
          <p key={index} className="showcase__description-item">
            {description}
          </p>
        ))}
      </div>
    </div>
  );
};
