import { db } from '../../lib/db';
import Link from 'next/link';

export const revalidate = 10;

export default async function NoticiasPage() {
  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', marginTop: '20px', marginBottom: '20px', borderBottom: '2.5px solid var(--ink)', paddingBottom: '10px' }}>
        Todas as Notícias ({articles.length})
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {articles.map((art) => (
          <Link key={art.id} href={`/artigo/${art.slug}`} className="art-row" style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '4px' }}>
            {art.imageUrl ? (
              <div 
                className="art-thumb" 
                style={{ 
                  width: '86px', 
                  height: '64px', 
                  borderRadius: '4px', 
                  backgroundImage: `url(${art.imageUrl})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  flexShrink: 0 
                }}
              />
            ) : (
              <div className="art-thumb th2">{art.emoji}</div>
            )}
            
            <div className="art-info">
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>{art.category}</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '2px 0' }}>{art.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                {new Date(art.createdAt).toLocaleDateString('pt-BR')} · {art.readTime} · 👁 {art.views} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
