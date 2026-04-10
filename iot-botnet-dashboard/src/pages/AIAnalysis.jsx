import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Eye, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useRealTimeDat from '../hooks/useRealTimeData.js';
import { devices } from '../data/mockData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12, boxShadow: 'var(--shadow)' }}>
        <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>Tick {label}</div>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color, display: 'flex', gap: 8 }}>
            <span>{p.name}:</span><span style={{ fontWeight: 600 }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Animated confidence ring
function ConfidenceRing({ value, label, color }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#f1f5f9" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text x="45" y="45" textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 16, fontWeight: 700, fill: color, fontFamily: 'DM Sans, sans-serif' }}>
          {value}%
        </text>
      </svg>
      <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center', maxWidth: 80 }}>{label}</span>
    </div>
  );
}

// Live packet row with animation
function PacketRow({ pkt, index }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '75px 110px 110px 50px 55px 55px 70px',
      gap: 4,
      padding: '5px 12px',
      borderBottom: '1px solid #f8fafc',
      background: pkt.suspicious ? '#fffbeb' : 'white',
      borderLeft: `2px solid ${pkt.suspicious ? '#f59e0b' : 'transparent'}`,
      animation: index === 0 ? 'fadeIn 0.25s ease' : 'none',
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      alignItems: 'center',
    }}>
      <span style={{ color: 'var(--text-muted)' }}>{pkt.time}</span>
      <span style={{ color: pkt.suspicious ? '#b45309' : 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pkt.src}</span>
      <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pkt.dst}</span>
      <span style={{
        color: pkt.proto === 'MQTT' ? '#7c3aed' : pkt.proto === 'DNS' ? '#0891b2' : 'var(--text-secondary)',
        fontWeight: 500,
      }}>{pkt.proto}</span>
      <span style={{ color: 'var(--text-muted)' }}>{pkt.size}B</span>
      <span style={{
        color: ['RST', 'URG'].includes(pkt.flag) ? '#dc2626' : 'var(--text-muted)',
        fontWeight: ['RST', 'URG'].includes(pkt.flag) ? 600 : 400,
      }}>{pkt.flag}</span>
      <span>
        {pkt.suspicious ? (
          <span style={{ background: '#fffbeb', color: '#b45309', padding: '1px 6px', borderRadius: 8, fontWeight: 600, fontSize: 10 }}>⚠ Anomaly</span>
        ) : (
          <span style={{ color: '#9ca3af' }}>—</span>
        )}
      </span>
    </div>
  );
}

const radarData = [
  { feature: 'Port Scan', score: 88 },
  { feature: 'C2 Comm', score: 92 },
  { feature: 'DNS Abuse', score: 45 },
  { feature: 'Traffic Vol', score: 78 },
  { feature: 'Auth Fail', score: 32 },
  { feature: 'Lateral Mov', score: 55 },
];

export default function AIAnalysis() {
  const { trafficRate, packetCount, networkHealth, livePackets, liveChart } = useRealTimeData();
  const [modelAccuracy] = useState(96.4);
  const [falsePositiveRate] = useState(1.8);
  const [detectionLatency] = useState(14);
  const [totalAnalyzed, setTotalAnalyzed] = useState(1284928);

  useEffect(() => {
    const t = setInterval(() => {
      setTotalAnalyzed(prev => prev + Math.floor(Math.random() * 80 + 20));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const topRiskDevices = devices
    .map(d => ({ ...d }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>

      {/* AI Model stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Model Accuracy', value: `${modelAccuracy}%`, color: '#16a34a', sub: 'Random Forest + LSTM' },
          { label: 'False Positive Rate', value: `${falsePositiveRate}%`, color: '#d97706', sub: 'Below 2% target ✓' },
          { label: 'Avg Detection Time', value: `${detectionLatency}ms`, color: '#1a56db', sub: 'Real-time threshold' },
          { label: 'Packets Analyzed', value: totalAnalyzed.toLocaleString(), color: '#7c3aed', sub: 'Since system start' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'white', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '16px 18px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 2: Live chart + radar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 16 }}>

        {/* Live anomaly detection chart */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Live Anomaly Detection Stream</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#16a34a',
                display: 'inline-block', animation: 'blink 1.2s infinite',
              }} />
              <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={liveChart}>
              <defs>
                <linearGradient id="gnorm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a56db" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ganom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="t" tick={false} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="normal" stroke="#1a56db" strokeWidth={1.5} fill="url(#gnorm)" name="Normal" dot={false} />
              <Area type="monotone" dataKey="anomaly" stroke="#dc2626" strokeWidth={2} fill="url(#ganom)" name="Anomaly" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, justifyContent: 'center', marginTop: 4 }}>
            {[['#1a56db', 'Normal traffic'], ['#dc2626', 'Anomaly spike']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' }}>
                <span style={{ width: 12, height: 3, background: c, display: 'inline-block', borderRadius: 1 }} />{l}
              </span>
            ))}
          </div>
        </div>

        {/* Threat radar */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>Threat Feature Radar</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Front CCTV (highest risk)</div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="feature" tick={{ fontSize: 9.5, fill: '#9ca3af' }} />
              <Radar name="Score" dataKey="score" stroke="#dc2626" fill="#dc2626" fillOpacity={0.12} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Model confidence + device risk scores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>

        {/* Model confidence scores */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 16 }}>Model Confidence Scores</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            <ConfidenceRing value={96} label="Botnet Detection" color="#1a56db" />
            <ConfidenceRing value={88} label="C2 Identification" color="#dc2626" />
            <ConfidenceRing value={79} label="Port Scan" color="#d97706" />
            <ConfidenceRing value={94} label="DNS Anomaly" color="#7c3aed" />
          </div>
        </div>

        {/* Live AI risk scores per device */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Live AI Risk Scores</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Auto-updates every 3s</span>
          </div>
          {topRiskDevices.map(d => (
            <div key={d.id} style={{ marginBottom: 11 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{d.name}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                  color: d.score >= 70 ? '#dc2626' : d.score >= 45 ? '#d97706' : '#16a34a',
                  transition: 'color 0.5s',
                }}>{d.score}%</span>
              </div>
              <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${d.score}%`,
                  background: d.score >= 70 ? '#dc2626' : d.score >= 45 ? '#f59e0b' : '#16a34a',
                  borderRadius: 3,
                  transition: 'width 0.6s ease, background 0.5s',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live packet inspector */}
      <div style={{
        background: 'white', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
          background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={14} color="var(--accent)" />
            <span style={{ fontWeight: 600, fontSize: 13.5 }}>Live Packet Inspector</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {packetCount.toLocaleString()} total
            </span>
            <span style={{
              background: '#f0fdf4', color: '#16a34a',
              fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 8,
              animation: 'blink 2s infinite',
            }}>● CAPTURING</span>
          </div>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '75px 110px 110px 50px 55px 55px 70px',
          gap: 4,
          padding: '7px 12px',
          background: '#f8fafc',
          borderBottom: '1px solid var(--border)',
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>Time</span>
          <span>Source IP</span>
          <span>Dest IP</span>
          <span>Proto</span>
          <span>Size</span>
          <span>Flag</span>
          <span>Status</span>
        </div>

        {/* Packet rows */}
        <div style={{ maxHeight: 220, overflowY: 'auto' }}>
          {livePackets.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              Capturing packets…
            </div>
          ) : livePackets.map((pkt, i) => (
            <PacketRow key={pkt.id} pkt={pkt} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
