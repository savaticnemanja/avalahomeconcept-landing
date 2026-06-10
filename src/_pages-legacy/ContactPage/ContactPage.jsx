import { Contact, SEO } from "@/components";

export const ContactPage = () => {
  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontaktirajte Avala Home Concept — telefon, Viber, WhatsApp ili email. Odgovaramo u najkraćem roku."
        path="/contact"
      />
      <Contact />
    </>
  );
};
