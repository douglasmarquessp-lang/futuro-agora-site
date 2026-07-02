import Link from 'next/link';

export default function AnuncieAquiPage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', marginTop: '20px', marginBottom: '10px' }}>
        Anuncie Conosco
      </h1>
      <p style={{ lineHeight: '1.6', fontSize: '1rem', color: 'var(--muted)', marginBottom: '30px' }}>
        Conecte sua marca, produto ou serviço à audiência mais qualificada do Brasil interessada em Inteligência Artificial, tecnologia, inovação e ciência do futuro.
      </p>
      
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--ink)' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Por que anunciar no FuturoAgora.tech?
        </h2>
        <p style={{ marginBottom: '15px' }}>
          O FuturoAgora.tech explica o amanhã em uma linguagem simples, direta e altamente didática para o público brasileiro. Nossa audiência é composta por profissionais de tecnologia, tomadores de decisão, empreendedores, desenvolvedores e entusiastas de inovação — pessoas que buscam ativamente novas ferramentas e soluções inteligentes para o dia a dia.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Ao anunciar conosco, sua marca é exibida em uma plataforma limpa, de altíssima velocidade de carregamento, livre de excesso de poluição visual e com foco absoluto na experiência de leitura de qualidade.
        </p>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Formatos de Parceria e Publicidade
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: 'var(--warm)', border: '2px solid var(--ink)', borderRadius: '4px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '5px' }}>📝 Publiposts (Artigos Patrocinados)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Publicação de artigos detalhados, análises de ferramentas, resenhas de produtos ou estudos de caso escritos em tom editorial nativo, integrando sua marca de forma orgânica e duradoura ao nosso acervo de leitura.
            </p>
          </div>

          <div style={{ padding: '15px', background: 'var(--warm)', border: '2px solid var(--ink)', borderRadius: '4px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '5px' }}>🖼️ Banners Publicitários Otimizados</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Espaços de alta visibilidade no topo do site (Header Banner) ou na barra lateral (Sidebar) do nosso portal, integrados de forma limpa ao design para garantir excelente taxa de cliques sem comprometer a navegação.
            </p>
          </div>

          <div style={{ padding: '15px', background: 'var(--warm)', border: '2px solid var(--ink)', borderRadius: '4px' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '5px' }}>📬 Patrocínio de Newsletter</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Inserção de banner promocional ou recomendação editorial em texto diretamente no boletim eletrônico semanal que enviamos à nossa base de leitores cadastrados.
            </p>
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '35px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Solicite nosso Mídia Kit Completo
        </h2>
        <p style={{ marginBottom: '20px' }}>
          Temos formatos flexíveis que se adaptam aos objetivos de marketing e ao orçamento de empresas de todos os portes (desde startups locais até grandes marcas de tecnologia).
        </p>
        
        <div style={{ background: 'var(--gold)', padding: '25px', border: '2px solid var(--ink)', borderRadius: '4px', textAlign: 'center', margin: '30px 0' }}>
          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', marginBottom: '10px' }}>Fale com nossa Área Comercial</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '20px', fontWeight: 500 }}>
            Para solicitar nossa tabela de preços, estatísticas de tráfego atuais ou desenhar uma campanha sob medida, envie um e-mail para:
          </p>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px' }}>
            📧 contato@futuroagora.tech
          </p>
          <Link href="/contato" style={{ background: 'var(--ink)', color: 'var(--paper)', textDecoration: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', display: 'inline-block', border: '2px solid var(--ink)' }}>
            Ir para Formulário de Contato →
          </Link>
        </div>
      </div>
    </div>
  );
}
