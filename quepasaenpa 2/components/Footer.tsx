import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#111111', color: 'white', marginTop: '60px' }}>
      <div style={{ borderTop: '4px solid #CC0000' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: 'white', margin: '0 0 8px' }}>
              <span style={{ color: '#CC0000' }}>¿</span>QUE PASA EN <span style={{ color: '#CC0000' }}>PA</span>?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#999', lineHeight: 1.6 }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {locale === 'es' ? 'Secciones' : 'Sections'}
            </h4>
            {[
              { label: t('nav.home'), path: '' },
              { label: t('nav.news'), path: '/noticias' },
              { label: t('nav.politics'), path: '/noticias?cat=politics' },
              { label: t('nav.sports'), path: '/noticias?cat=sports' },
              { label: t('nav.culture'), path: '/noticias?cat=culture' },
            ].map(item => (
              <Link key={item.label} href={`/${locale}${item.path}`} style={{ display: 'block', color: '#bbb', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '8px' }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {locale === 'es' ? 'Categorías' : 'Categories'}
            </h4>
            {['politics', 'sports', 'culture', 'city', 'business', 'education', 'latino'].map(cat => (
              <Link key={cat} href={`/${locale}/noticias?cat=${cat}`} style={{ display: 'block', color: '#bbb', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '8px' }}>
                {t(`categories.${cat}`)}
              </Link>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              {locale === 'es' ? 'Nosotros' : 'About'}
            </h4>
            <Link href={`/${locale}/sobre-nosotros`} style={{ display: 'block', color: '#bbb', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '8px' }}>
              {t('nav.about')}
            </Link>
            <p style={{ color: '#bbb', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: 1.6 }}>
              {locale === 'es'
                ? 'Cubriendo las noticias más importantes de Pennsylvania para la comunidad latina y anglohablante.'
                : 'Covering the most important news in Pennsylvania for the Latino and English-speaking community.'}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#666', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', margin: 0 }}>
            © {year} Que Pasa en PA. {t('footer.rights')}
          </p>
          <p style={{ color: '#666', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', margin: 0 }}>
            {t('footer.madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}
