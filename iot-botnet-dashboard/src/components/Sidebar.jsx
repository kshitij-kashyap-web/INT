import React from 'react';
import { LayoutDashboard, Shield, Cpu, Activity, Bell, Settings, ChevronRight, Wifi, Brain } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'threats', label: 'Threat Log', icon: Shield },
  { id: 'traffic', label: 'Network Traffic', icon: Activity },
  { id: 'aianalysis', label: 'AI Analysis', icon: Brain },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: 3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        padding: '0 20px',
        height: 'var(--topbar-h)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          background: 'var(--accent)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Wifi size={16} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.2 }}>SentinelIoT</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>Detection System</div>
        </div>
      </div>

      {/* Status pill */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 8,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#0e9f6e',
              animation: 'pulse-ring 1.8s ease-out infinite',
              opacity: 0.4,
            }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0e9f6e', display: 'block' }} />
          </span>
          <span style={{ fontSize: 12, color: '#065f46', fontWeight: 500 }}>System Active</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 8px 4px' }}>MAIN</div>
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 10px',
                borderRadius: 8,
                border: 'none',
                background: active ? 'var(--accent-light)' : 'transparent',
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: active ? 500 : 400,
                fontSize: 13.5,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                marginBottom: 2,
                textAlign: 'left',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f3f4f6'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  minWidth: 18,
                  textAlign: 'center',
                }}>{badge}</span>
              )}
              {active && <ChevronRight size={13} strokeWidth={2} />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        fontSize: 11,
        color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>v2.4.1 • AI Model v3</span>
          <span style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            padding: '2px 6px',
            borderRadius: 4,
            fontWeight: 500,
          }}>LIVE</span>
        </div>
      </div>
    </aside>
  );
}
