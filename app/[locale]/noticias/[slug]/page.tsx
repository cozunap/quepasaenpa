import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import articlesData from '@/data/articles.json';

const categoryColors: Record<string, string> = {
  politics: '#CC0000', sports: '#002868', culture: '#8B5E3C',
  city: '#2D6A4F', business: '#1B4332', education: '#5C4A8F', latino: '#C77DFF',
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const t = useTranslations();
  const locale = useLocale() as 'es' | 'en';
  const article = articlesData.find(a => a.slug === params.slug);

  if (!article) notFound();

  const related = articlesData
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const catColor = categoryColors[article.category] || '#CC0000';

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>

          {/* Article */}
          <article>
            <div style={{ marginBottom: '16px' }}>
              <Link href={`/${locale}/noticias?cat=${article.category}`} style={{
                backgroundColor: catColor, color: 'white', padding: '4px 12px',
                borderRadius: '2px', fontSize: '11px', fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none'
              }}>
                {t(`categories.${article.category}`)}
              </Link>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, margin: '0 0 16px'
            }}>
              {article.title[locale]}
            </h1>

            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '18px', color: '#444', fontStyle: 'italic', margin: '0 0 20px', lineHeight: 1.5 }}>
              {article.excerpt[locale]}
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '20px', borderBottom: '2px solid #E5E5E5', marginBottom: '24px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#666' }}>
                <strong>{t('article.by')} {article.author}</strong>
              </span>
              <span style={{ color: '#CCC' }}>|</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#666' }}>
                {new Date(article.date).toLocaleDateString(locale === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{ color: '#CCC' }}>|</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#666' }}>
                {article.readTime} {t('article.minRead')}
              </span>
            </div>

            <div style={{ position: 'relative', height: '420px', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
              <Image src={article.image} alt={article.title[locale]} fill style={{ objectFit: 'cover' }} />
            </div>

            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '18px', lineHeight: 1.8, color: '#1A1A1A' }}>
              {article.content[locale].split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: '0 0 24px' }}>{para}</p>
              ))}
            </div>

            {/* Back link */}
            <Link href={`/${locale}/noticias`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: '#CC0000', fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              fontWeight: 600, textDecoration: 'none', marginTop: '16px'
            }}>
              ← {locale === 'es' ? 'Volver a Noticias' : 'Back to News'}
            </Link>
          </article>

          {/* Sidebar */}
          <aside>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700,
              color: '#CC0000', letterSpacing: '2px', textTransform: 'uppercase',
              borderBottom: '2px solid #CC0000', paddingBottom: '8px', marginBottom: '0'
            }}>
              {t('article.relatedNews')}
            </h3>
            {related.map(a => <ArticleCard key={a.id} article={a} size="small" />)}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
