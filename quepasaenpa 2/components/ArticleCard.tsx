'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface Article {
  id: string;
  slug: string;
  category: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  politics: '#CC0000',
  sports: '#002868',
  culture: '#8B5E3C',
  city: '#2D6A4F',
  business: '#1B4332',
  education: '#5C4A8F',
  latino: '#C77DFF',
};

export default function ArticleCard({ article, size = 'normal' }: { article: Article; size?: 'large' | 'normal' | 'small' }) {
  const t = useTranslations();
  const locale = useLocale() as 'es' | 'en';
  const catColor = categoryColors[article.category] || '#CC0000';
  const catLabel = t(`categories.${article.category}`);

  if (size === 'large') {
    return (
      <Link href={`/${locale}/noticias/${article.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', height: '500px', overflow: 'hidden', borderRadius: '4px' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src={article.image} alt={article.title[locale]} fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)')}
            onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
            <span style={{ backgroundColor: catColor, color: 'white', padding: '4px 12px', borderRadius: '2px', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {catLabel}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'white', margin: '12px 0 8px', lineHeight: 1.2 }}>
              {article.title[locale]}
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', serif", color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: '0 0 12px', lineHeight: 1.5 }}>
              {article.excerpt[locale]}
            </p>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>
              {t('article.by')} {article.author} · {article.readTime} {t('article.minRead')}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={`/${locale}/noticias/${article.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: '12px', padding: '16px 0', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ position: 'relative', width: '90px', height: '68px', flexShrink: 0, borderRadius: '3px', overflow: 'hidden' }}>
          <Image src={article.image} alt={article.title[locale]} fill style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <span style={{ backgroundColor: catColor, color: 'white', padding: '2px 8px', borderRadius: '2px', fontSize: '10px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {catLabel}
          </span>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '6px 0 4px', lineHeight: 1.3 }}>
            {article.title[locale]}
          </h3>
          <span style={{ color: '#999', fontFamily: "'DM Sans', sans-serif", fontSize: '11px' }}>
            {article.readTime} {t('article.minRead')}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${locale}/noticias/${article.slug}`} style={{ textDecoration: 'none', display: 'block', backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.08)'; }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <Image src={article.image} alt={article.title[locale]} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} />
      </div>
      <div style={{ padding: '20px' }}>
        <span style={{ backgroundColor: catColor, color: 'white', padding: '3px 10px', borderRadius: '2px', fontSize: '10px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {catLabel}
        </span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#1A1A1A', margin: '10px 0 8px', lineHeight: 1.3 }}>
          {article.title[locale]}
        </h3>
        <p style={{ fontFamily: "'Source Serif 4', serif", color: '#555', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px' }}>
          {article.excerpt[locale]}
        </p>
        <span style={{ color: '#999', fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>
          {t('article.by')} {article.author} · {article.readTime} {t('article.minRead')}
        </span>
      </div>
    </Link>
  );
}
