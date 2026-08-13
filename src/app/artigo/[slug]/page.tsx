import { db } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 10;

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Geração dinâmica de metadados para SEO, Open Graph e Twitter Cards
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await db.article.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!article) {
    return {
      title: 'Artigo Não Encontrado — FuturoAgora.tech',
    };
  }

  const title = `${article.title} — FuturoAgora.tech`;
  const description = article.metaDescription || article.excerpt || '';
  const url = `https://futuroagora.tech/artigo/${article.slug}`;
  const imageUrl = article.imageUrl || 'https://futuroagora.tech/favicon-32x32.png';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.authorName || 'Douglas Marques'],
      images: [
        {
          url: imageUrl,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await db.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  // Incrementa visualização de forma assíncrona e segura
  await db.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  const recent = await db.article.findMany({
    where: { NOT: { id: article.id }, published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  // Geração de dados estruturados JSON-LD do tipo NewsArticle com dados 100% reais do banco
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt || article.metaDescription || '',
    'image': article.imageUrl ? [article.imageUrl] : ['https://futuroagora.tech/favicon-32x32.png'],
    'datePublished': article.createdAt.toISOString(),
    'dateModified': article.updatedAt.toISOString(),
    'author': {
      '@type': 'Person',
      'name': article.authorName || 'Douglas Marques',
      'url': 'https://futuroagora.tech/sobre-nos',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'FuturoAgora.tech',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://futuroagora.tech/favicon-32x32.png',
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://futuroagora.tech/artigo/${article.slug}`,
    }
  };

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      {/* Script JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
