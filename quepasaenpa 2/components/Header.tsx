'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [today, setToday] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const d = new Date();
    setToday(d.toLocaleDateString(locale === 'es' ? 'es-US' : 'en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [locale]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const href = (path: string) => `/${locale}${path}`;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
      transition: 'box-shadow 0.3s ease'
    }}>
      {/* Top bar */}
      <div style={{ backgroundColor: '#CC0000', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500 }}>
          {today}
        </span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => switchLocale('es')}
            style={{
              background: locale === 'es' ? 'white' : 'transparent',
              color: locale === 'es' ? '#CC0000' : 'white',
              border: '1px solid white', borderRadius: '4px',
              padding: '2px 10px', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600
            }}
          >🇺🇸 ES</button>
          <button
            onClick={() => switchLocale('en')}
            style={{
              background: locale === 'en' ? 'white' : 'transparent',
              color: locale === 'en' ? '#CC0000' : 'white',
              border: '1px solid white', borderRadius: '4px',
              padding: '2px 10px', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600
            }}
          >🇺🇸 EN</button>
        </div>
      </div>

      {/* Main header */}
      <div style={{ backgroundColor: '#111111', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <Link href={href('')} style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 900,
              color: 'white',
              margin: 0,
              letterSpacing: '-1px',
              lineHeight: 1
            }}>
              <span style={{ color: '#CC0000' }}>¿</span>QUE PASA EN <span style={{ color: '#CC0000' }}>PA</span>?
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: '#999',
              margin: '6px 0 0',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>
              {locale === 'es' ? 'Tu fuente de noticias de Pennsylvania' : 'Your source for Pennsylvania news'}
            </p>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ backgroundColor: '#002868', borderBottom: '3px solid #CC0000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Desktop nav */}
          <ul style={{
            display: 'flex', listStyle: 'none', margin: 0, padding: 0,
            justifyContent: 'center', gap: '4px'
          }}>
            {[
              { label: t('home'), path: '' },
              { label: t('news'), path: '/noticias' },
              { label: t('politics'), path: '/noticias?cat=politics' },
              { label: t('sports'), path: '/noticias?cat=sports' },
              { label: t('culture'), path: '/noticias?cat=culture' },
              { label: t('about'), path: '/sobre-nosotros' },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={href(item.path)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#CC0000')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
