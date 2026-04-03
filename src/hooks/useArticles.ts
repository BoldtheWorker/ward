import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { staticInsights } from '../data/static-insights';

export interface Article {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  category: string;
  published_date: string;
  content: string;
  excerpt: string;
  image_url?: string;
}

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .neq('id', 'e809311b-cc89-49ed-9686-21820db07671') // Filter out problematic ghost record
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Merge local static insights with dynamic database results
        const dynamicArticles = data || [];
        const merged = [...staticInsights, ...dynamicArticles].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setArticles(merged);
      } catch (err: any) {
        setError(err.message);
        // Fallback to static insights on error
        setArticles(staticInsights);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        // First check static insights
        const staticMatch = staticInsights.find(a => a.slug === slug);
        if (staticMatch) {
          setArticle(staticMatch);
          setLoading(false);
          return;
        }

        // Otherwise check Supabase
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  return { article, loading, error };
};
