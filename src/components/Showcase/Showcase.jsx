import { showcase1, showcase2 } from "@/assets";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Showcase.scss";

const descriptions = [
  { title: "Zatvoren kompleks" },
  { title: "Moderna i Mediteranska arhitektura" },
  { title: "Brza konekcija na autoput" },
  { title: "Čvrsta gradnja" },
  { title: "Visok nivo završnih materijala" },
  { title: "Parking mesto" },
  { title: "Rampa na ulasku/izlasku" },
  { title: "Najlepša lokacija sa pogledom" },
];

export const Showcase = () => {
  return (
    <div className="showcase">
      <div className="showcase__image-container">
        <img src={showcase1} className="showcase__image" alt="" />
        <img src={showcase2} className="showcase__image" alt="" />
      </div>
      <div className="showcase__descriptions">
        {descriptions.map((item, index) => (
          <div key={index} className="showcase__description-item">
            <h3 className="showcase__description-title">
              <FaCheckCircle className="showcase__icon" />
              {item.title}
            </h3>
          </div>
        ))}
        <Link to="/specifications" className="showcase__button">
          Detaljna specifikacija
          <FaArrowCircleRight className="showcase__icon" />
        </Link>
      </div>
    </div>
  );
};
