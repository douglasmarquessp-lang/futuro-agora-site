import Link from 'next/link';

export default function PoliticaPrivacidadePage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '20px', marginBottom: '20px' }}>
        Política de Privacidade
      </h1>
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--ink)' }}>
        
        {/* COLE O SEU TEXTO DO WORDPRESS AQUI DENTRO (Use tags <p> para parágrafos) */}
        <p style={{ marginBottom: '15px' }}>
          <p>Última atualização: maio de 2026<br />
O FuturoAgora.tech respeita a sua privacidade e está comprometido em proteger seus dados pessoais de acordo com a Lei Geral de Proteção de Dados — LGPD (Lei nº 13.709/2018).<br />
1. Quais dados coletamos<br />
Podemos coletar as seguintes informações:<br />
Nome e e-mail quando você se cadastra em nossa newsletter<br />
Dados de navegação como páginas visitadas e tempo no site<br />
Endereço IP e tipo de navegador<br />
Informações fornecidas voluntariamente através de formulários de contato<br />
2. Como usamos seus dados<br />
Seus dados são utilizados para:<br />
Enviar nossa newsletter com as principais notícias<br />
Melhorar a experiência de navegação no site<br />
Analisar o desempenho do conteúdo publicado<br />
Responder suas mensagens e solicitações<br />
3. Cookies<br />
Utilizamos cookies para melhorar sua experiência. Você pode desativá-los nas configurações do seu navegador. Consulte nossa Política de Cookies para mais detalhes.<br />
4. Google AdSense e Analytics<br />
Nosso site utiliza o Google AdSense para exibição de anúncios e o Google Analytics para análise de tráfego. Essas ferramentas podem coletar dados conforme a política de privacidade do Google.<br />
5. Compartilhamento de dados<br />
Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando exigido por lei.<br />
6. Seus direitos<br />
De acordo com a LGPD você tem direito a:<br />
Acessar seus dados pessoais<br />
Corrigir dados incorretos<br />
Solicitar a exclusão dos seus dados<br />
Revogar o consentimento a qualquer momento<br />
7. Contato<br />
Para exercer seus direitos ou tirar dúvidas sobre privacidade entre em contato:<br />
📧 contato@futuroagora.tech</p>
        </p>
        
      </div>
    </div>
  );
}
