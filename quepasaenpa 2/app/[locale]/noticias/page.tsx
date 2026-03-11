import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreakingNews from '@/components/BreakingNews';
import ArticleCard from '@/components/ArticleCard';
import articlesData from '@/data/articles.json';

export default function NoticiasPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const t = useTranslations();
  const locale = useLocale() as 'es' | 'en';
  const cat = searchParams?.cat;

  const filtered = cat
    ? articlesData.filter(a => a.category === cat)
    : articlesData;

  const categories = ['politics', 'sports', 'culture', 'city', 'business', 'education', 'latino'];

  return (
    <>
      <Header />
      <BreakingNews locale={locale} />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <a href={`/${locale}/noticias`} style={{
            padding: '6px 16px', borderRadius: '20px', border: '1px solid #002868',
            backgroundColor: !cat ? '#002868' : 'transparent',
            color: !cat ? 'white' : '#002868',
            textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600
          }}>
            {locale === 'es' ? 'Todas' : 'All'}
          </a>
          {categories.map(c => (
            <a key={c} href={`/${locale}/noticias?cat=${c}`} style={{
              padding: '6px 16px', borderRadius: '20px', border: '1px solid #002868',
              backgroundColor: cat === c ? '#002868' : 'transparent',
              color: cat === c ? 'white' : '#002868',
              textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600
            }}>
              {t(`categories.${c}`)}
            </a>
          ))}
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#1A1A1A', marginBottom: '24px', borderBottom: '3px solid #CC0000', paddingBottom: '16px' }}>
          {cat ? t(`categories.${cat}`) : (locale === 'es' ? 'Todas las Noticias' : 'All News')}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map(a => <ArticleCard key={a.id} article={a} size="normal" />)}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', fontFamily: "'Source Serif 4', serif", fontSize: '18px', padding: '60px 0' }}>
            {locale === 'es' ? 'No hay artículos en esta categoría.' : 'No articles in this category.'}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
