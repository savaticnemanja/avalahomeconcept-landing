import { emailIcon, phoneIcon, viberIcon, whatsappIcon } from "@/assets";
import "./Contact.scss";

const ContactIcon = ({ icon, text }) => (
  <div className="contact__icon">
    <img src={icon} alt="Contact Icon" />
    <p>{text}</p>
  </div>
);

export const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__left">
        <h1>Imaš pitanje?</h1>
        <p>
          Klikom na dugme ispod kontaktiraj nas putem željenog kanala, a mi ćemo
          odgovoriti u najkraćem roku.
        </p>
        <div className="contact__icons">
          <ContactIcon icon={phoneIcon} text="+381 11 123 456" />
          <ContactIcon icon={viberIcon} text="avalahomeconcept@gmail.com" />
          <ContactIcon icon={whatsappIcon} text="avalahomeconcept@gmail.com" />
          <ContactIcon icon={emailIcon} text="avalahomeconcept@gmail.com" />
        </div>
      </div>
      <div className="contact__right">
        <input type="text" placeholder="Ime i prezime" />
        <select>
          <option value="" disabled selected>
            Razlog kontaktiranja
          </option>
          <option value="general">Generalno</option>
          <option value="partnership">Partnerstvo</option>
          <option value="support">Podrška</option>
        </select>
        <input type="email" placeholder="Email adresa" />
        <textarea placeholder="Poruka" />
        <button>Pošalji</button>
      </div>
    </div>
  );
};
