'use client';
import { useTranslations } from 'next-intl';

const breakingNews = {
  es: [
    'Gobernador Shapiro presenta presupuesto histórico de $48 mil millones',
    'Eagles confirman nuevas incorporaciones para la temporada 2026',
    'Festival Latino de Philadelphia anuncia artistas internacionales',
    '76ers aseguran clasificación a playoffs de la NBA',
    'Pittsburgh aprueba expansión del metro por $2 mil millones',
  ],
  en: [
    'Governor Shapiro presents historic $48 billion budget',
    'Eagles confirm new additions for the 2026 season',
    'Philadelphia Latino Festival announces international artists',
    '76ers secure NBA playoff qualification',
    'Pittsburgh approves $2 billion metro expansion',
  ],
};

export default function BreakingNews({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const news = breakingNews[locale as 'es' | 'en'] || breakingNews.es;
  const ticker = [...news, ...news].join('   •   ');

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      borderBottom: '2px solid #CC0000',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: '40px'
    }}>
      <div style={{
        backgroundColor: '#CC0000',
        padding: '0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        zIndex: 1
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          {t('breaking')}
        </span>
      </div>

      <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'ticker 40s linear infinite',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#fff',
          paddingLeft: '100%',
        }}>
          {ticker}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
