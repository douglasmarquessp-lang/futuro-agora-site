import Link from 'next/link';

export default function PoliticaCookiesPage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginTop: '20px', marginBottom: '20px' }}>
        Política de Cookies
      </h1>
      
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--ink)' }}>
        <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
          Última atualização: maio de 2026
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          <strong>O que são cookies?</strong><br />
          Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a funcionar corretamente e a melhorar sua experiência de navegação.
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          <strong>Quais cookies utilizamos?</strong><br />
          • <strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site. Sem eles, algumas funcionalidades importantes podem não funcionar corretamente.<br />
          • <strong>Cookies de desempenho:</strong> Coletados de forma anônima para entender como os visitantes interagem com o site, identificando quais páginas são mais acessadas.<br />
          • <strong>Cookies de publicidade:</strong> Utilizados para exibir anúncios relevantes para você com base nos seus interesses e navegação anterior.<br />
          • <strong>Cookies de redes sociais:</strong> Gerados pelos botões de compartilhamento e interações de redes sociais parceiras (como Facebook e Instagram).
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          <strong>Como desativar os cookies?</strong><br />
          Você pode desativar ou gerenciar os cookies diretamente nas configurações do seu navegador de preferência:<br />
          • <strong>Chrome:</strong> Configurações → Privacidade e Segurança → Cookies<br />
          • <strong>Firefox:</strong> Preferências → Privacidade e Segurança → Cookies<br />
          • <strong>Safari:</strong> Preferências → Privacidade<br />
          <em>Nota: Desativar os cookies pode afetar ou limitar algumas funcionalidades interativas do nosso portal.</em>
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          <strong>Consentimento</strong><br />
          Ao continuar navegando no FuturoAgora.tech, você concorda com o uso de cookies conforme descrito nesta política.
        </p>
        
        <p style={{ marginBottom: '15px' }}>
          <strong>Dúvidas?</strong><br />
          📧 contato@futuroagora.tech
        </p>
      </div>
    </div>
  );
}
