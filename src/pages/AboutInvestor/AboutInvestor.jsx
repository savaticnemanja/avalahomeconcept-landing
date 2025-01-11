import { ciricGradnjaLogo, ciricHomeInvestLogo } from "../../assets";
import "./AboutInvestor.scss";

const InvestorCard = ({ logo, altText, phone, email, website }) => (
  <div className="about-investor__card">
    <img src={logo} alt={altText} className="about-investor__logo" />
    <div className="about-investor__contact">
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <a href={website} target="_blank" rel="noopener noreferrer">
        Website
      </a>
    </div>
  </div>
);

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
        <InvestorCard
          logo={ciricHomeInvestLogo}
          altText="Ciric Gradnja"
          phone="+381 11 1234567"
          email="info@cirichomeinvest.com"
          website="http://www.cirichomeinvest.com"
        />
        <InvestorCard
          logo={ciricGradnjaLogo}
          altText="Home Invest"
          phone="+381 11 7654321"
          email="info@ciricgradnja.com"
          website="http://www.ciricgradnja.com"
        />
      </div>
    </section>
  );
};
