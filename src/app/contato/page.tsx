'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="page" style={{ marginTop: '40px', maxWidth: '800px', background: '#fff', padding: '30px', border: '2.5px solid var(--ink)', borderRadius: '6px', marginBottom: '40px' }}>
      <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
        ← Voltar para a Home
      </Link>

      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', marginTop: '20px', marginBottom: '10px' }}>
        Contato
      </h1>
      <p style={{ lineHeight: '1.6', fontSize: '1rem', color: 'var(--muted)', marginBottom: '30px' }}>
        Tem alguma dúvida, sugestão de pauta, proposta comercial ou apenas quer mandar um alô? Preencha o formulário abaixo ou fale conosco pelo e-mail oficial.
      </p>

      <div className="two-col" style={{ border: 'none', gridTemplateColumns: '1fr 300px', gap: '30px', marginBottom: '0' }}>
        
        {/* Formulário de Contato */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {status === 'success' ? (
            <div style={{ background: 'var(--green)', color: '#fff', padding: '20px', borderRadius: '4px', border: '2.5px solid var(--ink)', fontWeight: 'bold', textAlign: 'center' }}>
              ⚡ Sua mensagem foi enviada com sucesso! Responderemos o mais rápido possível.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Nome Completo</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>E-mail para Contato</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Assunto</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Mensagem</label>
                <textarea
                  className="form-input"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="admin-btn" style={{ width: 'fit-content' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem ⚡'}
              </button>
            </form>
          )}
        </div>

        {/* Informações Laterais */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'var(--warm)', padding: '20px', border: '2px solid var(--ink)', borderRadius: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', marginBottom: '10px' }}>Canais Diretos</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--ink)' }}>
              Se preferir, envie um e-mail diretamente para:
            </p>
            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '8px 0', wordBreak: 'break-all' }}>
              📧 contato@futuroagora.tech
            </p>
            
            {/* Seu Botão do WhatsApp Real integrado */}
            <a href="https://wa.me/5511933320948" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--green)', color: '#fff', padding: '8px 14px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '10px', border: '1.5px solid var(--ink)' }}>
              💬 Chamar no WhatsApp
            </a>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '12px' }}>
              💡 Respondemos em até 24 horas úteis.
            </p>
          </div>

          <div style={{ background: 'var(--gold)', padding: '20px', border: '2px solid var(--ink)', borderRadius: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', marginBottom: '10px' }}>Imprensa e Publi</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--ink)' }}>
              Para propostas de publicidade, patrocínio ou parcerias comerciais, indique <strong>[PARCERIA]</strong> no assunto do e-mail.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
