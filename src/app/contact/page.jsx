import { Contact } from '@/components';

export const metadata = {
  title: 'Kontakt',
  description: 'Kontaktirajte Avala Home Concept — pozovite nas, pošaljite poruku ili nas posetite. Telefon: +381 63 383393.',
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
    </main>
  );
}
