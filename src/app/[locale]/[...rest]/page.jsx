import { notFound } from 'next/navigation';

// Unknown paths under a valid locale 404 *inside* the locale layout, so the
// not-found page keeps the site navigation and footer.
export default function CatchAll() {
  notFound();
}
