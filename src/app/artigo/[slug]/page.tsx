import { db } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 10;

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await db.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  await db.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  const recent = await db.article.findMany({
    where: { NOT: { id: article.id }, published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
          ← Voltar para a Home
        </Link>
      </div>

      <div className="two-col">
        <div className="col-main" style={{ padding: '30px', background: '#fff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {article.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', lineHeight: '1.1', marginTop: '10px', marginBottom: '15px' }}>
            {article.title}
          </h1>
          
          {/* Exibição do Autor, Data e Tempo de Leitura Otimizados */}
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>Por {article.authorName || 'Douglas Marques'}</span>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--red)' }}></div>
            <span>{new Date(article.createdAt).toLocaleDateString('pt-BR')}</span>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--red)' }}></div>
            <span>{article.readTime}</span>
          </div>

          <p style={{ fontFamily: 'var(--font-lora)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '30px', borderLeft: '3px solid var(--red)', paddingLeft: '15px' }}>
            {article.excerpt}
          </p>

          <div
            style={{ fontFamily: 'var(--font-lora)', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--ink)' }}
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
        </div>

        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)' }}>
          <div className="widget" style={{ padding: '20px', background: 'var(--warm)' }}>
            <h4 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', marginBottom: '10px' }}>Dados do Artigo</h4>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>✍️ Autor: {article.authorName || 'Douglas Marques'}</div>
              <div>📅 Publicado em: {new Date(article.createdAt).toLocaleDateString('pt-BR')}</div>
              <div>👁️ Visualizações: {article.views + 1}</div>
              <div>⏱️ Tempo de leitura: {article.readTime}</div>
            </div>
          </div>

          <div className="widget">
            <div className="wid-head" style={{ fontFamily: 'var(--font-bebas)' }}>Artigos sugeridos</div>
            <div className="wid-body">
              {recent.map((rec) => (
                <Link href={`/artigo/${rec.slug}`} key={rec.id} style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>{rec.category}</span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0 0 0' }}>{rec.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
