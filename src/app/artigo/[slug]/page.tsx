import { db } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 10;

function formatArticleContent(content: string, articleTitle: string): string {
  // 1. Processar tags <img> para garantir alt descritivo
  const imgTagRegex = /<img([^>]*)\/?>/gi;
  let processedContent = content.replace(imgTagRegex, (fullTag, attributes) => {
    if (/alt\s*=\s*["'][^"']+["']/i.test(attributes)) {
      return fullTag;
    }

    const tagIndex = content.indexOf(fullTag);
    const contentAfterImg = tagIndex !== -1 ? content.substring(tagIndex + fullTag.length) : '';
    const legendRegex = /^(?:\s*|<br\s*\/?>)*(?:<p[^>]*style="[^"]*font-size:\s*0\.8rem[^"]*"[^>]*>|<p[^>]*style="[^"]*color:\s*var\(--muted\)[^"]*"[^>]*>|<p[^>]*class="[^"]*legend[^"]*"[^>]*>)([\s\S]*?)<\/p>/i;
    const legendMatch = contentAfterImg.match(legendRegex);
    let altText = '';

    if (legendMatch && legendMatch[1]) {
      let rawLegend = legendMatch[1].replace(/<[^>]+>/g, ' ').trim();
      rawLegend = rawLegend
        .replace(/\(\s*(?:crédito|foto|imagem|fonte)\s*:[^)]*\)/gi, '')
        .replace(/crédito\s*:[^.|)]*/gi, '')
        .trim();
        
      if (rawLegend.length > 3) {
        altText = rawLegend;
      }
    }

    if (!altText) {
      altText = `Ilustração representativa do artigo: ${articleTitle}`;
    }

    altText = altText.replace(/"/g, '&quot;').replace(/\s+/g, ' ').trim();
    const cleanAttributes = attributes.replace(/alt\s*=\s*["']\s*["']/gi, '').trim();

    return `<img ${cleanAttributes} alt="${altText}" />`;
  });

  // 2. Processar links externos em <a> para abrir em nova aba com segurança
  const aTagRegex = /<a\s+([^>]*href=["'](https?:\/\/[^"']+)["'][^>]*)>/gi;
  processedContent = processedContent.replace(aTagRegex, (fullTag, attributes, url) => {
    // Se o link for externo (não do próprio futuroagora.tech)
    if (!url.includes('futuroagora.tech')) {
      let updatedAttributes = attributes;
      if (!/target\s*=\s*["']_blank["']/i.test(updatedAttributes)) {
        updatedAttributes += ' target="_blank"';
      }
      if (!/rel\s*=\s*["'][^"']*noopener[^"']*["']/i.test(updatedAttributes)) {
        updatedAttributes += ' rel="noopener noreferrer"';
      }
      return `<a ${updatedAttributes}>`;
    }
    return fullTag;
  });

  return processedContent;
}

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
  const url = `https://www.futuroagora.tech/artigo/${article.slug}`;
  const imageUrl = article.imageUrl || 'https://www.futuroagora.tech/favicon-32x32.png';

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

interface AuthorProfile {
  name: string;
  avatarUrl?: string;
  bio?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  aboutUrl?: string;
}

const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  "Douglas Marques": {
    name: "Douglas Marques",
    avatarUrl: "", // Preparado para preenchimento de URL de foto posterior pelo administrador
    bio: "Jornalista de tecnologia e editor do FuturoAgora.tech. Especializado em traduzir os impactos da inteligência artificial, avanços em física e ciência espacial de forma simples e acessível para o público brasileiro.",
    socials: {
      twitter: "https://x.com/DouglasMarkes1",
      instagram: "https://www.instagram.com/futuroagora.tech",
    },
    aboutUrl: "/sobre-nos"
  }
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await db.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  const authorName = article.authorName || 'Douglas Marques';
  const author = AUTHOR_PROFILES[authorName] || {
    name: authorName,
    bio: "Editor e colaborador do portal FuturoAgora.tech.",
    socials: {},
    aboutUrl: "/sobre-nos"
  };

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
  const articleUrl = `https://www.futuroagora.tech/artigo/${article.slug}`;
  const categoryUrl = `https://www.futuroagora.tech/?cat=${encodeURIComponent(article.category)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt || article.metaDescription || '',
    'image': article.imageUrl ? [article.imageUrl] : ['https://www.futuroagora.tech/favicon-32x32.png'],
    'datePublished': article.createdAt.toISOString(),
    'dateModified': article.updatedAt.toISOString(),
    'author': {
      '@type': 'Person',
      'name': article.authorName || 'Douglas Marques',
      'url': 'https://www.futuroagora.tech/sobre-nos',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'FuturoAgora.tech',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.futuroagora.tech/favicon-32x32.png',
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl,
    }
  };

  // BreadcrumbList JSON-LD: Home → Categoria → Artigo
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.futuroagora.tech/',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': article.category,
        'item': categoryUrl,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': article.title,
        'item': articleUrl,
      },
    ],
  };

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      {/* Script JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div style={{ marginBottom: '25px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--muted)', flexWrap: 'wrap', letterSpacing: '0.5px' }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
        <span style={{ color: 'var(--red)' }}>/</span>
        <Link href={`/?cat=${article.category}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{article.category}</Link>
        <span style={{ color: 'var(--red)' }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Artigo</span>
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
            dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content.replace(/\n/g, '<br />'), article.title) }}
          />

          {/* Bloco de Autoria / EEAT (Estrutura técnica preparada) */}
          {author && (
            <div style={{ marginTop: '40px', padding: '24px', borderTop: '1px solid var(--border)', background: 'var(--warm)', borderRadius: '4px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              {author.avatarUrl ? (
                <img 
                  src={author.avatarUrl} 
                  alt={author.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff', flexShrink: 0 }}>
                  ✍️
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                  {author.name}
                </h4>
                <p style={{ margin: '6px 0 10px 0', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.5', fontFamily: 'var(--font-lora)', fontStyle: 'italic' }}>
                  {author.bio}
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {author.aboutUrl && (
                    <Link href={author.aboutUrl} style={{ color: 'var(--red)', textDecoration: 'none' }}>
                      Sobre o Autor
                    </Link>
                  )}
                  {author.socials?.twitter && (
                    <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                      Twitter / X
                    </a>
                  )}
                  {author.socials?.instagram && (
                    <a href={author.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)' }}>
          <div className="widget" style={{ padding: '20px', background: 'var(--warm)' }}>
            <h4 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', marginBottom: '10px' }}>Dados do Artigo</h4>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>✍️ Autor: {article.authorName || 'Douglas Marques'}</div>
              <div>📅 Publicado em: {new Date(article.createdAt).toLocaleDateString('pt-BR')}</div>
              {new Date(article.updatedAt).getTime() - new Date(article.createdAt).getTime() > 1000 * 60 * 60 && (
                <div>🔄 Atualizado em: {new Date(article.updatedAt).toLocaleDateString('pt-BR')}</div>
              )}
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
