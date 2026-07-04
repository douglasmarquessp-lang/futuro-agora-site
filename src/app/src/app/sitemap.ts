import { db } from '../lib/db';

export const revalidate = 60; // Atualiza o sitemap no cache a cada 60 segundos

export default async function sitemap() {
  const baseUrl = 'https://futuroagora.tech';

  // Busca todos os artigos publicados do banco de dados para incluir no sitemap do Google
  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  // Mapeia os links das matérias
  const articleUrls = articles.map((art) => ({
    url: `${baseUrl}/artigo/${art.slug}`,
    lastModified: new Date(art.updatedAt),
  }));

  // Retorna a estrutura oficial de sitemap XML exigida pelo Google
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sobre-nos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/lgpd`,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}
