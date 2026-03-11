import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Article {
  id: string;
  slug: string;
  category: string;
  title_es: string;
  title_en: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  author: string;
  image: string;
  source_url?: string;
  source_name?: string;
  read_time: number;
  featured: boolean;
  published: boolean;
  created_at: string;
}

// Adaptar formato Supabase al formato usado en componentes
export function adaptArticle(a: Article) {
  return {
    id: a.id,
    slug: a.slug,
    category: a.category,
    title: { es: a.title_es, en: a.title_en },
    excerpt: { es: a.excerpt_es, en: a.excerpt_en },
    content: { es: a.content_es, en: a.content_en },
    author: a.author,
    date: a.created_at.split('T')[0],
    readTime: a.read_time,
    image: a.image,
    featured: a.featured,
  };
}

export async function getArticles(options?: { category?: string; limit?: number; featured?: boolean }) {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (options?.category) query = query.eq('category', options.category);
  if (options?.featured) query = query.eq('featured', options.featured);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(adaptArticle);
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) return null;
  return adaptArticle(data);
}
