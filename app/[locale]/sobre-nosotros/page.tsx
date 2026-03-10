import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <Header />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 900,
          color: '#1A1A1A', borderBottom: '4px solid #CC0000', paddingBottom: '20px', marginBottom: '32px'
        }}>
          {t('about')}
        </h1>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '18px', lineHeight: 1.8, color: '#333' }}>
          {locale === 'es' ? (
            <>
              <p>
                <strong>Que Pasa en PA</strong> es una revista digital bilingüe dedicada a cubrir las noticias más importantes del estado de Pennsylvania. Nuestra misión es informar a la comunidad latina y anglohablante con periodismo de calidad, imparcial y accesible.
              </p>
              <p>
                Fundada con el propósito de dar voz a las historias que importan en Pennsylvania — desde Philadelphia hasta Pittsburgh, pasando por Allentown, Reading, Lancaster y cada rincón del estado — somos un espacio donde la comunidad encuentra información relevante en su idioma.
              </p>
              <p>
                Cubrimos política, deportes, cultura, negocios, educación y noticias de la comunidad latina, con un equipo de periodistas comprometidos con la verdad y la excelencia editorial.
              </p>
              <p>
                <strong style={{ color: '#CC0000' }}>Hecho con ❤️ en Pennsylvania.</strong>
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Que Pasa en PA</strong> is a bilingual digital magazine dedicated to covering the most important news in the state of Pennsylvania. Our mission is to inform the Latino and English-speaking community with quality, impartial, and accessible journalism.
              </p>
              <p>
                Founded with the purpose of giving voice to the stories that matter in Pennsylvania — from Philadelphia to Pittsburgh, through Allentown, Reading, Lancaster and every corner of the state — we are a space where the community finds relevant information in their language.
              </p>
              <p>
                We cover politics, sports, culture, business, education, and Latino community news, with a team of journalists committed to truth and editorial excellence.
              </p>
              <p>
                <strong style={{ color: '#CC0000' }}>Made with ❤️ in Pennsylvania.</strong>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
