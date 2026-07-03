import { db } from '../../lib/db';
import Link from 'next/link';

export default async function PesquisaPage({ searchParams }: any) {
  const query = searchParams?.q || '';
  
  let articles = [];
  if (query) {
    articles = await db.article.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    }).catch(() => []);
  }

  return (
    <div className="page" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '20px', marginBottom: '10px' }}>
        Buscar no Portal
      </h1>
      
      {/* Formulário de Busca Nativo do Next.js */}
      <form action="/pesquisa" method="GET" style={{ display: 'flex', gap: '10px', marginBottom: '30px', marginTop: '15px' }}>
        <input 
          type="text" 
          name="q" 
          placeholder="O que você está procurando?" 
          defaultValue={query}
          className="form-input"
          style={{ flex: 1 }}
          required
        />
        <button type="submit" className="admin-btn">Buscar 🔍</button>
      </form>

      {query && (
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
          Resultados para: <span style={{ color: 'var(--red)' }}>"{query}"</span> ({articles.length})
        </h3>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {articles.length > 0 ? (
          articles.map((art: any) => (
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
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>
                  {art.category}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '2px 0' }}>{art.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {new Date(art.createdAt).toLocaleDateString('pt-BR')} · {art.readTime}
                </p>
              </div>
            </Link>
          ))
        ) : query ? (
          <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Nenhum artigo encontrado para esta busca.</p>
        ) : (
          <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Digite um termo de pesquisa acima para começar.</p>
        )}
      </div>
    </div>
  );
}
