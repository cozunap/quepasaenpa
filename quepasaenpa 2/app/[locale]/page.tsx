import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreakingNews from '@/components/BreakingNews';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/supabase';
import articlesData from '@/data/articles.json';

export const revalidate = 300;

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  let allArticles;
  try {
    allArticles = await getArticles({ limit: 20 });
    if (allArticles.length === 0) throw new Error('No articles');
  } catch {
    allArticles = articlesData.map(a => ({ ...a }));
  }

  const mainArticle = allArticles[0];
  const sideArticles = allArticles.slice(1, 5);
  const latestArticles = allArticles.slice(5, 11);

  return (
    <>
      <Header />
      <BreakingNews locale={locale} />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
            {mainArticle && <ArticleCard article={mainArticle as any} size="large" />}
            <div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '2px solid #CC0000', paddingBottom: '8px', marginBottom: '0' }}>
                {locale === 'es' ? 'Noticias Destacadas' : 'Featured News'}
              </h3>
              {sideArticles.map((a: any) => <ArticleCard key={a.id} article={a} size="small" />)}
            </div>
          </div>
        </section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ height: '2px', flex: 1, backgroundColor: '#E5E5E5' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, color: '#999', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {locale === 'es' ? 'Últimas Noticias' : 'Latest News'}
          </span>
          <div style={{ height: '2px', flex: 1, backgroundColor: '#E5E5E5' }} />
        </div>
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {latestArticles.map((a: any) => <ArticleCard key={a.id} article={a} size="normal" />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
