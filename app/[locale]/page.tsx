import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreakingNews from '@/components/BreakingNews';
import ArticleCard from '@/components/ArticleCard';
import articlesData from '@/data/articles.json';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as 'es' | 'en';

  const featured = articlesData.filter(a => a.featured);
  const mainArticle = featured[0];
  const sideArticles = featured.slice(1, 4);
  const latestArticles = articlesData.filter(a => !a.featured).slice(0, 6);
  const smallArticles = articlesData.slice(4, 8);

  return (
    <>
      <Header />
      <BreakingNews locale={locale} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Hero Grid */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
            {mainArticle && <ArticleCard article={mainArticle} size="large" />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700,
                color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase',
                borderBottom: '2px solid #CC0000', paddingBottom: '8px', marginBottom: '0'
              }}>
                {t('hero.featuredNews')}
              </h3>
              {smallArticles.map(a => <ArticleCard key={a.id} article={a} size="small" />)}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ height: '2px', flex: 1, backgroundColor: '#E5E5E5' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, color: '#999', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {locale === 'es' ? 'Últimas Noticias' : 'Latest News'}
          </span>
          <div style={{ height: '2px', flex: 1, backgroundColor: '#E5E5E5' }} />
        </div>

        {/* Latest Articles Grid */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {latestArticles.map(a => <ArticleCard key={a.id} article={a} size="normal" />)}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
