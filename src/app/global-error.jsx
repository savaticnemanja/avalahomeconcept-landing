'use client';

// Last-resort boundary when the root layout itself fails: it replaces the whole
// document, so it can't rely on fonts, i18n or the site's CSS.
export default function GlobalError({ reset }) {
  return (
    <html lang="sr">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F7F3EC', color: '#1A1915' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
          <h1 style={{ fontWeight: 400, margin: 0 }}>Došlo je do greške</h1>
          <p style={{ color: '#6B645A', margin: 0 }}>Something went wrong. Please try again.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => reset()} style={{ padding: '12px 24px', background: '#C4975A', color: '#fff', border: 0, cursor: 'pointer' }}>
              Pokušaj ponovo
            </button>
            <a href="/" style={{ padding: '12px 24px', border: '1px solid #C4975A', color: '#C4975A', textDecoration: 'none' }}>
              Početna
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
