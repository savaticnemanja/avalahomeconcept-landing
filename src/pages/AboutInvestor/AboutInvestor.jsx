import { ciricGradnjaLogo, ciricHomeInvestLogo } from "@/assets";
import "./AboutInvestor.scss";

const InvestorCard = ({ logo, altText, email, website }) => (
  <div className="about-investor__card">
    <img src={logo} alt={altText} className="about-investor__logo" />
    <div className="about-investor__contact">
      <p>Email: {email}</p>
      <a href={website} target="_blank" rel="noopener noreferrer">
        Website
      </a>
    </div>
  </div>
);

const investorData = [
  {
    logo: ciricHomeInvestLogo,
    altText: "Ciric Gradnja",
    email: "info@cirichomeinvest.com",
    website: "http://www.cirichomeinvest.com",
  },
  {
    logo: ciricGradnjaLogo,
    altText: "Home Invest",
    email: "info@ciricgradnja.com",
    website: "http://www.ciricgradnja.com",
  },
];

export const AboutInvestor = () => (
  <section id="aboutus" className="about-investor">
    <div className="about-investor__left">
      <h1 className="about-investor__title">O investitoru</h1>
      <p>
        Porodica Ćirić već 30 godina uspešno gradi i posluje na tržištu Srbije.
        Naše građevinske kompanije Ćirić Home Invest i Ćirić gradnja iza sebe
        imaju više hiljada uspešno realizovanih projekata i zadovoljnih
        klijenata. Naše dugogodišnje iskustvo čini nas pouzdanim partnerom od
        poverenja koji ima znanje, stručnost i kadrove za realizaciju svih vrsta
        građevinskih radova brzo, kvalitetno i po dogovoru.
      </p>
    </div>
    <div className="about-investor__right">
      {investorData.map((investor, index) => (
        <InvestorCard key={index} {...investor} />
      ))}
    </div>
  </section>
);
