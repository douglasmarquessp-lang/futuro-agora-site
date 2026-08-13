import { db } from '../../lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';

// Configuração de metadados para noindex/nofollow na rota admin
export const metadata = {
  title: 'Painel Administrativo — Restrito',
  robots: {
    index: false,
    follow: false,
  },
};

// Função auxiliar para verificar sessão segura
async function verifySession() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  return !!adminPassword && session === adminPassword;
}

// Ação de login administrativo
async function loginAction(formData: FormData) {
  'use server';
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) return;

  if (password === adminPassword) {
    const cookieStore = cookies();
    cookieStore.set('admin_session', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 2, // Expira em 2 horas
    });
  }

  revalidatePath('/admin');
  redirect('/admin');
}

// Ação de logout administrativo
async function logoutAction() {
  'use server';
  const cookieStore = cookies();
  cookieStore.delete('admin_session');
  revalidatePath('/admin');
  redirect('/admin');
}

// Salvar artigo (Criar ou Atualizar) com os novos campos
async function saveArticleAction(formData: FormData) {
  'use server';

  if (!(await verifySession())) {
    throw new Error('Não autorizado');
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const emoji = formData.get('emoji') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const authorName = formData.get('authorName') as string;
  const metaDescription = formData.get('metaDescription') as string;
  const readTime = formData.get('readTime') as string;
  const isFeatured = formData.get('isFeatured') === 'on';
  const isTrending = formData.get('isTrending') === 'on';
  const published = formData.get('published') === 'on'; // True se marcado, False se desmarcado (Rascunho)

  if (!title || !slug) return;

  const articleData = {
    title,
    slug,
    excerpt,
    content,
    category,
    emoji,
    imageUrl: imageUrl || null,
    authorName: authorName || "Douglas Marques",
    metaDescription: metaDescription || null,
    published,
    readTime,
    isFeatured,
    isTrending,
  };

  if (id) {
    await db.article.update({
      where: { id },
      data: articleData,
    });
  } else {
    await db.article.create({
      data: articleData,
    });
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

// Excluir artigo
async function deleteArticleAction(formData: FormData) {
  'use server';

  if (!(await verifySession())) {
    throw new Error('Não autorizado');
  }

  const id = formData.get('id') as string;
  if (!id) return;

  await db.article.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export default async function AdminPage({ searchParams }: any) {
  const isAuthorized = await verifySession();

  if (!isAuthorized) {
    return (
      <div className="page" style={{ marginTop: '50px', maxWidth: '450px', margin: '100px auto', background: '#fff', padding: '40px', border: '2.5px solid var(--ink)', borderRadius: '6px' }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>Restrito ⚡</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '25px', fontWeight: 600 }}>Área de administração segura do Futuro Agora.</p>
        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Senha de Acesso</label>
            <input type="password" name="password" className="form-input" placeholder="Digite a chave mestre" required />
          </div>
          <button type="submit" className="admin-btn" style={{ width: '100%', marginTop: '10px' }}>Entrar no Painel</button>
        </form>
      </div>
    );
  }

  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const editId = searchParams?.id;
  let editArticle = null;
  
  if (editId) {
    editArticle = await db.article.findUnique({
      where: { id: editId },
    });
  }

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', gap: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', margin: 0 }}>
          {editArticle ? 'Modo de Edição' : 'Painel Administrativo'}
        </h1>
        <form action={logoutAction} style={{ margin: 0 }}>
          <button type="submit" className="admin-btn" style={{ background: 'var(--muted)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>
            Sair (Logout) 🚪
          </button>
        </form>
      </div>

      <div className="two-col">
        {/* Formulário com novos campos */}
        <div className="col-main" style={{ padding: '30px', background: '#fff' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '20px' }}>
            {editArticle ? `Editando: ${editArticle.title}` : 'Novo Artigo'}
          </h2>
          
          <form action={saveArticleAction}>
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
              <label>Autor do Artigo</label>
              <input type="text" name="authorName" className="form-input" placeholder="ex: Douglas Marques" defaultValue={editArticle?.authorName || 'Douglas Marques'} />
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
              <label>Meta Descrição para o Google (SEO)</label>
              <input type="text" name="metaDescription" className="form-input" placeholder="Resumo de até 160 caracteres para o Google" defaultValue={editArticle?.metaDescription || ''} />
            </div>

            <div className="form-group">
              <label>Resumo / Excerpt (Exibido no site)</label>
              <input type="text" name="excerpt" className="form-input" defaultValue={editArticle?.excerpt || ''} required />
            </div>

            <div className="form-group">
              <label>Conteúdo Principal</label>
              <textarea name="content" className="form-input" rows={10} defaultValue={editArticle?.content || ''} required></textarea>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label className="form-checkbox">
                <input type="checkbox" name="published" defaultChecked={editArticle ? !!editArticle.published : true} /> Publicar Artigo Oficialmente (Se desmarcar, vira Rascunho)
              </label>
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

        {/* Listagem com exibição de Visualizações (Views) e Status de Rascunho */}
        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '15px' }}>Artigos Ativos ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {articles.map((art) => (
              <div key={art.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--red)' }}>{art.category}</span>
                  
                  {/* Etiqueta de status: Rascunho ou Publicado */}
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', padding: '2px 6px', borderRadius: '2px', background: art.published ? 'rgba(0,184,122,0.1)' : 'rgba(114,112,138,0.1)', color: art.published ? 'var(--green)' : 'var(--muted)' }}>
                    {art.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0 2px 0' }}>{art.title}</p>
                
                {/* Exibição das Visualizações em tempo real */}
                <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '8px' }}>
                  👁️ {art.views} visualizações · 📤 {art.shares} compartilhamentos
                </p>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link href={`/admin?id=${art.id}`} className="admin-btn" style={{ background: 'var(--cyan)', color: 'var(--ink)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textDecoration: 'none' }}>
                    Editar
                  </Link>

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
