import { emailIcon, phoneIcon, viberIcon, whatsappIcon } from "@/assets";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import "./Contact.scss";

const ContactIcon = ({ icon, text, action }) => (
  <div className="contact__icon" onClick={action}>
    <img src={icon} alt="Contact Icon" />
    <p>{text}</p>
  </div>
);

export const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_479xn4w",
        "template_f65leyq",
        form.current,
        "yXqwmaxm-PpofwIqK"
      )
      .then(
        () => {
          navigate("/thank-you");
        },
        () => {
          toast.success(
            "Problem sa slanjem poruke. Pokušajte ponovo kasnije.",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
        }
      );
  };

  return (
    <div className="contact">
      <div className="contact__left">
        <h1>Imaš pitanje?</h1>
        <p>
          Klikom na dugme ispod kontaktiraj nas putem željenog kanala, a mi ćemo
          odgovoriti u najkraćem roku.
        </p>
        <div className="contact__icons">
          <ContactIcon
            icon={phoneIcon}
            text="Pozovite nas na +381 63 383393"
            action={() => (window.location.href = "tel:+38163383393")}
          />
          <ContactIcon
            icon={viberIcon}
            text="Kontaktirajte nas putem Vibera"
            action={() =>
              window.open("viber://contact/?number=+38163383393", "_blank")
            }
          />
          <ContactIcon
            icon={whatsappIcon}
            text="Kontaktirajte nas putem WhatsApp-a"
            action={() => window.open("https://wa.me/+38163383393", "_blank")}
          />
          <ContactIcon
            icon={emailIcon}
            text="Pošaljite nam email na avalahomeconcept@gmail.com"
            action={() =>
              (window.location.href = "mailto:avalahomeconcept@gmail.com")
            }
          />
        </div>
      </div>
      <div className="contact__right">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="firstName" placeholder="Ime" required />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Broj telefona"
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Email adresa"
            required
          />
          <textarea
            name="message"
            placeholder="Vaša poruka"
            rows="4"
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
