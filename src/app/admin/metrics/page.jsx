import { LuUsers, LuMousePointerClick, LuPhoneCall, LuActivity, LuHouse } from 'react-icons/lu';
import { getMetricsOverview } from '@/lib/metrics';
import { LOCALE_LABELS } from '@/lib/admin/constants';
import { TrendChart } from './TrendChart';
import { HourChart } from './HourChart';
import { DonutChart } from './DonutChart';

const nf = new Intl.NumberFormat('sr-RS');
const pf = new Intl.NumberFormat('sr-RS', { style: 'percent', maximumFractionDigits: 1 });

const Stat = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-bg-alt border border-border rounded-[6px] p-5">
    <div className="flex items-center gap-2 text-text-muted mb-3">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-sm">{label}</span>
    </div>
    <div className="text-2xl text-text" style={{ fontFamily: 'var(--font-heading)' }}>
      {nf.format(value)}
    </div>
    {sub != null && <div className="text-xs text-text-muted mt-1">{sub}</div>}
  </div>
);


export default async function AdminMetricsPage() {
  const m = await getMetricsOverview(30);

  const localeLabel = (k) => LOCALE_LABELS[k] ?? (k || 'nepoznato');
  const deviceLabel = (k) => ({ mobile: 'Mobilni', desktop: 'Desktop' }[k] ?? (k || 'nepoznato'));

  // Format page paths with readable names
  const pageLabel = (path) => {
    if (!path || path === '/') return 'Početna (/)';
    const name = {
      '/offer': 'Ponuda',
      '/gallery': 'Galerija',
      '/about-us': 'O nama',
      '/contact': 'Kontakt',
      '/thank-you': 'Hvala',
    }[path];
    return name ? `${name} (${path})` : path;
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Posete
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Jedinstvene posete (jedan posetilac = jedna poseta dnevno, bez kolačića). Osvežavanje i
        kretanje kroz sajt ne uvećavaju broj. Ukupno: {nf.format(m.total)} poseta.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Stat icon={LuUsers} label="Posete danas" value={m.today} />
        <Stat icon={LuUsers} label="Posete (7 dana)" value={m.last7} />
        <Stat icon={LuUsers} label="Posete (30 dana)" value={m.last30} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat
          icon={LuPhoneCall}
          label="Kontakti (30 dana)"
          value={m.conversions.count}
          sub={`${pf.format(m.conversions.rate)} poseta ostvari kontakt`}
        />
        <Stat
          icon={LuActivity}
          label="Angažovanost"
          value={Math.round(m.engagement.rate * 100)}
          sub={`${pf.format(m.engagement.rate)} poseta klikne nešto`}
        />
        <Stat
          icon={LuMousePointerClick}
          label="Najjači CTR"
          value={m.ctr[0] ? Math.round(m.ctr[0].ctr * 100) : 0}
          sub={m.ctr[0] ? `${m.ctr[0].name} (${pf.format(m.ctr[0].ctr)})` : 'Nema klikova još'}
        />
      </div>

      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Posete u poslednjih 30 dana
        </h2>
        <TrendChart series={m.series} />
      </div>

      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <h2 className="text-sm text-text mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          Posete po dobu dana
        </h2>
        <p className="text-xs text-text-muted mb-4">Kada je najbolje vreme za objave i dostupnost.</p>
        <HourChart hourly={m.hourly} />
      </div>

      {/* Top projects by leads (contact/offer CTA clicks). */}
      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <LuHouse className="w-4 h-4 text-accent" />
          <h2 className="text-sm text-text" style={{ fontFamily: 'var(--font-heading)' }}>
            Najveće interesovanje (30 dana)
          </h2>
        </div>
        {m.topProjects.length === 0 ? (
          <p className="text-xs text-text-muted">
            Nema registrovanih interesovanja za projektima.
          </p>
        ) : (
          <DonutChart
            data={m.topProjects.map((p) => ({ label: p.name, value: p.leads }))}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Entry pages */}
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ulazne stranice
          </h2>
          {m.entryPages.length === 0 ? (
            <p className="text-xs text-text-muted">Nema podataka.</p>
          ) : (
            <DonutChart
              data={m.entryPages.map((p) => ({ label: pageLabel(p.key), value: p.count }))}
            />
          )}
        </div>

        {/* Referrers */}
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Izvori poseta
          </h2>
          {m.referrers.length === 0 ? (
            <p className="text-xs text-text-muted">Uglavnom direktne posete.</p>
          ) : (
            <DonutChart
              data={m.referrers.map((r) => ({ label: r.key || 'direktno', value: r.count }))}
            />
          )}
        </div>

        {/* Languages */}
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Jezici
          </h2>
          {m.byLocale.length === 0 ? (
            <p className="text-xs text-text-muted">Nema podataka.</p>
          ) : (
            <DonutChart
              data={m.byLocale.map((l) => ({ label: localeLabel(l.key), value: l.count }))}
            />
          )}
        </div>

        {/* Devices */}
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Uređaji
          </h2>
          {m.byDevice.length === 0 ? (
            <p className="text-xs text-text-muted">Nema podataka.</p>
          ) : (
            <DonutChart
              data={m.byDevice.map((d) => ({ label: deviceLabel(d.key), value: d.count }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
