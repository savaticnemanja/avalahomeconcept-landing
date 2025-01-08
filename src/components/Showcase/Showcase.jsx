import { plan2, showcaseFront } from "../../assets";
import "./Showcase.scss";

export const Showcase = () => {
  return (
    <div className="showcase">
      <div className="showcase__left">
        <img src={plan2} className="showcase__backside-image" alt="" />
        <img src={showcaseFront} className="showcase__frontside-image" alt="" />
      </div>
      <div className="showcase__right">
        <p className="showcase__description">Kompleks zatvorenog tipa</p>
        <p className="showcase__description">Rampa za ulasku u kompleks</p>
        <p className="showcase__description">Moderna arhitektura</p>
        <p className="showcase__description">Kompletna infrastruktura</p>
        <p className="showcase__description">
          10 min od autoputa, Ikee, novog TC &quot;Ava&quot; sa mnoštvo
          prodavnica.
        </p>
        <p className="showcase__description">20 min od Autokomande, Vračara.</p>
        <p className="showcase__description">
          Čvrsta gradnja, premium završni materijali.
        </p>
      </div>
    </div>
  );
};
