import Link from 'next/link';

export default function SobreNosPage() {
  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>
      
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', marginTop: '20px', marginBottom: '20px' }}>
        Sobre Nós
      </h1>
      
      <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--ink)' }}>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--red-dark)' }}>
          O FuturoAgora.tech nasceu com uma missão simples e clara: traduzir e explicar o amanhã para todo brasileiro.
        </p>
        
        <p style={{ marginBottom: '20px' }}>
          Estamos vivendo em uma das épocas mais aceleradas da história humana. A Inteligência Artificial, a tecnologia de ponta e as novas descobertas científicas estão redesenhando tudo ao nosso redor — o mercado de trabalho, a saúde, a educação e até a forma como nos comunicamos. No entanto, a maioria das notícias sobre esses temas é excessivamente complexa, técnica e distante da realidade da maioria das pessoas.
        </p>
        
        <p style={{ marginBottom: '20px' }}>
          Acreditamos que o acesso ao conhecimento sobre inovação não deve ser restrito a especialistas ou programadores. Foi exatamente por isso que criamos o <strong>FuturoAgora.tech</strong>.
        </p>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Nossa Missão
        </h2>
        <p style={{ marginBottom: '20px' }}>
          Traduzir o complexo universo da tecnologia em uma linguagem simples, didática, direta e 100% acessível para qualquer pessoa — independentemente de você ter ou não conhecimento técnico prévio.
        </p>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          O Que Você Encontra Aqui
        </h2>
        <ul style={{ paddingLeft: '0', listStyleType: 'none', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li>🤖 <strong>Inteligência Artificial:</strong> O avanço das IAs e algoritmos explicados sem termos complicados.</li>
          <li>💻 <strong>Tecnologia e Trabalho:</strong> Novidades, gadgets e como as novas ferramentas impactam a sua rotina produtiva.</li>
          <li>⚛️ <strong>Ciência do Futuro:</strong> Descobertas científicas incríveis que em breve estarão mudando a sua qualidade de vida.</li>
          <li>🇧🇷 <strong>Brasil Tech:</strong> O impacto, as tendências e o avanço da inovação tecnológica no cenário brasileiro.</li>
          <li>🔮 <strong>Tendências:</strong> Visões claras e descomplicadas sobre o que esperar das próximas décadas.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Nossa Promessa
        </h2>
        <p style={{ marginBottom: '25px' }}>
          Todo conteúdo publicado em nosso portal é verificado, planejado com cuidado e escrito de forma clara para que você consiga aprender e se atualizar facilmente, sem jargões ou termos difíceis desnecessários.
        </p>
        
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '30px', borderLeft: '4px solid var(--red)', paddingLeft: '15px' }}>
          O futuro está acontecendo agora — e você merece estar por dentro.
        </p>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', marginTop: '30px', marginBottom: '10px', borderBottom: '2px solid var(--border)', paddingBottom: '5px' }}>
          Contato e Parcerias
        </h2>
        <p style={{ marginBottom: '12px' }}>
          Dúvidas, sugestões, críticas ou propostas de parcerias comerciais e publipostagens? Entre em contato diretamente com a nossa redação:
        </p>
        <p style={{ marginBottom: '5px' }}>
          📧 E-mail: <strong>contato@futuroagora.tech</strong>
        </p>
        <p>
          🌐 Site Oficial: <strong>futuroagora.tech</strong>
        </p>
      </div>
    </div>
  );
}
