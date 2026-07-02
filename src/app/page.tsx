import { db } from '../lib/db';
import Link from 'next/link';

export const revalidate = 10;

export default async function HomePage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const featured = articles.find((a) => a.isFeatured) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== featured?.id).slice(0, 3);
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 5);
  const remainingArticles = articles.filter((a) => a.id !== featured?.id && !sideArticles.some((s) => s.id === a.id));

  return (
    <div className="page">
      <div className="sec-head">
        <div className="sec-line"></div>
        <div style={{ fontSize: '.66rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          Destaques do dia
        </div>
        <div className="sec-line"></div>
      </div>

      <div className="hero-grid">
        {featured ? (
          <Link href={`/artigo/${featured.slug}`} className="hero-main">
            {/* Bloco de Imagem com suporte a foto de capa */}
            {featured.imageUrl ? (
              <div className="hero-img" style={{ backgroundImage: `url(${featured.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-tag"><span className="live-pulse"></span>Destaque</div>
              </div>
            ) : (
              <div className="hero-img">
                <span className="big-emoji">{featured.emoji}</span>
                <div className="hero-tag"><span className="live-pulse"></span>Destaque</div>
              </div>
            )}
            
            <div className="hero-body">
              <div className="hero-cat" style={{ color: 'var(--cyan)' }}>⚡ {featured.category}</div>
              <h1 className="hero-title" style={{ fontFamily: 'var(--font-bebas)' }}>{featured.title}</h1>
              <p className="hero-excerpt" style={{ fontFamily: 'var(--font-lora)' }}>{featured.excerpt}</p>
              <div className="hero-meta">
                <span>{new Date(featured.createdAt).toLocaleDateString('pt-BR')}</span>
                <div className="dot"></div>
                <span>{featured.readTime}</span>
                <div className="dot"></div>
                <span>👁 {featured.views} views</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="hero-main" style={{ padding: '40px', color: '#fff', background: '
