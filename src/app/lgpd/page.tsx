import Link from 'next/link';

export default function LgpdPage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '20px', marginBottom: '20px' }}>
        Conformidade com a LGPD
      </h1>
      
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--ink)' }}>
        <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
          Última atualização: Junho de 2026
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          O <strong>FuturoAgora.tech</strong> tem o firme compromisso de proteger a privacidade e a segurança dos dados pessoais de seus leitores e usuários. Esta página descreve de forma clara e transparente como tratamos as informações do site, em total conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong>.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '10px' }}>
          1. Quais dados coletamos e qual a finalidade?
        </h3>
        <p style={{ marginBottom: '15px' }}>
          Tratamos apenas os dados estritamente necessários para poder entregar conteúdos e serviços informativos de qualidade:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Newsletter (Inscrição por E-mail):</strong> Coletamos o seu e-mail de forma voluntária exclusivamente para enviar nossos resumos de notícias, novidades e artigos relevantes. Esse tratamento é baseado no seu <strong>Consentimento</strong>.</li>
          <li><strong>Navegação (Cookies e Estatísticas):</strong> Coletamos dados técnicos e anônimos (como páginas visitadas, tempo de permanência e localização aproximada via Google Analytics) para entender o interesse de leitura e melhorar o site. Esse tratamento é baseado no nosso <strong>Legítimo Interesse</strong>.</li>
        </ul>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '10px' }}>
          2. Quais são os seus direitos sob a LGPD?
        </h3>
        <p style={{ marginBottom: '15px' }}>
          Em conformidade com o Artigo 18 da LGPD, você possui controle absoluto sobre seus dados pessoais e pode solicitar a qualquer momento:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Confirmação e Acesso:</strong> Saber se realizamos algum tratamento com seus dados e obter uma cópia das informações salvas.</li>
          <li><strong>Correção:</strong> Solicitar a atualização de qualquer dado incorreto, incompleto ou desatualizado.</li>
          <li><strong>Eliminação ou Anonimização:</strong> Solicitar a exclusão ou bloqueio de dados que você sinta que são desnecessários para a entrega do conteúdo.</li>
          <li><strong>Revogação do Consentimento:</strong> Cancelar a assinatura da newsletter a qualquer momento, seja clicando no link de descadastro no final de qualquer e-mail enviado ou nos contatando diretamente.</li>
        </ul>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '10px' }}>
          3. Segurança e Armazenamento
        </h3>
        <p style={{ marginBottom: '15px' }}>
          Adotamos protocolos rígidos de segurança da informação para blindar seus dados pessoais. O site inteiro conta com criptografia de ponta a ponta (conexão SSL segura via HTTPS) para prevenir perdas, vazamentos ou acessos não autorizados de terceiros.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '10px' }}>
          4. Compartilhamento de Dados
        </h3>
        <p style={{ marginBottom: '15px' }}>
          O FuturoAgora.tech <strong>nunca comercializa, vende ou repassa</strong> seus dados pessoais para empresas de publicidade ou marketing de terceiros. Seus dados só são compartilhados com ferramentas parceiras essenciais para o funcionamento do site (como nosso envio automático de e-mails), que também cumprem rigorosamente as normas de privacidade e a LGPD.
        </p>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '10px' }}>
          5. Fale com nosso Encarregado de Dados (DPO)
        </h3>
        <p style={{ marginBottom: '15px' }}>
          Se você deseja exercer qualquer um de seus direitos previstos na LGPD, ou se tiver alguma dúvida sobre a nossa política de segurança de dados pessoais, basta enviar uma mensagem direta para o nosso e-mail oficial: <strong>contato@futuroagora.tech</strong>.
        </p>
      </div>
    </div>
  );
}
