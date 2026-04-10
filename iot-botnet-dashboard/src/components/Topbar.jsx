import React, { useState } from 'react';
import { Search, Bell, RefreshCw, Sun, Moon } from 'lucide-react';

export default function Topbar({ title, subtitle, dark, setDark }) {

  // 🔥 refresh loading state
  const [loading, setLoading] = useState(false);

  const iconBtn = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: '0.2s',
  };

  return (
    <div style={{
      height: 'var(--topbar-h)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-card)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>

      {/* LEFT */}
      <div>
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          {title}
        </div>

        <div style={{
          fontSize: 12,
          color: 'var(--text-muted)'
        }}>
          {subtitle}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }}>

        {/* SEARCH */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          padding: '6px 12px',
          borderRadius: 8
        }}>
          <Search size={14} color="var(--text-secondary)" />
          <input
            placeholder="Search..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 12,
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* TIME */}
        <div style={{
          fontSize: 12,
          padding: '6px 10px',
          borderRadius: 8,
          background: 'var(--bg)',
          border: '1px solid var(--border)'
        }}>
          {new Date().toLocaleTimeString()}
        </div>

        {/* ALERT */}
        <div style={{
          background: 'var(--danger-light)',
          color: 'var(--danger)',
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          border: '1px solid var(--danger)'
        }}>
          ⚠ 2 Critical
        </div>

        {/* 🔄 REFRESH (FIXED) */}
        <div
          style={iconBtn}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
        >
          <RefreshCw
            size={16}
            color="var(--text-primary)"
            className={loading ? "spin" : ""}
          />
        </div>

        {/* 🔔 NOTIFICATION */}
        <div
          style={iconBtn}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
        >
          <Bell size={16} color="var(--text-primary)" />
        </div>

        {/* 🌙 DARK MODE */}
        <div
          onClick={() => setDark(!dark)}
          style={{
            ...iconBtn,
            background: dark ? '#1f2937' : 'var(--bg-card)',
          }}
        >
          {dark ? (
            <Sun size={16} color="#facc15" />
          ) : (
            <Moon size={16} color="var(--text-primary)" />
          )}
        </div>

      </div>
    </div>
  );
}