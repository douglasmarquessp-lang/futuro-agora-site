import './globals.css';
import { Bebas_Neue, Plus_Jakarta_Sans, Lora } from 'next/font/google';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${lora.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta)' }}>
        {/* TOP BAR */}
        <div className="topbar">
          <span className="topbar-date">📅 Maio 2026</span>
          <div className="topbar-scroll">
            <div className="ticker-wrap">
              <span>Google I/O 2026 — IA por voz chega ao Gmail e Docs</span>
              <span>Microsoft lança 3 modelos próprios de IA contra OpenAI</span>
              <span>OpenAI economiza US$ 97 bilhões em novo acordo</span>
              <span>IA transforma eleições brasileiras de 2026</span>
              <span>Computação quântica bate recorde mundial no MIT</span>
              <span>Brasil anuncia plano de R$ 23 bilhões em Inteligência Artificial</span>
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
              <li><a href="/" className="act">Início</a></li>
              <li><a href="#">🤖 IA</a></li>
              <li><a href="#">💻 Tecnologia</a></li>
              <li><a href="#">⚛️ Ciência</a></li>
              <li><a href="#">🇧🇷 Brasil Tech</a></li>
              <li><a href="#">🔮 Futuro</a></li>
              <li><a href="#">🎙 Podcast</a></li>
            </ul>
            <div className="nav-right">
              <button className="btn-srch">🔍</button>
              <button className="btn-nl">Newsletter</button>
            </div>
          </div>
        </nav>

        {/* CAT STRIP */}
        <div className="cat-strip">
          <div className="cat-inner">
            <div className="cat-pill fire">🔥 Trending</div>
            <div className="cat-pill">ChatGPT</div>
            <div className="cat-pill">Google Gemini</div>
            <div className="cat-pill">Claude AI</div>
            <div className="cat-pill">Quantum</div>
            <div className="cat-pill">OpenAI</div>
            <div className="cat-pill">Meta IA</div>
            <div className="cat-pill">Robôs</div>
            <div className="cat-pill">Elon Musk</div>
            <div className="cat-pill">Tesla</div>
            <div className="cat-pill">SpaceX</div>
            <div className="cat-pill">Saúde IA</div>
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
  <a href="https://facebook.com/seu_usuario" target="_blank" className="soc-btn">f</a>
  <a href="https://instagram.com/seu_usuario" target="_blank" className="soc-btn">📸</a>
  <a href="https://youtube.com/seu_canal" target="_blank" className="soc-btn">▶</a>
  <a href="https://wa.me/seu_numero" target="_blank" className="soc-btn">💬</a>
</div>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Categorias</div>
              <ul className="f-links">
                <li><a href="#">🤖 Inteligência Artificial</a></li>
                <li><a href="#">💻 Tecnologia</a></li>
                <li><a href="#">⚛️ Ciência</a></li>
                <li><a href="#">🇧🇷 Brasil Tech</a></li>
                <li><a href="#">🔮 Futuro</a></li>
              </ul>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Site</div>
              <ul className="f-links">
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">Anuncie aqui</a></li>
              </ul>
            </div>
            <div className="fc">
              <div className="f-col-ttl">Legal</div>
              <ul className="f-links">
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Política de Cookies</a></li>
                <li><a href="#">LGPD</a></li>
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
