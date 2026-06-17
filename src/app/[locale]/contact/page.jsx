import { Contact } from '@/components';
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: buildAlternates(locale, '/contact'),
  };
}

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
    </main>
  );
}
