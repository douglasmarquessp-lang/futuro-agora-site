import './globals.css';
import { Bebas_Neue, Plus_Jakarta_Sans, Lora } from 'next/font/google';
import { db } from '../lib/db';
import Link from 'next/link';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'FuturoAgora.tech — IA, Tecnologia e Ciência do Futuro',
  description: 'Inteligência Artificial, Tecnologia e Ciência explicados de forma simples para o povo brasileiro.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerArticles = await db.article.findMany({
    where: { published: true },
    take: 5,
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  const tickerItems = tickerArticles.length > 0 
    ? tickerArticles.map(a => a.title)
    : [
        "Google I/O 2026 — IA por voz chega ao Gmail e Docs",
        "Microsoft lança 3 modelos próprios de IA contra OpenAI",
        "Brasil anuncia plano de R$ 23 bilhões em Inteligência Artificial"
      ];

  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${lora.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta)' }}>
        
        {/* LETREIRO DINÂMICO AUTOMÁTICO */}
        <div className="topbar">
          <span className="topbar-date">📅 Maio 2026</span>
          <div className="topbar-scroll">
            <div className="ticker-wrap">
              {tickerItems.map((text, idx) => (
                <span key={idx}>{text}</span>
              ))}
              {tickerItems.map((text, idx) => (
                <span key={`rep-${idx}`}>{text}</span>
              ))}
            </div>
          </div>
          <span className="topbar-right">🔴 AO VIVO</span>
        </div>

        {/* NAV */}
        <nav>
          <div className="nav-wrap">
            <div className="logo">
              <div className="logo-mark">⚡</div>
              <div className="logo-name" style={{ fontFamily: 'var(--font-bebas)' }}>
                Futuro<em>Agora</em>.tech
              </div>
            </div>
            <ul className="nav-links">
              <li><Link href="/">Início</Link></li>
              <li><a href="#">🤖 IA</a></li>
              <li><a href="#">💻 Tecnologia</a></li>
              <li><a href="#">⚛️ Ciência</a></li>
              <li><a href="#">🇧🇷 Brasil Tech</a></li>
              <li><a href="#">🔮 Futuro</a></li>
              <li><a href="#">🎙 Podcast</a></li>
            </ul>
            <div className="nav-right">
              <Link href="/admin" className="btn-srch" style={{ textDecoration: 'none' }}>🔍</Link>
              <button className="btn-nl">Newsletter</button>
            </div>
          </div>
        </nav>

        {/* CAT STRIP (LETREIRO DE CATEGORIAS OFICIAIS DO SEU PORTAL) */}
        <div className="cat-strip">
          <div className="cat-inner">
            <div className="cat-pill fire">🔥 Em Alta</div>
            <div className="cat-pill">🤖 Inteligência Artificial</div>
            <div className="cat-pill">💻 Tecnologia</div>
            <div className="cat-pill">⚛️ Ciência</div>
            <div className="cat-pill">🇧🇷 Brasil Tech</div>
            <div className="cat-pill">🔮 Futuro</div>
          </div>
        </div>

        {children}

        {/* FOOTER */}
        <footer>
          <div className="footer-top">
            <div className="fc">
              <div className="f-logo" style={{ fontFamily: 'var(--font-bebas)' }}>
                Futuro<em>Agora</em>.tech
              </div>
              <p className="f-desc">
                IA, Tecnologia e Ciência explicados de forma simples para o povo brasileiro. O futuro está acontecendo agora — fique por dentro.
              </p>
              <div className="f-soc">
                <a href="https://x.com/DouglasMarkes1" target="_blank" className="soc-btn">𝕏</a>
                <a href="https://www.facebook.com/share/1HBmFNkcdU/" target="_blank" className="soc-btn">f</a>
                <a href="https://www.instagram.com/futuroagora.tech" target="_blank" className="soc-btn">📸</a>
                <a href="https://youtube.com/@cienciatecnologia8897" target="_blank" className="soc-btn">▶</a>
                <a href="https://wa.me/5511933320948" target="_blank" className="soc-btn">💬</a>
              </div>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Categorias</div>
              <ul className="f-links">
                <li><a href="#">🤖 Inteligência Artificial</a></li>
                <li><a href="#">💻 Tecnologia</a></li>
                <li><a href="#">🌌 Ciência e Espaço</a></li>
                <li><a href="#">💡 Inovação</a></li>
                <li><a href="#">🎮 Games</a></li>
                <li><a href="#">🇧🇷 Brasil</a></li>
              </ul>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Site</div>
              <ul className="f-links">
                <li><Link href="/sobre-nos">Sobre nós</Link></li>
                <li><Link href="/contato">Contato</Link></li>
                <li><a href="#">Newsletter</a></li>
                <li><Link href="/anuncie-aqui">Anuncie aqui</Link></li>
              </ul>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Legal</div>
              <ul className="f-links">
                <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
                <li><Link href="/termos-de-uso">Termos de Uso</Link></li>
                <li><Link href="/politica-de-cookies">Política de Cookies</Link></li>
                <li><Link href="/lgpd">LGPD</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bot">
            <span>© 2026 FuturoAgora.tech — Todos os direitos reservados · Feito no Brasil</span>
            <div className="f-badges">
              <div className="fbadge">SSL</div>
              <div className="fbadge">LGPD</div>
              <div className="fbadge">GOOGLE NEWS</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
