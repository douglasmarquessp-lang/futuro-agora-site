import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato — FuturoAgora.tech',
  description: 'Fale com a equipe do FuturoAgora.tech. Envie suas dúvidas, sugestões de pauta, propostas comerciais ou feedback.',
  alternates: {
    canonical: 'https://futuroagora.tech/contato',
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
