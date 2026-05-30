import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listarPropostasMarketplace, demonstrarInteresse } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [propostas, setPropostas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [toastError, setToastError] = useState(false);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, isError = false) => {
    if (toastRef.current) clearTimeout(toastRef.current);
    setToastMsg(msg);
    setToastError(isError);
    toastRef.current = setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await listarPropostasMarketplace();
        if (Array.isArray(dados)) setPropostas(dados);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  useEffect(() => {
    return () => { if (toastRef.current) clearTimeout(toastRef.current); };
  }, []);

  const userName = usuario?.nome || 'Profissional';
  const location =
    usuario?.perfilProfissional?.localizacao ||
    usuario?.perfilProfissional?.cidade ||
    '';

  const handleInteresse = async (proposta: any) => {
    if (proposta.jaInteressou) return;
    try {
      await demonstrarInteresse(proposta.id);
      setPropostas(prev =>
        prev.map(p => p.id === proposta.id ? { ...p, jaInteressou: true } : p)
      );
      showToast('Interesse registrado! O cliente será notificado.');
    } catch (e: any) {
      showToast(e.message || 'Erro ao registrar interesse', true);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch { return null; }
  };

  const foto = usuario?.foto;

  const styles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #f1f5f9; font-family: 'Inter', sans-serif; color: #0f172a; }

    /* ── Header ── */
    .header {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 32px;
      height: 60px;
      display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 100;
    }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .header-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #e0e7ff; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; border: 2px solid #c7d2fe; flex-shrink: 0;
    }
    .header-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .header-name { font-weight: 700; font-size: 0.95rem; color: #0f172a; }
    .header-loc { font-size: 0.75rem; color: #64748b; margin-top: 1px; }
    .header-nav { display: flex; align-items: center; gap: 4px; }
    .nav-btn {
      width: 38px; height: 38px; border: none; border-radius: 10px;
      background: transparent; color: #64748b;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 16px; cursor: pointer; transition: all 0.18s;
    }
    .nav-btn:hover { background: #f1f5f9; color: #0f172a; }
    .nav-btn.active { background: #eff6ff; color: #2563eb; }

    /* ── Page layout ── */
    .page { max-width: 900px; margin: 0 auto; padding: 28px 20px 60px; }

    /* ── Section header ── */
    .section-bar {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 20px; flex-wrap: wrap; gap: 10px;
    }
    .section-bar h1 { font-size: 1.15rem; font-weight: 700; color: #0f172a; }
    .count-badge {
      background: #f1f5f9; border: 1px solid #e2e8f0;
      color: #475569; font-size: 0.78rem; font-weight: 600;
      padding: 4px 12px; border-radius: 40px;
    }

    /* ── Proposal list item ── */
    .proposal-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px 22px;
      margin-bottom: 12px;
      display: flex; align-items: flex-start; gap: 18px;
      transition: all 0.18s;
    }
    .proposal-item:hover { border-color: #cbd5e1; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .proposal-item.done { border-color: #bbf7d0; background: #f0fdf4; }

    /* Left accent bar */
    .item-accent {
      width: 4px; min-height: 60px; border-radius: 4px;
      background: linear-gradient(180deg, #3b82f6, #6366f1);
      flex-shrink: 0; align-self: stretch;
    }
    .item-accent.done { background: #22c55e; }

    /* Main content */
    .item-body { flex: 1; min-width: 0; }
    .item-title {
      font-size: 1rem; font-weight: 700; color: #0f172a;
      margin-bottom: 4px; line-height: 1.4;
    }
    .item-client {
      font-size: 0.8rem; color: #64748b;
      display: flex; align-items: center; gap: 5px; margin-bottom: 8px;
    }
    .item-desc {
      font-size: 0.85rem; color: #475569; line-height: 1.55;
      margin-bottom: 12px;
    }
    .item-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.75rem; font-weight: 600;
      padding: 3px 10px; border-radius: 40px;
    }
    .tag-value { background: #ecfdf5; color: #166534; border: 1px solid #bbf7d0; }
    .tag-prazo { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .tag-new   { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }

    /* Right side CTA */
    .item-cta { flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; min-width: 140px; }
    .posted-at { font-size: 0.72rem; color: #94a3b8; white-space: nowrap; }
    .btn-interest {
      padding: 9px 18px; border-radius: 10px; border: none;
      font-weight: 700; font-size: 0.82rem; cursor: pointer;
      transition: all 0.18s; font-family: inherit; white-space: nowrap;
    }
    .btn-interest.open {
      background: #2563eb; color: white;
    }
    .btn-interest.open:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
    .btn-interest.sent {
      background: #f0fdf4; color: #166534;
      border: 1.5px solid #bbf7d0; cursor: default;
    }

    /* ── Skeletons ── */
    .skel {
      background: white; border: 1px solid #e2e8f0; border-radius: 16px;
      padding: 20px 22px; margin-bottom: 12px; display: flex; gap: 18px;
    }
    .skel-bar { width: 4px; border-radius: 4px; background: #e2e8f0; }
    .skel-body { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .skel-line { background: #e2e8f0; border-radius: 6px; animation: shimmer 1.4s infinite; }
    @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:.45} }

    /* ── Empty state ── */
    .empty {
      text-align: center; padding: 64px 20px; color: #94a3b8;
    }
    .empty-icon { font-size: 2.8rem; margin-bottom: 14px; }
    .empty p { font-size: 0.95rem; color: #64748b; }
    .empty small { font-size: 0.82rem; margin-top: 6px; display: block; }

    /* ── Toast ── */
    .toast {
      position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%);
      color: white; padding: 11px 22px; border-radius: 40px;
      font-weight: 600; font-size: 0.88rem; z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      animation: up .25s ease;
    }
    @keyframes up {
      from { opacity:0; transform:translateX(-50%) translateY(8px); }
      to   { opacity:1; transform:translateX(-50%) translateY(0); }
    }

    @media (max-width: 600px) {
      .header { padding: 0 16px; }
      .page { padding: 18px 12px 60px; }
      .proposal-item { flex-direction: column; gap: 12px; }
      .item-cta { flex-direction: row; align-items: center; min-width: auto; width: 100%; justify-content: space-between; }
      .item-accent { display: none; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      {/* Header compacto */}
      <header className="header">
        <div className="header-left">
          <div className="header-avatar">
            {foto ? <img src={foto} alt="" /> : '👤'}
          </div>
          <div>
            <div className="header-name">{userName}</div>
            {location && <div className="header-loc">📍 {location}</div>}
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-btn active" title="Início" onClick={() => navigate('/professional/home')}>
            <i className="fas fa-home" />
          </button>
          <button className="nav-btn" title="Minhas propostas" onClick={() => navigate('/professional/proposals')}>
            <i className="fas fa-briefcase" />
          </button>
          <button className="nav-btn" title="Perfil" onClick={() => navigate('/professional/profile')}>
            <i className="fas fa-user" />
          </button>
          <button className="nav-btn" title="Sair" onClick={async () => { await logout(); navigate('/login'); }}>
            <i className="fas fa-sign-out-alt" />
          </button>
        </nav>
      </header>

      <main className="page">
        <div className="section-bar">
          <h1>Propostas disponíveis</h1>
          {!loading && (
            <span className="count-badge">
              {propostas.length} {propostas.length === 1 ? 'proposta aberta' : 'propostas abertas'}
            </span>
          )}
        </div>

        {loading ? (
          <>
            {[180, 140, 160].map((h, i) => (
              <div key={i} className="skel">
                <div className="skel-bar" style={{ height: h }} />
                <div className="skel-body">
                  <div className="skel-line" style={{ height: 18, width: '60%' }} />
                  <div className="skel-line" style={{ height: 13, width: '35%' }} />
                  <div className="skel-line" style={{ height: 13, width: '90%' }} />
                  <div className="skel-line" style={{ height: 13, width: '75%' }} />
                </div>
              </div>
            ))}
          </>
        ) : propostas.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📋</div>
            <p>Nenhuma proposta disponível no momento</p>
            <small>Clientes publicam novas propostas frequentemente — volte em breve.</small>
          </div>
        ) : (
          propostas.map(p => (
            <div key={p.id} className={`proposal-item ${p.jaInteressou ? 'done' : ''}`}>
              <div className={`item-accent ${p.jaInteressou ? 'done' : ''}`} />

              <div className="item-body">
                <div className="item-title">{p.titulo}</div>
                <div className="item-client">
                  <i className="fas fa-user-circle" />
                  {p.clienteNome}
                </div>

                {p.descricao && (
                  <div className="item-desc">
                    {p.descricao.length > 160
                      ? p.descricao.slice(0, 160) + '…'
                      : p.descricao}
                  </div>
                )}

                <div className="item-tags">
                  {!p.jaInteressou && <span className="tag tag-new">Novo</span>}
                  {p.valor && (
                    <span className="tag tag-value">
                      💰 R$ {Number(p.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                  {p.prazo && (
                    <span className="tag tag-prazo">
                      📅 {p.prazo}
                    </span>
                  )}
                  {!p.valor && !p.prazo && (
                    <span className="tag" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>
                      Valor a combinar
                    </span>
                  )}
                </div>
              </div>

              <div className="item-cta">
                {p.created_at && (
                  <span className="posted-at">
                    {formatDate(p.created_at) ?? ''}
                  </span>
                )}
                <button
                  className={`btn-interest ${p.jaInteressou ? 'sent' : 'open'}`}
                  onClick={() => handleInteresse(p)}
                  disabled={p.jaInteressou}
                >
                  {p.jaInteressou ? '✓ Interesse enviado' : 'Tenho interesse'}
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {toastMsg && (
        <div className="toast" style={{ background: toastError ? '#dc2626' : '#16a34a' }}>
          {toastMsg}
        </div>
      )}
    </>
  );
};

export default Home;
