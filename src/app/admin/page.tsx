import { db } from '../../lib/db';
import { revalidatePath } from 'next/cache';

async function createArticleAction(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const emoji = formData.get('emoji') as string;
  const readTime = formData.get('readTime') as string;
  const isFeatured = formData.get('isFeatured') === 'on';
  const isTrending = formData.get('isTrending') === 'on';

  if (!title || !slug) return;

  await db.article.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      emoji,
      readTime,
      isFeatured,
      isTrending,
    },
  });

  revalidatePath('/');
}

export default async function AdminPage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginBottom: '20px' }}>Painel Administrativo</h1>

      <div className="two-col">
        <div className="col-main" style={{ padding: '30px', background: '#fff' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '20px' }}>Novo Artigo</h2>
          <form action={createArticleAction}>
            <div className="form-group">
              <label>Título do Artigo</label>
              <input type="text" name="title" className="form-input" required />
            </div>

            <div className="form-group">
              <label>Slug (URL amigável)</label>
              <input type="text" name="slug" className="form-input" placeholder="ex: google-lanca-ia" required />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <input type="text" name="category" className="form-input" placeholder="ex: Inteligência Artificial" required />
            </div>

            <div className="form-group">
              <label>Emoji de Identificação</label>
              <input type="text" name="emoji" className="form-input" placeholder="ex: 🤖" defaultValue="⚡" required />
            </div>

            <div className="form-group">
              <label>Tempo de Leitura</label>
              <input type="text" name="readTime" className="form-input" placeholder="ex: 4 min" defaultValue="3 min" required />
            </div>

            <div className="form-group">
              <label>Resumo / Excerpt</label>
              <input type="text" name="excerpt" className="form-input" required />
            </div>

            <div className="form-group">
              <label>Conteúdo Principal</label>
              <textarea name="content" className="form-input" rows={10} required></textarea>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
              <label className="form-checkbox">
                <input type="checkbox" name="isFeatured" /> Artigo em Destaque (Principal)
              </label>
              <label className="form-checkbox">
                <input type="checkbox" name="isTrending" /> Incluir em Trending
              </label>
            </div>

            <button type="submit" className="admin-btn">Publicar Artigo ⚡</button>
          </form>
        </div>

        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '15px' }}>Artigos Ativos ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {articles.map((art) => (
              <div key={art.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>{art.category}</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0' }}>{art.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
