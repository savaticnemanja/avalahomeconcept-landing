import { ciricGradnjaLogo, ciricHomeInvestLogo } from "../../assets";
import "./AboutInvestor.scss";

export const AboutInvestor = () => {
  return (
    <section id="aboutus" className="about-investor">
      <div className="about-investor__left">
        <h1 className="about-investor__title">O investitoru</h1>
        <p>
          Porodica Ćirić već 30 godina uspešno gradi i posluje na tržištu
          Srbije. Naše građevinske kompanije Ćirić Home Invest i Ćirić gradnja
          iza sebe imaju više hiljada uspešno realizovanih projekata i
          zadovoljnih klijenata. Naše dugogodišnje iskustvo čini nas pouzdanim
          partnerom od poverenja koji ima znanje, stručnost i kadrove za
          realizaciju svih vrsta građevinskih radova brzo, kvalitetno i po
          dogovoru.
        </p>
      </div>
      <div className="about-investor__right">
        <img
          src={ciricHomeInvestLogo}
          alt="Ciric Gradnja"
          className="about-investor__logo"
        />
        <img
          src={ciricGradnjaLogo}
          alt="Home Invest"
          className="about-investor__logo"
        />
      </div>
    </section>
  );
};
