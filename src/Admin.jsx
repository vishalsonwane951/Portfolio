import { useState, useEffect, useCallback, useRef } from "react";

// ── CONFIG ────────────────────────────────────────────────────────────────────
const API = "https://portfolio-backend-cvdm.onrender.com/api";

// ── STYLES ────────────────────────────────────────────────────────────────────
// All selectors are prefixed with .vs-admin to avoid conflicts with portfolio CSS
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .vs-admin *,.vs-admin *::before,.vs-admin *::after{box-sizing:border-box;margin:0;padding:0}
  .vs-admin {
    --bg:#0a0a0f;--bg2:#0f0f1a;--surface:#13131f;--surface2:#1a1a2e;
    --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.12);
    --p1:#7c6ff7;--p2:#a78bfa;--p3:#c4b5fd;
    --accent:#06d6a0;--gold:#fbbf24;--red:#f87171;
    --text:#f0f0f8;--muted:#8888aa;--muted2:#5a5a7a;
    --glow:rgba(124,111,247,0.25);
    --radius:12px;--font:'Sora',sans-serif;--mono:'JetBrains Mono',monospace;
    font-family: var(--font);
    color: var(--text);
  }

  /* Scrollbar */
  .vs-admin ::-webkit-scrollbar{width:4px}
  .vs-admin ::-webkit-scrollbar-track{background:var(--bg)}
  .vs-admin ::-webkit-scrollbar-thumb{background:var(--p1);border-radius:2px}
  .vs-admin ::selection{background:var(--p1);color:#fff}

  /* Layout */
  .vs-admin .admin-wrap{display:flex;min-height:100vh;background:var(--bg)}
  .vs-admin .sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;bottom:0;left:0;z-index:100;transition:transform 0.3s}
  .vs-admin .sidebar-header{padding:1.5rem 1.25rem;border-bottom:1px solid var(--border)}
  .vs-admin .brand{display:flex;align-items:center;gap:10px}
  .vs-admin .brand-orb{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--p1),#5b4fcf);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff;box-shadow:0 0 16px var(--glow);flex-shrink:0}
  .vs-admin .brand-name{font-size:14px;font-weight:700;color:var(--text)}
  .vs-admin .brand-sub{font-size:10px;color:var(--muted);font-family:var(--mono)}
  .vs-admin .sidebar-nav{flex:1;padding:1rem 0.75rem;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
  .vs-admin .nav-section-label{font-size:10px;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.12em;font-family:var(--mono);padding:0.75rem 0.5rem 0.25rem}
  .vs-admin .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;transition:all 0.2s;font-size:13px;font-weight:500;color:var(--muted);border:none;background:none;width:100%;text-align:left;font-family:var(--font)}
  .vs-admin .nav-item:hover{color:var(--text);background:var(--surface2)}
  .vs-admin .nav-item.active{color:var(--p2);background:rgba(124,111,247,0.12);border:1px solid rgba(124,111,247,0.2)}
  .vs-admin .nav-icon{font-size:16px;flex-shrink:0;width:20px;text-align:center}
  .vs-admin .nav-badge{margin-left:auto;font-size:10px;padding:2px 7px;border-radius:10px;background:rgba(248,113,113,0.15);color:var(--red);border:1px solid rgba(248,113,113,0.25);font-weight:700}
  .vs-admin .sidebar-footer{padding:1rem;border-top:1px solid var(--border)}
  .vs-admin .logout-btn{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:500;color:var(--red);border:1px solid rgba(248,113,113,0.2);background:rgba(248,113,113,0.05);width:100%;transition:all 0.2s;font-family:var(--font)}
  .vs-admin .logout-btn:hover{background:rgba(248,113,113,0.12)}
  .vs-admin .main{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column}
  .vs-admin .topbar{padding:0 2rem;height:60px;background:rgba(10,10,15,0.8);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
  .vs-admin .topbar-title{font-size:16px;font-weight:700;color:var(--text)}
  .vs-admin .topbar-right{display:flex;align-items:center;gap:12px}
  .vs-admin .admin-chip{font-size:11px;padding:4px 12px;border-radius:20px;background:rgba(124,111,247,0.1);border:1px solid rgba(124,111,247,0.2);color:var(--p2);font-family:var(--mono)}
  .vs-admin .content{padding:2rem;flex:1}

  /* Cards */
  .vs-admin .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.5rem}
  .vs-admin .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}
  .vs-admin .card-title{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px}
  .vs-admin .card-sub{font-size:12px;color:var(--muted);margin-top:3px}

  /* Stats */
  .vs-admin .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem}
  .vs-admin .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;position:relative;overflow:hidden}
  .vs-admin .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--p1),var(--p3))}
  .vs-admin .stat-val{font-size:2rem;font-weight:800;color:var(--text);line-height:1}
  .vs-admin .stat-lab{font-size:12px;color:var(--muted);margin-top:6px}
  .vs-admin .stat-icon{position:absolute;right:1rem;top:50%;transform:translateY(-50%);font-size:2rem;opacity:0.2}

  /* Forms */
  .vs-admin .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .vs-admin .form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:0.75rem}
  .vs-admin .form-group.full{grid-column:1/-1}
  .vs-admin .form-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;font-family:var(--mono)}
  .vs-admin .form-input{padding:9px 13px;border-radius:9px;font-size:13.5px;background:var(--surface2);border:1px solid var(--border2);color:var(--text);font-family:var(--font);outline:none;transition:all 0.2s;width:100%}
  .vs-admin .form-input:focus{border-color:var(--p1);box-shadow:0 0 0 3px rgba(124,111,247,0.12)}
  .vs-admin textarea.form-input{resize:vertical;min-height:90px}
  .vs-admin .form-input::placeholder{color:var(--muted2)}

  /* Buttons — fully scoped, won't conflict with .btn-primary in portfolio CSS */
  .vs-admin .vs-btn{padding:8px 18px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;border:none;display:inline-flex;align-items:center;gap:7px;font-family:var(--font);text-decoration:none}
  .vs-admin .vs-btn-primary{background:linear-gradient(135deg,var(--p1),#5b4fcf);color:#fff;box-shadow:0 4px 16px var(--glow)}
  .vs-admin .vs-btn-primary:hover{opacity:0.9;transform:translateY(-1px)}
  .vs-admin .vs-btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none}
  .vs-admin .vs-btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border2)}
  .vs-admin .vs-btn-ghost:hover{border-color:var(--p1);color:var(--p2)}
  .vs-admin .vs-btn-danger{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.25)}
  .vs-admin .vs-btn-danger:hover{background:rgba(248,113,113,0.2)}
  .vs-admin .vs-btn-sm{padding:5px 12px;font-size:12px}
  .vs-admin .vs-btn-success{background:rgba(6,214,160,0.1);color:var(--accent);border:1px solid rgba(6,214,160,0.25)}
  .vs-admin .vs-btn-success:hover{background:rgba(6,214,160,0.2)}

  /* Table */
  .vs-admin .table-wrap{overflow-x:auto}
  .vs-admin table{width:100%;border-collapse:collapse}
  .vs-admin th{text-align:left;font-size:11px;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.1em;padding:10px 14px;border-bottom:1px solid var(--border);font-family:var(--mono)}
  .vs-admin td{padding:12px 14px;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted);vertical-align:middle}
  .vs-admin tr:last-child td{border-bottom:none}
  .vs-admin tr:hover td{background:rgba(255,255,255,0.02)}
  .vs-admin .td-title{color:var(--text);font-weight:600}

  /* Badges */
  .vs-admin .badge{display:inline-block;font-size:10px;padding:2px 9px;border-radius:20px;font-weight:700;letter-spacing:0.04em}
  .vs-admin .badge-green{background:rgba(6,214,160,0.1);color:var(--accent);border:1px solid rgba(6,214,160,0.2)}
  .vs-admin .badge-gold{background:rgba(251,191,36,0.1);color:var(--gold);border:1px solid rgba(251,191,36,0.2)}
  .vs-admin .badge-purple{background:rgba(124,111,247,0.1);color:var(--p2);border:1px solid rgba(124,111,247,0.2)}
  .vs-admin .badge-red{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.2)}

  /* Tags Input */
  .vs-admin .tags-wrap{display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:var(--surface2);border:1px solid var(--border2);border-radius:9px;min-height:44px;cursor:text;transition:all 0.2s}
  .vs-admin .tags-wrap:focus-within{border-color:var(--p1);box-shadow:0 0 0 3px rgba(124,111,247,0.12)}
  .vs-admin .tag-chip{display:flex;align-items:center;gap:5px;font-size:11.5px;padding:3px 9px;border-radius:6px;background:rgba(124,111,247,0.1);border:1px solid rgba(124,111,247,0.2);color:var(--p2)}
  .vs-admin .tag-chip button{background:none;border:none;cursor:pointer;color:var(--p2);font-size:13px;padding:0;line-height:1}
  .vs-admin .tags-input{border:none;background:none;outline:none;font-size:13px;color:var(--text);font-family:var(--font);min-width:100px;flex:1;padding:2px 4px}
  .vs-admin .tags-input::placeholder{color:var(--muted2)}

  /* Modal — rendered in a portal outside .vs-admin, so needs explicit styles */
  .vs-admin-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;font-family:'Sora',sans-serif}
  .vs-admin-modal{background:#13131f;border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:2rem;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;position:relative;color:#f0f0f8}
  .vs-admin-modal.wide{max-width:720px}
  .vs-admin-modal-title{font-size:17px;font-weight:700;color:#f0f0f8;margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:1px solid rgba(255,255,255,0.07)}
  .vs-admin-modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;color:#8888aa;cursor:pointer;font-size:22px;padding:4px 8px;line-height:1;transition:color 0.2s;z-index:1}
  .vs-admin-modal-close:hover{color:#f0f0f8}
  /* Reuse form styles inside modal */
  .vs-admin-modal .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .vs-admin-modal .form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:0.75rem}
  .vs-admin-modal .form-group.full{grid-column:1/-1}
  .vs-admin-modal .form-label{font-size:11px;font-weight:700;color:#8888aa;text-transform:uppercase;letter-spacing:0.1em;font-family:'JetBrains Mono',monospace}
  .vs-admin-modal .form-input{padding:9px 13px;border-radius:9px;font-size:13.5px;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);color:#f0f0f8;font-family:'Sora',sans-serif;outline:none;transition:all 0.2s;width:100%}
  .vs-admin-modal .form-input:focus{border-color:#7c6ff7;box-shadow:0 0 0 3px rgba(124,111,247,0.12)}
  .vs-admin-modal textarea.form-input{resize:vertical;min-height:90px}
  .vs-admin-modal .form-input::placeholder{color:#5a5a7a}
  .vs-admin-modal .tags-wrap{display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);border-radius:9px;min-height:44px;cursor:text;transition:all 0.2s}
  .vs-admin-modal .tags-wrap:focus-within{border-color:#7c6ff7;box-shadow:0 0 0 3px rgba(124,111,247,0.12)}
  .vs-admin-modal .tag-chip{display:flex;align-items:center;gap:5px;font-size:11.5px;padding:3px 9px;border-radius:6px;background:rgba(124,111,247,0.1);border:1px solid rgba(124,111,247,0.2);color:#a78bfa}
  .vs-admin-modal .tag-chip button{background:none;border:none;cursor:pointer;color:#a78bfa;font-size:13px;padding:0;line-height:1}
  .vs-admin-modal .tags-input{border:none;background:none;outline:none;font-size:13px;color:#f0f0f8;font-family:'Sora',sans-serif;min-width:100px;flex:1;padding:2px 4px}
  .vs-admin-modal .vs-btn{padding:8px 18px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;border:none;display:inline-flex;align-items:center;gap:7px;font-family:'Sora',sans-serif}
  .vs-admin-modal .vs-btn-primary{background:linear-gradient(135deg,#7c6ff7,#5b4fcf);color:#fff;box-shadow:0 4px 16px rgba(124,111,247,0.25)}
  .vs-admin-modal .vs-btn-primary:hover{opacity:0.9;transform:translateY(-1px)}
  .vs-admin-modal .vs-btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none}
  .vs-admin-modal .vs-btn-ghost{background:transparent;color:#8888aa;border:1px solid rgba(255,255,255,0.12)}
  .vs-admin-modal .vs-btn-ghost:hover{border-color:#7c6ff7;color:#a78bfa}
  .vs-admin-modal .sep{height:1px;background:rgba(255,255,255,0.07);margin:1.25rem 0}

  /* Messages */
  .vs-admin .msg-card{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1rem 1.25rem;margin-bottom:0.75rem;transition:all 0.2s}
  .vs-admin .msg-card.unread{border-left:3px solid var(--p1)}
  .vs-admin .msg-card:hover{border-color:var(--border2)}
  .vs-admin .msg-meta{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}
  .vs-admin .msg-name{font-size:14px;font-weight:700;color:var(--text)}
  .vs-admin .msg-email{font-size:12px;color:var(--p2)}
  .vs-admin .msg-time{font-size:11px;color:var(--muted2);font-family:var(--mono);margin-left:auto}
  .vs-admin .msg-body{font-size:13px;color:var(--muted);line-height:1.7;white-space:pre-wrap}
  .vs-admin .msg-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}

  /* Login */
  .vs-admin-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0f;position:relative;overflow:hidden;font-family:'Sora',sans-serif}
  .vs-admin-login-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(124,111,247,0.1) 0%,transparent 70%)}
  .vs-admin-login-card{background:#13131f;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:2.5rem;width:100%;max-width:400px;position:relative;z-index:1;color:#f0f0f8}
  .vs-admin-login-title{font-size:22px;font-weight:800;text-align:center;margin-bottom:4px;background:linear-gradient(135deg,#7c6ff7,#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .vs-admin-login-sub{font-size:13px;color:#8888aa;text-align:center;margin-bottom:2rem}
  .vs-admin-login-err{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.25);color:#f87171;padding:10px 14px;border-radius:9px;font-size:13px;margin-bottom:1rem}
  .vs-admin-login .form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:0.75rem}
  .vs-admin-login .form-label{font-size:11px;font-weight:700;color:#8888aa;text-transform:uppercase;letter-spacing:0.1em;font-family:'JetBrains Mono',monospace}
  .vs-admin-login .form-input{padding:9px 13px;border-radius:9px;font-size:13.5px;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);color:#f0f0f8;font-family:'Sora',sans-serif;outline:none;transition:all 0.2s;width:100%}
  .vs-admin-login .form-input:focus{border-color:#7c6ff7;box-shadow:0 0 0 3px rgba(124,111,247,0.12)}

  /* Toast */
  .vs-admin-toast-wrap{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999999;display:flex;flex-direction:column;gap:8px;font-family:'Sora',sans-serif}
  .vs-admin-toast{padding:12px 18px;border-radius:10px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;animation:vsSlideIn 0.3s ease;max-width:320px;box-shadow:0 8px 32px rgba(0,0,0,0.4)}
  .vs-admin-toast-success{background:rgba(6,214,160,0.15);border:1px solid rgba(6,214,160,0.3);color:#06d6a0}
  .vs-admin-toast-error{background:rgba(248,113,113,0.15);border:1px solid rgba(248,113,113,0.3);color:#f87171}
  @keyframes vsSlideIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}

  /* Utils */
  .vs-admin .empty{text-align:center;padding:3rem;color:var(--muted);font-size:14px}
  .vs-admin .empty-icon{font-size:3rem;margin-bottom:0.75rem}
  .vs-admin .sep{height:1px;background:var(--border);margin:1.25rem 0}
  .vs-admin-spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:vsSpin 0.6s linear infinite;display:inline-block}
  @keyframes vsSpin{to{transform:rotate(360deg)}}

  @media(max-width:768px){
    .vs-admin .sidebar{transform:translateX(-100%)}
    .vs-admin .main{margin-left:0}
    .vs-admin .stats-row{grid-template-columns:1fr 1fr}
    .vs-admin .form-grid{grid-template-columns:1fr}
    .vs-admin-modal .form-grid{grid-template-columns:1fr}
  }
`;

// ── API HELPER ────────────────────────────────────────────────────────────────
const api = async (path, opts = {}, token = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API}${path}`, { headers, ...opts });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Request failed");
    return data;
};

// ── SPINNER ───────────────────────────────────────────────────────────────────
const Spinner = () => <span className="vs-admin-spinner" />;

// ── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
    return (
        <div className="vs-admin-toast-wrap">
            {toasts.map((t) => (
                <div key={t.id} className={`vs-admin-toast vs-admin-toast-${t.type}`}>
                    {t.type === "success" ? "✅" : "❌"} {t.msg}
                </div>
            ))}
        </div>
    );
}

// ── MODAL WRAPPER — rendered with high z-index, fully self-contained ──────────
function Modal({ onClose, title, wide, children }) {
    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div className="vs-admin-modal-overlay" onClick={onClose}>
            <div
                className={`vs-admin-modal${wide ? " wide" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="vs-admin-modal-close" onClick={onClose}>×</button>
                <div className="vs-admin-modal-title">{title}</div>
                {children}
            </div>
        </div>
    );
}

// ── TAGS INPUT ────────────────────────────────────────────────────────────────
function TagsInput({ value = [], onChange, placeholder = "Type and press Enter..." }) {
    const [input, setInput] = useState("");
    const inputRef = useRef();

    const add = () => {
        const v = input.trim();
        if (v && !value.includes(v)) onChange([...value, v]);
        setInput("");
    };
    const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

    return (
        <div className="tags-wrap" onClick={() => inputRef.current?.focus()}>
            {value.map((t, i) => (
                <span key={i} className="tag-chip">
                    {t}
                    <button onClick={(e) => { e.stopPropagation(); remove(i); }}>×</button>
                </span>
            ))}
            <input
                ref={inputRef}
                className="tags-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); add(); }
                    else if (e.key === "Backspace" && !input) remove(value.length - 1);
                }}
                placeholder={value.length === 0 ? placeholder : ""}
            />
        </div>
    );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, toast }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await api("/auth/login", { method: "POST", body: JSON.stringify(form) });
            onLogin(data.token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vs-admin-login">
            <div className="vs-admin-login-bg" />
            <div className="vs-admin-login-card">
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#7c6ff7,#5b4fcf)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 auto 1rem" }}>
                        VS
                    </div>
                    <div className="vs-admin-login-title">Admin Panel</div>
                    <div className="vs-admin-login-sub">Portfolio CMS · Sign in to manage content</div>
                </div>
                {error && <div className="vs-admin-login-err">⚠️ {error}</div>}
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            placeholder="admin@example.com" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" value={form.password}
                            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                            placeholder="••••••••" required />
                    </div>
                    <button type="submit"
                        style={{ width: "100%", justifyContent: "center", marginTop: "1rem", padding: "12px", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", background: "linear-gradient(135deg,#7c6ff7,#5b4fcf)", color: "#fff", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora',sans-serif" }}
                        disabled={loading}>
                        {loading ? <><Spinner /> Signing in...</> : "🔐 Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ token, unreadCount }) {
    const [stats, setStats] = useState({ projects: 0, skills: 0, education: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            api("/portfolio/projects", {}, token),
            api("/portfolio/skills", {}, token),
            api("/portfolio/education", {}, token),
        ])
            .then(([p, s, e]) => {
                setStats({
                    projects: p.data?.length || 0,
                    skills: s.data?.length || 0,
                    education: e.data?.length || 0,
                    messages: unreadCount,
                });
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [token]); // ✅ only re-fetch when token changes, NOT on every unreadCount update

    // Keep messages stat in sync with unreadCount prop without re-fetching
    useEffect(() => {
        setStats((prev) => ({ ...prev, messages: unreadCount }));
    }, [unreadCount]);

    const statCards = [
        { label: "Projects", val: stats.projects, icon: "💻" },
        { label: "Skill Categories", val: stats.skills, icon: "⚙️" },
        { label: "Education Entries", val: stats.education, icon: "🎓" },
        { label: "Total Messages", val: stats.messages , icon: "📬" },
    ];

    return (
        <div>
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>
                    Welcome back 👋
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    Manage your portfolio sections, projects, and messages from here.
                </div>
            </div>

            {loading ? (
                <div className="empty">
                    <Spinner />
                </div>
            ) : (
                <div className="stats-row">
                    {statCards.map((s, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-val">{s.val}</div>
                            <div className="stat-lab">{s.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {unreadCount > 0 && (
                <div
                    className="card"
                    style={{
                        borderColor: "rgba(124,111,247,0.3)",
                        background: "rgba(124,111,247,0.05)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 28 }}>📬</span>
                        <div>
                            <div style={{ fontWeight: 700, color: "var(--text)" }}>
                                {unreadCount} Unread Message{unreadCount > 1 ? "s" : ""}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                                Go to the Messages section to read them
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-title" style={{ marginBottom: "1rem" }}>
                    📋 Quick Guide
                </div>
                {[
                    ["🏠 Hero", "Update your name, tagline, profile photo URL, current company & stats"],
                    ["👤 About", "Edit your bio, contact info, features list and company details"],
                    ["⚙️ Skills", "Add/remove/update skill categories with icons"],
                    ["💻 Projects", "Manage your portfolio projects — CRUD with featured flag"],
                    ["🎓 Education", "Timeline entries for experience, degrees & certifications"],
                    ["📬 Messages", "Read & manage contact form submissions"],
                ].map(([title, desc]) => (
                    <div
                        key={title}
                        style={{
                            display: "flex",
                            gap: 12,
                            padding: "10px 0",
                            borderBottom: "1px solid var(--border)",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 700,
                                color: "var(--p2)",
                                minWidth: 120,
                                fontSize: 13,
                            }}
                        >
                            {title}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── HERO EDITOR ───────────────────────────────────────────────────────────────
function HeroEditor({ token, toast }) {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api("/portfolio/hero", {}, token)
            .then((d) => setForm(d.data || { name: "", tagline: "", subtitle: "", role: "", location: "", available: true, photoUrl: "", company: "", companyRole: "", companySince: "", techChips: [], stats: [{ val: "6+", sup: "", lab: "Projects" }, { val: "2", sup: "", lab: "Certifications" }, { val: "1", sup: "yr", lab: "Experience" }, { val: "10", sup: "+", lab: "Skills" }] }))
            .catch(() => toast("Failed to load hero data", "error"))
            .finally(() => setLoading(false));
    }, []);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api("/portfolio/hero", { method: "PUT", body: JSON.stringify(form) }, token);
            toast("Hero section updated!", "success");
        } catch (err) { toast(err.message, "error"); }
        finally { setSaving(false); }
    };

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const setStat = (i, k, v) => setForm((f) => { const s = [...f.stats]; s[i] = { ...s[i], [k]: v }; return { ...f, stats: s }; });

    if (loading) return <div className="empty"><Spinner /></div>;

    return (
        <form onSubmit={save}>
            <div className="card">
                <div className="card-header"><div className="card-title">🏠 Hero Section</div></div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input className="form-input" value={form?.name || ""} onChange={(e) => set("name", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role / Title</label>
                        <input className="form-input" value={form?.role || ""} onChange={(e) => set("role", e.target.value)} />
                    </div>
                    <div className="form-group full">
                        <label className="form-label">Tagline</label>
                        <input className="form-input" value={form?.tagline || ""} onChange={(e) => set("tagline", e.target.value)} placeholder="Full Stack Developer — MERN & Python" />
                    </div>
                    <div className="form-group full">
                        <label className="form-label">Subtitle Paragraph</label>
                        <textarea className="form-input" value={form?.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input className="form-input" value={form?.location || ""} onChange={(e) => set("location", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Profile Photo URL</label>
                        <input className="form-input" value={form?.photoUrl || ""} onChange={(e) => set("photoUrl", e.target.value)} placeholder="/photo1.jpg" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Available for Work?</label>
                        <select className="form-input" value={form?.available ? "true" : "false"} onChange={(e) => set("available", e.target.value === "true")}>
                            <option value="true">Yes — Available</option>
                            <option value="false">No — Not Available</option>
                        </select>
                    </div>
                </div>
                <div className="sep" />
                <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", fontSize: 14 }}>Current Company</div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input className="form-input" value={form?.company || ""} onChange={(e) => set("company", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company Role</label>
                        <input className="form-input" value={form?.companyRole || ""} onChange={(e) => set("companyRole", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Since</label>
                        <input className="form-input" value={form?.companySince || ""} onChange={(e) => set("companySince", e.target.value)} placeholder="2024 – Present · Pune" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Tech Chips</label>
                    <TagsInput value={form?.techChips || []} onChange={(v) => set("techChips", v)} placeholder="MERN, Python, AWS..." />
                </div>
                <div className="sep" />
                <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", fontSize: 14 }}>Stats</div>
                <div className="form-grid">
                    {(form?.stats || []).map((s, i) => (
                        <div key={i} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 9, padding: "0.75rem 1rem" }}>
                            <div style={{ fontSize: 11, color: "var(--muted2)", fontFamily: "var(--mono)", marginBottom: "0.5rem" }}>STAT {i + 1}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input className="form-input" style={{ flex: 2 }} value={s.val || ""} onChange={(e) => setStat(i, "val", e.target.value)} placeholder="6+" />
                                <input className="form-input" style={{ flex: 1 }} value={s.sup || ""} onChange={(e) => setStat(i, "sup", e.target.value)} placeholder="yr" />
                                <input className="form-input" style={{ flex: 3 }} value={s.lab || ""} onChange={(e) => setStat(i, "lab", e.target.value)} placeholder="Projects" />
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <button type="submit" className="vs-btn vs-btn-primary" disabled={saving}>
                        {saving ? <><Spinner /> Saving...</> : "💾 Save Hero Section"}
                    </button>
                </div>
            </div>
        </form>
    );
}

// ── ABOUT EDITOR ──────────────────────────────────────────────────────────────
function AboutEditor({ token, toast }) {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api("/portfolio/about", {}, token)
            .then((d) => setForm(d.data || {}))
            .catch(() => toast("Failed to load", "error"))
            .finally(() => setLoading(false));
    }, []);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api("/portfolio/about", { method: "PUT", body: JSON.stringify(form) }, token);
            toast("About section updated!", "success");
        } catch (err) { toast(err.message, "error"); }
        finally { setSaving(false); }
    };

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    if (loading) return <div className="empty"><Spinner /></div>;

    return (
        <form onSubmit={save}>
            <div className="card">
                <div className="card-header"><div className="card-title">👤 About Section</div></div>
                <div className="form-group">
                    <label className="form-label">Bio Paragraph</label>
                    <textarea className="form-input" style={{ minHeight: 120 }} value={form?.bio || ""} onChange={(e) => set("bio", e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Features / Skills List</label>
                    <TagsInput value={form?.features || []} onChange={(v) => set("features", v)} placeholder="Responsive Design, REST APIs..." />
                </div>
                <div className="sep" />
                <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", fontSize: 14 }}>Contact Info Cards</div>
                <div className="form-grid">
                    {[["email", "Email", "email"], ["phone", "Phone", "text"], ["locationDetail", "Location", "text"], ["languages", "Languages", "text"], ["nationality", "Nationality", "text"], ["status", "Work Status", "text"]].map(([key, label, type]) => (
                        <div key={key} className="form-group">
                            <label className="form-label">{label}</label>
                            <input className="form-input" type={type} value={form?.[key] || ""} onChange={(e) => set(key, e.target.value)} />
                        </div>
                    ))}
                </div>
                <div className="sep" />
                <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", fontSize: 14 }}>Company Card</div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <input className="form-input" value={form?.company || ""} onChange={(e) => set("company", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <input className="form-input" value={form?.companyRole || ""} onChange={(e) => set("companyRole", e.target.value)} />
                    </div>
                    <div className="form-group full">
                        <label className="form-label">Meta (location · type · dates)</label>
                        <input className="form-input" value={form?.companyMeta || ""} onChange={(e) => set("companyMeta", e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Company Tech Chips</label>
                    <TagsInput value={form?.companyTechs || []} onChange={(v) => set("companyTechs", v)} />
                </div>
                <div className="sep" />
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">GitHub URL</label>
                        <input className="form-input" value={form?.githubUrl || ""} onChange={(e) => set("githubUrl", e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">LinkedIn URL</label>
                        <input className="form-input" value={form?.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <button type="submit" className="vs-btn vs-btn-primary" disabled={saving}>
                        {saving ? <><Spinner /> Saving...</> : "💾 Save About Section"}
                    </button>
                </div>
            </div>
        </form>
    );
}

// ── SKILLS MANAGER ────────────────────────────────────────────────────────────
function SkillsManager({ token, toast }) {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        api("/portfolio/skills", {}, token)
            .then((d) => setCats(d.data || []))
            .catch(() => toast("Failed to load skills", "error"))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const save = async () => {
        if (!modal.data.title) return toast("Title is required", "error");
        setSaving(true);
        try {
            if (modal.mode === "add") await api("/portfolio/skills", { method: "POST", body: JSON.stringify(modal.data) }, token);
            else await api(`/portfolio/skills/${modal.data._id}`, { method: "PUT", body: JSON.stringify(modal.data) }, token);
            toast(modal.mode === "add" ? "Skill category added!" : "Skill category updated!", "success");
            setModal(null); load();
        } catch (err) { toast(err.message, "error"); }
        finally { setSaving(false); }
    };

    const del = async (id) => {
        if (!window.confirm("Delete this skill category?")) return;
        try { await api(`/portfolio/skills/${id}`, { method: "DELETE" }, token); toast("Deleted!", "success"); load(); }
        catch (err) { toast(err.message, "error"); }
    };

    const setField = (k, v) => setModal((m) => ({ ...m, data: { ...m.data, [k]: v } }));

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">⚙️ Skill Categories</div>
                        <div className="card-sub">{cats?.length || 0} categories</div>
                    </div>
                    <button className="vs-btn vs-btn-primary" onClick={() => setModal({ mode: "add", data: { title: "", icon: "", skills: [], order: cats.length } })}>
                        + Add Category
                    </button>
                </div>
                {loading ? <div className="empty"><Spinner /></div>
                    : cats.length === 0 ? <div className="empty"><div className="empty-icon">⚙️</div>No skill categories yet</div>
                    : (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {cats.map((c) => (
                                <div key={c._id} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 20 }}>{c.icon}</span>
                                            <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{c.title}</span>
                                        </div>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <button className="vs-btn vs-btn-ghost vs-btn-sm" onClick={() => setModal({ mode: "edit", data: { ...c } })}>✏️</button>
                                            <button className="vs-btn vs-btn-danger vs-btn-sm" onClick={() => del(c._id)}>🗑️</button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                        {c.skills.map((s) => <span key={s} className="badge badge-purple">{s}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>

            {modal && (
                <Modal onClose={() => setModal(null)} title={modal.mode === "add" ? "Add Skill Category" : "Edit Skill Category"}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Title *</label>
                            <input className="form-input" value={modal.data.title} onChange={(e) => setField("title", e.target.value)} placeholder="Backend" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Icon (Emoji)</label>
                            <input className="form-input" value={modal.data.icon} onChange={(e) => setField("icon", e.target.value)} placeholder="⚙️" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Display Order</label>
                            <input className="form-input" type="number" value={modal.data.order} onChange={(e) => setField("order", Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Skills</label>
                        <TagsInput value={modal.data.skills} onChange={(v) => setField("skills", v)} placeholder="Node.js, Express.js..." />
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: "1rem" }}>
                        <button className="vs-btn vs-btn-primary" onClick={save} disabled={saving}>
                            {saving ? <><Spinner /> Saving...</> : "💾 Save"}
                        </button>
                        <button className="vs-btn vs-btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// ── PROJECTS MANAGER ──────────────────────────────────────────────────────────
function ProjectsManager({ token, toast }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);

    const blank = () => ({ title: "", description: "", skills: [], keyFeatures: [], progress: 100, status: "Completed", projectLink: "", githubLink: [], featured: false, icon: "💻", order: projects.length });

    const load = () => {
        setLoading(true);
        api("/portfolio/projects", {}, token)
            .then((d) => setProjects(d.data || []))
            .catch(() => toast("Failed to load projects", "error"))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const save = async () => {
        if (!modal.data.title) return toast("Title is required", "error");
        setSaving(true);
        try {
            if (modal.mode === "add") await api("/portfolio/projects", { method: "POST", body: JSON.stringify(modal.data) }, token);
            else await api(`/portfolio/projects/${modal.data._id}`, { method: "PUT", body: JSON.stringify(modal.data) }, token);
            toast("Project saved!", "success"); setModal(null); load();
        } catch (err) { toast(err.message, "error"); }
        finally { setSaving(false); }
    };

    const del = async (id) => {
        if (!window.confirm("Delete this project?")) return;
        try { await api(`/portfolio/projects/${id}`, { method: "DELETE" }, token); toast("Deleted!", "success"); load(); }
        catch (err) { toast(err.message, "error"); }
    };

    const setField = (k, v) => setModal((m) => ({ ...m, data: { ...m.data, [k]: v } }));

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">💻 Projects</div>
                        <div className="card-sub">{projects.length} projects</div>
                    </div>
                    <button className="vs-btn vs-btn-primary" onClick={() => setModal({ mode: "add", data: blank() })}>+ Add Project</button>
                </div>
                {loading ? <div className="empty"><Spinner /></div>
                    : projects.length === 0 ? <div className="empty"><div className="empty-icon">💻</div>No projects yet</div>
                    : (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Icon</th><th>Title</th><th>Status</th><th>Progress</th><th>Featured</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p) => (
                                        <tr key={p._id}>
                                            <td style={{ fontSize: 20 }}>{p.icon}</td>
                                            <td className="td-title">{p.title}</td>
                                            <td><span className={`badge ${p.progress === 100 ? "badge-green" : "badge-gold"}`}>{p.status}</span></td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <div style={{ flex: 1, height: 5, background: "var(--surface2)", borderRadius: 3, overflow: "hidden" }}>
                                                        <div style={{ height: "100%", width: `${p.progress}%`, background: "linear-gradient(90deg,var(--p1),var(--p3))", borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)" }}>{p.progress}%</span>
                                                </div>
                                            </td>
                                            <td>{p.featured ? <span className="badge badge-purple">⭐ Yes</span> : <span style={{ color: "var(--muted2)", fontSize: 12 }}>No</span>}</td>
                                            <td>
                                                <div style={{ display: "flex", gap: 6 }}>
                                                    <button className="vs-btn vs-btn-ghost vs-btn-sm" onClick={() => setModal({ mode: "edit", data: { ...p } })}>✏️ Edit</button>
                                                    <button className="vs-btn vs-btn-danger vs-btn-sm" onClick={() => del(p._id)}>🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>

            {modal && (
                <Modal onClose={() => setModal(null)} title={modal.mode === "add" ? "Add Project" : "Edit Project"} wide>
                    <div className="form-grid">
                        <div className="form-group full">
                            <label className="form-label">Title *</label>
                            <input className="form-input" value={modal.data.title} onChange={(e) => setField("title", e.target.value)} />
                        </div>
                        <div className="form-group full">
                            <label className="form-label">Description</label>
                            <textarea className="form-input" value={modal.data.description} onChange={(e) => setField("description", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Icon (Emoji)</label>
                            <input className="form-input" value={modal.data.icon} onChange={(e) => setField("icon", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <input className="form-input" value={modal.data.status} onChange={(e) => setField("status", e.target.value)} placeholder="Completed" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Progress (0–100)</label>
                            <input className="form-input" type="number" min="0" max="100" value={modal.data.progress} onChange={(e) => setField("progress", Number(e.target.value))} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Order</label>
                            <input className="form-input" type="number" value={modal.data.order} onChange={(e) => setField("order", Number(e.target.value))} />
                        </div>
                        <div className="form-group full">
                            <label className="form-label">Live Project URL</label>
                            <input className="form-input" value={modal.data.projectLink} onChange={(e) => setField("projectLink", e.target.value)} placeholder="https://..." />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Skills / Tech Stack</label>
                        <TagsInput value={modal.data.skills} onChange={(v) => setField("skills", v)} placeholder="React.js, Node.js..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Key Features</label>
                        <TagsInput value={modal.data.keyFeatures} onChange={(v) => setField("keyFeatures", v)} placeholder="Add feature..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">GitHub Links</label>
                        <TagsInput value={modal.data.githubLink} onChange={(v) => setField("githubLink", v)} placeholder="https://github.com/..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Featured Project?</label>
                        <select className="form-input" value={modal.data.featured ? "true" : "false"} onChange={(e) => setField("featured", e.target.value === "true")}>
                            <option value="true">⭐ Yes — Featured</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: "1rem" }}>
                        <button className="vs-btn vs-btn-primary" onClick={save} disabled={saving}>
                            {saving ? <><Spinner /> Saving...</> : "💾 Save Project"}
                        </button>
                        <button className="vs-btn vs-btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// ── EDUCATION MANAGER ─────────────────────────────────────────────────────────
function EducationManager({ token, toast }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);

    const blank = () => ({ type: "degree", dotStyle: "deg", icon: "🎓", yearRange: "", title: "", institution: "", location: "", employmentType: "", cgpa: "", chips: [], isCurrent: false, certFile: "", order: items.length });

    const load = () => {
        setLoading(true);
        api("/portfolio/education", {}, token)
            .then((d) => setItems(d.data || []))
            .catch(() => toast("Failed to load education", "error"))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const save = async () => {
        if (!modal.data.title) return toast("Title is required", "error");
        setSaving(true);
        try {
            if (modal.mode === "add") await api("/portfolio/education", { method: "POST", body: JSON.stringify(modal.data) }, token);
            else await api(`/portfolio/education/${modal.data._id}`, { method: "PUT", body: JSON.stringify(modal.data) }, token);
            toast("Saved!", "success"); setModal(null); load();
        } catch (err) { toast(err.message, "error"); }
        finally { setSaving(false); }
    };

    const del = async (id) => {
        if (!window.confirm("Delete this entry?")) return;
        try { await api(`/portfolio/education/${id}`, { method: "DELETE" }, token); toast("Deleted!", "success"); load(); }
        catch (err) { toast(err.message, "error"); }
    };

    const setField = (k, v) => setModal((m) => ({ ...m, data: { ...m.data, [k]: v } }));

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">🎓 Education & Experience</div>
                        <div className="card-sub">{items.length} timeline entries</div>
                    </div>
                    <button className="vs-btn vs-btn-primary" onClick={() => setModal({ mode: "add", data: blank() })}>+ Add Entry</button>
                </div>
                {loading ? <div className="empty"><Spinner /></div>
                    : items.length === 0 ? <div className="empty"><div className="empty-icon">🎓</div>No entries yet</div>
                    : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {items.map((item) => (
                                <div key={item._id} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: 14 }}>
                                    <div style={{ fontSize: 24, paddingTop: 2 }}>{item.icon || { experience: "💼", degree: "🎓", certification: "⚡" }[item.type]}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                                            <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{item.title}</span>
                                            {item.isCurrent && <span className="badge badge-green">Current</span>}
                                            <span className={`badge badge-${item.type === "experience" ? "green" : item.type === "degree" ? "gold" : "purple"}`}>{item.type}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: "var(--p2)" }}>{item.institution}</div>
                                        <div style={{ fontSize: 11, color: "var(--muted2)", fontFamily: "var(--mono)", marginTop: 2 }}>{item.yearRange}</div>
                                        {item.chips?.length > 0 && (
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                                                {item.chips.map((c) => <span key={c} className="badge badge-purple">{c}</span>)}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                        <button className="vs-btn vs-btn-ghost vs-btn-sm" onClick={() => setModal({ mode: "edit", data: { ...item } })}>✏️</button>
                                        <button className="vs-btn vs-btn-danger vs-btn-sm" onClick={() => del(item._id)}>🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>

            {modal && (
                <Modal onClose={() => setModal(null)} title={modal.mode === "add" ? "Add Entry" : "Edit Entry"}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <select className="form-input" value={modal.data.type} onChange={(e) => setField("type", e.target.value)}>
                                <option value="experience">💼 Experience</option>
                                <option value="degree">🎓 Degree</option>
                                <option value="certification">⚡ Certification</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Dot Style</label>
                            <select className="form-input" value={modal.data.dotStyle} onChange={(e) => setField("dotStyle", e.target.value)}>
                                <option value="exp">exp (green)</option>
                                <option value="deg">deg (gold)</option>
                                <option value="cert">cert (purple)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Icon (Emoji)</label>
                            <input className="form-input" value={modal.data.icon} onChange={(e) => setField("icon", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Year Range</label>
                            <input className="form-input" value={modal.data.yearRange} onChange={(e) => setField("yearRange", e.target.value)} placeholder="2024 – Present" />
                        </div>
                        <div className="form-group full">
                            <label className="form-label">Title *</label>
                            <input className="form-input" value={modal.data.title} onChange={(e) => setField("title", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Institution</label>
                            <input className="form-input" value={modal.data.institution} onChange={(e) => setField("institution", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input className="form-input" value={modal.data.location} onChange={(e) => setField("location", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Employment Type</label>
                            <input className="form-input" value={modal.data.employmentType} onChange={(e) => setField("employmentType", e.target.value)} placeholder="Full-time" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">CGPA (if degree)</label>
                            <input className="form-input" value={modal.data.cgpa} onChange={(e) => setField("cgpa", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Cert File Path</label>
                            <input className="form-input" value={modal.data.certFile} onChange={(e) => setField("certFile", e.target.value)} placeholder="/certificates/file.pdf" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Order</label>
                            <input className="form-input" type="number" value={modal.data.order} onChange={(e) => setField("order", Number(e.target.value))} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Current Position?</label>
                            <select className="form-input" value={modal.data.isCurrent ? "true" : "false"} onChange={(e) => setField("isCurrent", e.target.value === "true")}>
                                <option value="true">Yes — Current</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tech / Subject Chips</label>
                        <TagsInput value={modal.data.chips || []} onChange={(v) => setField("chips", v)} />
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: "1rem" }}>
                        <button className="vs-btn vs-btn-primary" onClick={save} disabled={saving}>
                            {saving ? <><Spinner /> Saving...</> : "💾 Save"}
                        </button>
                        <button className="vs-btn vs-btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// ── MESSAGES ──────────────────────────────────────────────────────────────────
// ── MESSAGES ──────────────────────────────────────────────────────────────────
function Messages({ token, toast, onUnreadChange }) {
    const [msgs, setMsgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // Stable ref so load() never re-creates when parent re-renders
    const onUnreadChangeRef = useRef(onUnreadChange);
    useEffect(() => { onUnreadChangeRef.current = onUnreadChange; }, [onUnreadChange]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        const q = filter === "unread" ? "?unread=true" : "";
        api(`/contact${q}`, {}, token)
            .then((d) => {
                if (cancelled) return;
                const data = d.data || [];
                setMsgs(data);
                if (filter === "all") {
                    onUnreadChangeRef.current(data.filter((m) => !m.isRead).length);
                }
            })
            .catch(() => { if (!cancelled) toast("Failed to load messages", "error"); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [filter, token]); // ✅ stable deps — onUnreadChange excluded via ref

    const markRead = async (id) => {
        try {
            await api(`/contact/${id}/read`, { method: "PATCH" }, token);
            setMsgs((ms) => {
                const updated = ms.map((m) => (m._id === id ? { ...m, isRead: true } : m));
                onUnreadChangeRef.current(updated.filter((m) => !m.isRead).length);
                return updated;
            });
        } catch (err) { toast(err.message, "error"); }
    };

    const del = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await api(`/contact/${id}`, { method: "DELETE" }, token);
            toast("Message deleted", "success");
            setMsgs((ms) => {
                const updated = ms.filter((m) => m._id !== id);
                onUnreadChangeRef.current(updated.filter((m) => !m.isRead).length);
                return updated;
            });
        } catch (err) { toast(err.message, "error"); }
    };

    const fmtDate = (d) =>
        new Date(d).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">📬 Contact Messages</div>
                        <div className="card-sub">{msgs.length} shown</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        {["all", "unread"].map((f) => (
                            <button
                                key={f}
                                className={`vs-btn ${filter === f ? "vs-btn-primary" : "vs-btn-ghost"} vs-btn-sm`}
                                onClick={() => setFilter(f)}
                                style={{ textTransform: "capitalize" }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="empty"><Spinner /></div>
                ) : msgs.length === 0 ? (
                    <div className="empty">
                        <div className="empty-icon">📭</div>
                        No messages{filter === "unread" ? " unread" : ""}
                    </div>
                ) : (
                    msgs.map((m) => (
                        <div key={m._id} className={`msg-card ${!m.isRead ? "unread" : ""}`}>
                            <div className="msg-meta">
                                {!m.isRead && <span className="badge badge-red">New</span>}
                                <span className="msg-name">{m.name}</span>
                                <a href={`mailto:${m.email}`} className="msg-email">{m.email}</a>
                                <span className="msg-time">{fmtDate(m.createdAt)}</span>
                            </div>
                            <div className="msg-body">{m.message}</div>
                            <div className="msg-actions">
                                <a
                                    href={`mailto:${m.email}?subject=Re: Portfolio Contact`}
                                    className="vs-btn vs-btn-ghost vs-btn-sm"
                                >
                                    ✉️ Reply
                                </a>
                                {!m.isRead && (
                                    <button
                                        className="vs-btn vs-btn-success vs-btn-sm"
                                        onClick={() => markRead(m._id)}
                                    >
                                        ✓ Mark Read
                                    </button>
                                )}
                                <button
                                    className="vs-btn vs-btn-danger vs-btn-sm"
                                    onClick={() => del(m._id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function VSAdminPanel() {
    const [token, setToken] = useState(() => {
        try { return localStorage.getItem("vs_admin_token"); } catch { return null; }
    });
    const [activeTab, setActiveTab] = useState("dashboard");
    const [toasts, setToasts] = useState([]);
    const [unread, setUnread] = useState(0);

    useEffect(() => {
        const styleId = "vs-admin-styles";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = globalStyles;
            document.head.appendChild(style);
        }
        return () => { const el = document.getElementById(styleId); if (el) el.remove(); };
    }, []);

    const toast = useCallback((msg, type = "success") => {
        const id = Date.now();
        setToasts((t) => [...t, { id, msg, type }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
    }, []);

    const handleLogin = (t) => { try { localStorage.setItem("vs_admin_token", t); } catch {} setToken(t); };
    const handleLogout = () => { try { localStorage.removeItem("vs_admin_token"); } catch {} setToken(null); };

    if (!token) return (
        <>
            <LoginPage onLogin={handleLogin} toast={toast} />
            <Toast toasts={toasts} />
        </>
    );

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "hero", label: "Hero", icon: "✨" },
        { id: "about", label: "About", icon: "👤" },
        { id: "skills", label: "Skills", icon: "⚙️" },
        { id: "projects", label: "Projects", icon: "💻" },
        { id: "education", label: "Education", icon: "🎓" },
        { id: "messages", label: "Messages", icon: "📬", badge: unread > 0 ? unread : null },
    ];

    const sectionTitles = { dashboard: "Dashboard", hero: "Hero Section", about: "About Section", skills: "Skills", projects: "Projects", education: "Education & Experience", messages: "Contact Messages" };

    const renderSection = () => {
        switch (activeTab) {
            case "dashboard": return <Dashboard token={token} unreadCount={unread} />;
            case "hero": return <HeroEditor token={token} toast={toast} />;
            case "about": return <AboutEditor token={token} toast={toast} />;
            case "skills": return <SkillsManager token={token} toast={toast} />;
            case "projects": return <ProjectsManager token={token} toast={toast} />;
            case "education": return <EducationManager token={token} toast={toast} />;
            case "messages": return <Messages token={token} toast={toast} onUnreadChange={setUnread} />;
            default: return null;
        }
    };

    return (
        <div className="vs-admin">
            <div className="admin-wrap">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <div className="brand">
                            <div className="brand-orb">VS</div>
                            <div>
                                <div className="brand-name">VS Portfolio</div>
                                <div className="brand-sub">Admin CMS</div>
                            </div>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <div className="nav-section-label">Navigation</div>
                        {navItems.map((item) => (
                            <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                            </button>
                        ))}
                    </nav>
                    <div className="sidebar-footer">
                        <button className="logout-btn" onClick={handleLogout}>🚪 Sign Out</button>
                    </div>
                </aside>

                <main className="main">
                    <div className="topbar">
                        <div className="topbar-title">{sectionTitles[activeTab]}</div>
                        <div className="topbar-right">
                            <span className="admin-chip">admin</span>
                        </div>
                    </div>
                    <div className="content">{renderSection()}</div>
                </main>
            </div>
            <Toast toasts={toasts} />
        </div>
    );
}