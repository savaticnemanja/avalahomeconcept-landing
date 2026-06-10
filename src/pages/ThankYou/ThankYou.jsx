import { Link } from "react-router";
import { SEO } from "@/components";
import "./ThankYou.scss";

export const ThankYou = () => {
  return (
    <section className="thank-you">
      <SEO
        title="Hvala vam"
        description="Vaša poruka je uspešno poslata. Kontaktiraćemo vas u najkraćem roku."
        path="/thank-you"
      />
      <div className="thank-you__content">
        <h1>Hvala vam!</h1>
        <p>Vaša poruka je uspešno poslata. Kontaktiraćemo vas u najkraćem roku.</p>
        <Link to="/" className="thank-you__btn">Nazad na početnu</Link>
      </div>
    </section>
  );
};
