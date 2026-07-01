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
        
        {/* COLE O SEU TEXTO DO WORDPRESS AQUI DENTRO (Use tags <p> para parágrafos) */}
        <p style={{ marginBottom: '15px' }}>
          <p>Última atualização: maio de 2026<br />
O que são cookies?<br />
Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências e melhorar sua experiência de navegação.<br />
Quais cookies utilizamos<br />
🔹 Cookies essenciais<br />
Necessários para o funcionamento básico do site. Sem eles algumas funcionalidades não funcionam corretamente.<br />
🔹 Cookies de desempenho<br />
Coletados pelo Google Analytics para entender como os visitantes usam o site — quais páginas são mais acessadas e quanto tempo ficam no site.<br />
🔹 Cookies de publicidade<br />
Utilizados pelo Google AdSense para exibir anúncios relevantes para você com base nos seus interesses.<br />
🔹 Cookies de redes sociais<br />
Gerados pelos botões de compartilhamento do Facebook, Instagram e outras redes sociais.<br />
Como desativar os cookies<br />
Você pode desativar os cookies nas configurações do seu navegador:<br />
Chrome: Configurações → Privacidade → Cookies<br />
Firefox: Preferências → Privacidade → Cookies<br />
Safari: Preferências → Privacidade<br />
Atenção: desativar cookies pode afetar algumas funcionalidades do site.<br />
Consentimento<br />
Ao continuar navegando no FuturoAgora.tech você concorda com o uso de cookies conforme descrito nesta política.<br />
Dúvidas?<br />
📧 contato@futuroagora.tech</p>
        </p>
        
      </div>
    </div>
  );
}
