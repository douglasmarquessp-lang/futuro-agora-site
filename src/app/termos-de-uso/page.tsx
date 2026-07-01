import Link from 'next/link';

export default function TermosDeUsoPage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '20px', marginBottom: '20px' }}>
        Termos de Uso
      </h1>
      
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--ink)' }}>
        <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Última atualização: Junho de 2026
        </p>
        
        <p style={{ marginBottom: '25px', fontStyle: 'italic', color: 'var(--muted)' }}>
          Bem-vindo ao FuturoAgora.tech. Ao acessar e utilizar este site, você concorda com os termos e condições descritos abaixo.
        </p>
        
        <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <li>
            <strong>Aceitação dos Termos</strong><br />
            Ao navegar pelo FuturoAgora.tech, o usuário concorda em cumprir integralmente estes Termos de Uso e todas as leis e regulamentos aplicáveis.
          </li>
          
          <li>
            <strong>Finalidade do Site</strong><br />
            O FuturoAgora.tech fornece notícias, análises, opiniões e informações relacionadas à tecnologia, Inteligência Artificial, ciência e inovação. As informações publicadas possuem caráter meramente informativo e não constituem aconselhamento profissional, jurídico, financeiro ou técnico.
          </li>
          
          <li>
            <strong>Propriedade Intelectual</strong><br />
            Todo o conteúdo publicado no site, incluindo textos, logotipos, imagens, gráficos e elementos visuais, é protegido por direitos autorais e de propriedade intelectual. É proibida a reprodução, cópia ou distribuição sem autorização prévia por escrito, exceto nos casos previstos expressamente em lei.
          </li>
          
          <li>
            <strong>Responsabilidades do Usuário</strong><br />
            O usuário compromete-se a utilizar o site de forma legal, ética e respeitosa, abstendo-se de realizar qualquer atividade que possa prejudicar, sobrecarregar ou comprometer o funcionamento da plataforma.
          </li>
          
          <li>
            <strong>Links Externos</strong><br />
            O FuturoAgora.tech pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, políticas de privacidade, termos de uso ou práticas dessas páginas externas.
          </li>
          
          <li>
            <strong>Limitação de Responsabilidade</strong><br />
            Embora busquemos manter todas as informações sempre atualizadas e precisas, não garantimos a ausência total de erros, omissões ou eventuais interrupções temporárias no serviço.
          </li>
          
          <li>
            <strong>Alterações dos Termos</strong><br />
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação nesta página.
          </li>
          
          <li>
            <strong>Contato</strong><br />
            Para dúvidas, sugestões ou esclarecimentos relacionados a estes Termos de Uso, entre em contato conosco através do nosso e-mail oficial: <strong>contato@futuroagora.tech</strong>.
          </li>
        </ol>
      </div>
    </div>
  );
}
