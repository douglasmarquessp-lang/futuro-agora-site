import { db } from '../lib/db';
import Link from 'next/link';

export const revalidate = 10;

export default async function HomePage({ searchParams }: any) {
  const selectedCategory = searchParams?.cat;

  // Busca os artigos. Se houver categoria selecionada na URL, filtra por ela.
  const articles = await db.article.findMany({
    where: { 
      published: true,
      ...(selectedCategory ? { category: { contains: selectedCategory, mode: 'insensitive' } } : {})
    },
    orderBy: { createdAt: 'desc' },
  });

  const featured = articles.find((a) => a.isFeatured) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== featured?.id).slice(0, 3);
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 5);
  const remainingArticles = articles.filter((a) => a.id !== featured?.id && !sideArticles.some((s) => s.id === a.id));

  return (
    <div className="page">
      {selectedCategory ? (
        /* VISUALIZAÇÃO DE FILTRO POR CATEGORIA (SUPER LIMPA E ESPETACULAR) */
        <div style={{ marginTop: '30px', marginBottom: '40px' }}>
          <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
            ← Ver todos os destaques (Home)
          </Link>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '15px', marginBottom: '25px' }}>
            Explorando: <span style={{ color: 'var(--red)' }}>{selectedCategory}</span> ({articles.length})
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {articles.length > 0 ? (
              articles.map((art) => (
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
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{new Date(art.createdAt).toLocaleDateString('pt-BR')} · {art.readTime} · 👁 {art.views}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Nenhum artigo publicado nesta categoria no momento.</p>
            )}
          </div>
        </div>
      ) : (
        /* VISUALIZAÇÃO PADRÃO DA HOMEPAGE COMPLETA (SEM FILTROS) */
        <>
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
              <div className="hero-main" style={{ padding: '40px', color: '#fff', background: 'var(--ink)' }}>
                Nenhum artigo publicado no momento. Visite o painel de administração para cadastrar novas notícias.
              </div>
            )}

            <div className="hero-side">
              {sideArticles.map((art, index) => (
                <Link key={art.id} href={`/artigo/${art.slug}`} className="side-item">
                  <div className="side-num" style={{ fontFamily: 'var(--font-bebas)' }}>{`0${index + 2}`}</div>
                  <div className="side-cat">{art.category}</div>
                  <div className="side-title">{art.title}</div>
                  <div className="side-meta">
                    <span>{new Date(art.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span className="read-badge">{art.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {trendingArticles.length > 0 && (
            <>
              <div className="sec-head">
                <div className="sec-title" style={{ fontFamily: 'var(--font-bebas)' }}>TRENDING AGORA</div>
                <div className="sec-line"></div>
              </div>
              <div className="trending-box">
                <div className="trending-hd">
                  <h2><span className="live-pulse"></span>Mais lidas agora</h2>
                </div>
                <div className="trending-row">
                  {trendingArticles.map((art, idx) => (
                    <Link key={art.id} href={`/artigo/${art.slug}`} className="t-card">
                      <div className="t-num" style={{ fontFamily: 'var(--font-bebas)' }}>{`0${idx + 1}`}</div>
                      <div className="t-cat">{art.category}</div>
                      <div className="t-title">{art.title}</div>
                      <div className="t-views">👁 {art.views} visualizações</div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="sec-head">
            <div className="sec-title" style={{ fontFamily: 'var(--font-bebas)' }}>ÚLTIMAS NOTÍCIAS</div>
            <div className="sec-line"></div>
          </div>

          <div className="two-col">
            <div className="col-main">
              <div className="col-head">Notícias Recentes <em>•</em></div>
              {remainingArticles.length > 0 ? (
                remainingArticles.map((art) => (
                  <Link key={art.id} href={`/artigo/${art.slug}`} className="art-row">
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
                      <div className="art-cat">{art.category}</div>
                      <div className="art-title">{art.title}</div>
                      <div className="art-meta">{new Date(art.createdAt).toLocaleDateString('pt-BR')} · {art.readTime} · 👁 {art.views}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: '24px', fontStyle: 'italic', color: 'var(--muted)' }}>
                  Nenhum outro artigo listado.
                </div>
              )}
            </div>

            <div className="col-side">
              <div className="widget">
                <div className="wid-nl">
                  <h3>📬 NEWSLETTER</h3>
                  <p>Receba as principais notícias de IA e tecnologia todo dia. Grátis.</p>
                  <input type="email" className="nl-in" placeholder="Seu melhor e-mail" />
                  <button className="nl-btn">Quero receber ⚡</button>
                </div>
              </div>

              <div className="widget">
                <div className="wid-head" style={{ fontFamily: 'var(--font-bebas)' }}>🔥 Mais compartilhadas</div>
                <div className="wid-body">
                  <div className="sh-item">
                    <div className="sh-num" style={{ fontFamily: 'var(--font-bebas)' }}>1</div>
                    <div>
                      <div className="sh-title">IA vai substituir sua profissão? Veja a lista completa</div>
                      <div className="sh-cnt">📤 4.2k compartilhamentos</div>
                    </div>
                  </div>
                  <div className="sh-item">
                    <div className="sh-num" style={{ fontFamily: 'var(--font-bebas)' }}>2</div>
                    <div>
                      <div className="sh-title">Computação quântica explicada para leigos</div>
                      <div className="sh-cnt">📤 3.8k compartilhamentos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
