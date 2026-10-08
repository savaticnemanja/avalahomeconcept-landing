import { LuMail, LuPhone, LuTriangleAlert } from 'react-icons/lu';
import { prisma } from '@/lib/db';
import { LOCALE_LABELS } from '@/lib/admin/constants';

const df = new Intl.DateTimeFormat('sr-RS', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Belgrade',
});

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Upiti
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Svi upiti poslati preko kontakt forme na sajtu (poslednjih 200). Čuvaju se pre slanja
        emaila, pa su ovde i ako email nije stigao.
      </p>

      {inquiries.length === 0 ? (
        <p className="text-sm text-text-muted">Još nema upita.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {inquiries.map((q) => (
            <li key={q.id} className="bg-bg-alt border border-border rounded-[6px] p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                <span className="text-text text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                  {q.name}
                </span>
                <span className="text-xs text-text-muted">
                  {df.format(q.createdAt)}
                  {q.locale && ` · ${LOCALE_LABELS[q.locale] ?? q.locale}`}
                  {q.page && ` · ${q.page}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 text-sm">
                {q.phone && (
                  <a href={`tel:${q.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                    <LuPhone className="w-3.5 h-3.5" />
                    {q.phone}
                  </a>
                )}
                {q.email && (
                  <a href={`mailto:${q.email}`} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                    <LuMail className="w-3.5 h-3.5" />
                    {q.email}
                  </a>
                )}
                {!q.emailSent && (
                  <span className="inline-flex items-center gap-1.5 text-amber-700">
                    <LuTriangleAlert className="w-3.5 h-3.5" />
                    Email obaveštenje nije potvrđeno
                  </span>
                )}
              </div>
              <p className="text-sm text-text font-light whitespace-pre-line">{q.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
