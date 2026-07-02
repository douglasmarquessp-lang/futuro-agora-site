import { db } from '../../lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Ação unificada para salvar (Criar ou Atualizar) artigos
async function saveArticleAction(formData: FormData) {
  'use server';

  const id = formData.get('id') as string; // Campo oculto para controle
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const emoji = formData.get('emoji') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const readTime = formData.get('readTime') as string;
  const isFeatured = formData.get('isFeatured') === 'on';
  const isTrending = formData.get('isTrending') === 'on';

  if (!title || !slug) return;

  const articleData = {
    title,
    slug,
    excerpt,
    content,
    category,
    emoji,
    imageUrl: imageUrl || null,
    readTime,
    isFeatured,
    isTrending,
  };

  if (id) {
    // Modo Edição: Atualiza os dados existentes
    await db.article.update({
      where: { id },
      data: articleData,
    });
  } else {
    // Modo Criação: Cria um novo registro
    await db.article.create({
      data: articleData,
    });
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin'); // Limpa o ID da URL e redefine o formulário
}

// Ação para excluir artigos
async function deleteArticleAction(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;
  if (!id) return;

  await db.article.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

interface AdminPageProps {
  searchParams: { id?: string };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Verifica se há uma solicitação de edição ativa vinda da URL
  const editId = searchParams.id;
  let editArticle = null;
  
  if (editId) {
    editArticle = await db.article.findUnique({
      where: { id: editId },
    });
  }

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginBottom: '20px' }}>
        {editArticle ? 'Modo de Edição' : 'Painel Administrativo'}
      </h1>

      <div className="two-col">
        {/* Formulário Dinâmico */}
        <div className="col-main" style={{ padding: '30px', background: '#fff' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '20px' }}>
            {editArticle ? `Editando: ${editArticle.title}` : 'Novo Artigo'}
          </h2>
          
          <form action={saveArticleAction}>
            {/* Campo oculto com ID do artigo sendo editado */}
            <input type="hidden" name="id" value={editArticle?.id || ''} />

            <div className="form-group">
              <label>Título do Artigo</label>
              <input type="text" name="title" className="form-input" defaultValue={editArticle?.title || ''} required />
            </div>

            <div className="form-group">
              <label>Slug (URL amigável)</label>
              <input type="text" name="slug" className="form-input" placeholder="ex: google-lanca-ia" defaultValue={editArticle?.slug || ''} required />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <input type="text" name="category" className="form-input" placeholder="ex: Inteligência Artificial" defaultValue={editArticle?.category || ''} required />
            </div>

            <div className="form-group">
              <label>Emoji de Identificação</label>
              <input type="text" name="emoji" className="form-input" placeholder="ex: 🤖" defaultValue={editArticle?.emoji || '⚡'} required />
            </div>

            <div className="form-group">
              <label>Link da Imagem de Capa (URL)</label>
              <input type="text" name="imageUrl" className="form-input" placeholder="ex: https://site.com/foto.jpg" defaultValue={editArticle?.imageUrl || ''} />
            </div>

            <div className="form-group">
              <label>Tempo de Leitura</label>
              <input type="text" name="readTime" className="form-input" placeholder="ex: 4 min" defaultValue={editArticle?.readTime || '3 min'} required />
            </div>

            <div className="form-group">
              <label>Resumo / Excerpt</label>
              <input type="text" name="excerpt" className="form-input" defaultValue={editArticle?.excerpt || ''} required />
            </div>

            <div className="form-group">
              <label>Conteúdo Principal</label>
              <textarea name="content" className="form-input" rows={10} defaultValue={editArticle?.content || ''} required></textarea>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
              <label className="form-checkbox">
                <input type="checkbox" name="isFeatured" defaultChecked={!!editArticle?.isFeatured} /> Artigo em Destaque (Principal)
              </label>
              <label className="form-checkbox">
                <input type="checkbox" name="isTrending" defaultChecked={!!editArticle?.isTrending} /> Incluir em Trending
              </label>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button type="submit" className="admin-btn">
                {editArticle ? 'Salvar Alterações ⚡' : 'Publicar Artigo ⚡'}
              </button>
              
              {editArticle && (
                <Link href="/admin" className="admin-btn" style={{ background: '#72728a', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Cancelar Edição
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Listagem de artigos com opções de exclusão e edição */}
        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '15px' }}>Artigos Ativos ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {articles.map((art) => (
              <div key={art.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>{art.category}</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0 6px 0' }}>{art.title}</p>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Botão de Editar (Carrega dados na URL) */}
                  <Link href={`/admin?id=${art.id}`} className="admin-btn" style={{ background: 'var(--cyan)', color: 'var(--ink)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textDecoration: 'none' }}>
                    Editar
                  </Link>

                  {/* Formulário de Excluir */}
                  <form action={deleteArticleAction} style={{ margin: '0' }}>
                    <input type="hidden" name="id" value={art.id} />
                    <button type="submit" style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}>
                      Excluir
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
