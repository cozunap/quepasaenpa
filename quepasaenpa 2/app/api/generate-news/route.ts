import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client con service role para escribir
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Fuentes RSS de noticias de Pennsylvania
const PA_RSS_FEEDS = [
  'https://www.inquirer.com/arcio/rss/',
  'https://www.pennlive.com/arc/outboundfeeds/rss/?outputType=xml',
  'https://triblive.com/feed/',
  'https://www.mcall.com/arcio/rss/',
];

// Categorías por palabras clave
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  politics: ['governor', 'senate', 'congress', 'election', 'policy', 'law', 'budget', 'gobernador', 'senado', 'ley', 'presupuesto'],
  sports: ['eagles', 'phillies', 'sixers', 'flyers', 'steelers', 'pirates', 'penn state', 'nfl', 'nba', 'mlb', 'nhl'],
  culture: ['museum', 'art', 'festival', 'music', 'theater', 'film', 'culture', 'museo', 'arte', 'festival', 'música'],
  business: ['economy', 'business', 'startup', 'company', 'jobs', 'employment', 'negocio', 'empresa', 'empleo'],
  education: ['school', 'university', 'college', 'students', 'education', 'escuela', 'universidad', 'estudiantes'],
  city: ['philadelphia', 'pittsburgh', 'allentown', 'reading', 'lancaster', 'traffic', 'infrastructure', 'city'],
  latino: ['latino', 'hispanic', 'spanish', 'immigration', 'community', 'hispano', 'inmigración', 'comunidad'],
};

// Imágenes por categoría (Unsplash)
const CATEGORY_IMAGES: Record<string, string[]> = {
  politics: [
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  ],
  culture: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
  ],
  business: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
  ],
  education: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  ],
  city: [
    'https://images.unsplash.com/photo-1581262177000-8139a463e531?w=800&q=80',
    'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80',
  ],
  latino: [
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
  ],
};

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) return category;
  }
  return 'city';
}

function getRandomImage(category: string): string {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.city;
  return images[Math.floor(Math.random() * images.length)];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

async function fetchRSSFeed(url: string): Promise<{ title: string; description: string; link: string }[]> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'QuePasaEnPA/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    const xml = await res.text();

    const items: { title: string; description: string; link: string }[] = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const content = match[1];
      const title = content.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() || '';
      const description = content.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/)?.[1]?.trim() || '';
      const link = content.match(/<link>(.*?)<\/link>/)?.[1]?.trim() || '';

      if (title && title.toLowerCase().includes('pennsylvania') ||
          title.toLowerCase().includes('philadelphia') ||
          title.toLowerCase().includes('pittsburgh')) {
        items.push({ title, description, link });
      } else if (title) {
        items.push({ title, description, link });
      }
    }

    return items.slice(0, 5);
  } catch {
    return [];
  }
}

async function generateArticleWithGroq(title: string, description: string, sourceUrl: string): Promise<{
  title_es: string; title_en: string;
  excerpt_es: string; excerpt_en: string;
  content_es: string; content_en: string;
} | null> {
  try {
    const prompt = `Eres un periodista profesional bilingüe para la revista "Que Pasa en PA" sobre noticias de Pennsylvania.

Basándote en esta noticia:
TÍTULO: ${title}
DESCRIPCIÓN: ${description}

Genera un artículo periodístico completo en formato JSON con esta estructura exacta:
{
  "title_es": "Título en español (máx 80 caracteres)",
  "title_en": "Title in English (max 80 characters)",
  "excerpt_es": "Resumen en español de 1-2 oraciones (máx 150 caracteres)",
  "excerpt_en": "Summary in English 1-2 sentences (max 150 characters)",
  "content_es": "Artículo completo en español de 3-4 párrafos, profesional y periodístico",
  "content_en": "Full article in English, 3-4 paragraphs, professional journalism style"
}

IMPORTANTE: Responde ÚNICAMENTE con el JSON, sin markdown, sin explicaciones.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Groq error:', err);
    return null;
  }
}

// Verifica que el cron sea legítimo
function isValidCronRequest(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(request: Request) {
  // Seguridad: solo Vercel Cron puede ejecutar esto
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('🗞️ Iniciando generación automática de noticias...');

  let totalGenerated = 0;
  const errors: string[] = [];

  for (const feedUrl of PA_RSS_FEEDS) {
    try {
      const items = await fetchRSSFeed(feedUrl);
      console.log(`📡 ${feedUrl}: ${items.length} noticias encontradas`);

      for (const item of items.slice(0, 2)) { // Max 2 por fuente
        if (!item.title) continue;

        // Verificar si ya existe
        const slug = slugify(item.title);
        const { data: existing } = await supabase
          .from('articles')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existing) {
          console.log(`⏭️ Ya existe: ${slug}`);
          continue;
        }

        // Generar con Groq
        const generated = await generateArticleWithGroq(item.title, item.description, item.link);
        if (!generated) continue;

        const category = detectCategory(item.title + ' ' + item.description);
        const image = getRandomImage(category);

        // Guardar en Supabase
        const { error } = await supabase.from('articles').insert({
          slug,
          category,
          title_es: generated.title_es,
          title_en: generated.title_en,
          excerpt_es: generated.excerpt_es,
          excerpt_en: generated.excerpt_en,
          content_es: generated.content_es,
          content_en: generated.content_en,
          image,
          source_url: item.link,
          source_name: new URL(feedUrl).hostname,
          author: 'Redacción QP-PA',
          read_time: 3,
          featured: false,
          published: true,
        });

        if (error) {
          errors.push(`Error guardando ${slug}: ${error.message}`);
        } else {
          totalGenerated++;
          console.log(`✅ Publicado: ${generated.title_es}`);
        }

        // Pausa para no saturar la API
        await new Promise(r => setTimeout(r, 1000));
      }
    } catch (err) {
      errors.push(`Error en feed ${feedUrl}: ${err}`);
    }
  }

  return NextResponse.json({
    success: true,
    generated: totalGenerated,
    errors,
    timestamp: new Date().toISOString(),
  });
}
