'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuLayoutDashboard, LuImages, LuHouse, LuChartColumn, LuLogOut, LuExternalLink, LuInbox } from 'react-icons/lu';

const LINKS = [
  { href: '/admin', label: 'Pregled', icon: LuLayoutDashboard, exact: true },
  { href: '/admin/gallery', label: 'Galerija', icon: LuImages },
  { href: '/admin/projects', label: 'Projekti', icon: LuHouse },
  { href: '/admin/inquiries', label: 'Upiti', icon: LuInbox },
  { href: '/admin/metrics', label: 'Posete', icon: LuChartColumn },
];

export const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isActive = (link) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  const logout = async () => {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-full md:w-60 md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-bg-alt flex md:flex-col flex-shrink-0">
      <div className="px-5 py-5 border-r md:border-r-0 md:border-b border-border flex items-center">
        <span style={{ fontFamily: 'var(--font-heading)' }} className="text-lg text-text">
          Avala <span className="text-accent">Admin</span>
        </span>
      </div>

      <nav className="flex md:flex-col flex-1 p-2 md:p-3 gap-1 overflow-x-auto">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm whitespace-nowrap transition-colors',
                isActive(link)
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:bg-bg hover:text-text',
              ].join(' ')}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 md:p-3 md:border-t border-border flex md:flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm text-text-muted hover:bg-bg hover:text-text transition-colors whitespace-nowrap"
        >
          <LuExternalLink className="w-4 h-4" />
          Sajt
        </a>
        <button
          onClick={logout}
          disabled={loading}
          className="flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm text-text-muted hover:bg-bg hover:text-text transition-colors whitespace-nowrap disabled:opacity-50"
        >
          <LuLogOut className="w-4 h-4" />
          Odjava
        </button>
      </div>
    </aside>
  );
};
