import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Cpu, Save, ChevronRight } from 'lucide-react';

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: value ? 'var(--accent)' : '#d1d5db',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3,
        left: value ? 21 : 3,
        width: 16, height: 16, borderRadius: '50%',
        background: 'white',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div style={{
      background: 'white', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)', marginBottom: 16,
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border)',
        background: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Icon size={15} color="var(--accent)" />
        <span style={{ fontWeight: 600, fontSize: 13.5 }}>{title}</span>
      </div>
      <div style={{ padding: '4px 0' }}>{children}</div>
    </div>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 18px', borderBottom: '1px solid #f3f4f6',
    }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [s, setS] = useState({
    autoQuarantine: true,
    realTimeMonitor: true,
    deepInspect: false,
    mlModel: true,
    emailAlerts: true,
    smsAlerts: false,
    criticalOnly: false,
    autoUpdate: true,
    dataRetention: '30',
    scanInterval: '5',
    threshold: '70',
  });

  const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease', maxWidth: 760 }}>
      <Section title="Detection Engine" icon={Shield}>
        <SettingRow label="Auto-Quarantine Infected Devices" desc="Automatically isolate devices when botnet activity is confirmed">
          <Toggle value={s.autoQuarantine} onChange={v => set('autoQuarantine', v)} />
        </SettingRow>
        <SettingRow label="Real-time Traffic Monitoring" desc="Continuously analyze all network packets">
          <Toggle value={s.realTimeMonitor} onChange={v => set('realTimeMonitor', v)} />
        </SettingRow>
        <SettingRow label="Deep Packet Inspection" desc="Inspect packet payload for malware signatures (high CPU)">
          <Toggle value={s.deepInspect} onChange={v => set('deepInspect', v)} />
        </SettingRow>
        <SettingRow label="AI/ML Detection Model" desc="Use machine learning model for anomaly detection">
          <Toggle value={s.mlModel} onChange={v => set('mlModel', v)} />
        </SettingRow>
        <SettingRow label="Risk Threshold (%)" desc="Alert when device risk score exceeds this value">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="range" min="40" max="95" value={s.threshold}
              onChange={e => set('threshold', e.target.value)}
              style={{ width: 100, accentColor: 'var(--accent)' }}
            />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
              color: 'var(--accent)', minWidth: 32, textAlign: 'right',
            }}>{s.threshold}%</span>
          </div>
        </SettingRow>
        <SettingRow label="Scan Interval (minutes)" desc="How often to run full device scan">
          <select
            value={s.scanInterval}
            onChange={e => set('scanInterval', e.target.value)}
            style={{
              padding: '5px 10px', borderRadius: 7,
              border: '1px solid var(--border)', fontSize: 12,
              fontFamily: 'var(--font)', color: 'var(--text-primary)',
              outline: 'none', background: 'white',
            }}
          >
            <option value="1">Every 1 min</option>
            <option value="5">Every 5 min</option>
            <option value="15">Every 15 min</option>
            <option value="30">Every 30 min</option>
          </select>
        </SettingRow>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <SettingRow label="Email Alerts" desc="Send email notifications for threats">
          <Toggle value={s.emailAlerts} onChange={v => set('emailAlerts', v)} />
        </SettingRow>
        <SettingRow label="SMS Alerts" desc="Send SMS for critical threats only">
          <Toggle value={s.smsAlerts} onChange={v => set('smsAlerts', v)} />
        </SettingRow>
        <SettingRow label="Critical Alerts Only" desc="Only notify on critical severity events">
          <Toggle value={s.criticalOnly} onChange={v => set('criticalOnly', v)} />
        </SettingRow>
        <SettingRow label="Notification Email" desc="">
          <input
            defaultValue="admin@company.com"
            style={{
              padding: '6px 10px', borderRadius: 7,
              border: '1px solid var(--border)', fontSize: 12,
              fontFamily: 'var(--font-mono)', color: 'var(--text-primary)',
              outline: 'none', width: 200,
            }}
          />
        </SettingRow>
      </Section>

      <Section title="Data & Storage" icon={Database}>
        <SettingRow label="Auto-Update Signatures" desc="Automatically update malware signature database">
          <Toggle value={s.autoUpdate} onChange={v => set('autoUpdate', v)} />
        </SettingRow>
        <SettingRow label="Data Retention" desc="How long to keep threat logs">
          <select
            value={s.dataRetention}
            onChange={e => set('dataRetention', e.target.value)}
            style={{
              padding: '5px 10px', borderRadius: 7,
              border: '1px solid var(--border)', fontSize: 12,
              fontFamily: 'var(--font)', color: 'var(--text-primary)',
              outline: 'none', background: 'white',
            }}
          >
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="365">1 year</option>
          </select>
        </SettingRow>
        <SettingRow label="Export Threat Report" desc="Download CSV/PDF report of all threats">
          <button style={{
            padding: '6px 14px', borderRadius: 7,
            border: '1px solid var(--border)', background: 'white',
            color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            Export <ChevronRight size={12} />
          </button>
        </SettingRow>
      </Section>

      <button style={{
        background: 'var(--accent)', color: 'white',
        border: 'none', borderRadius: 9,
        padding: '10px 24px', fontSize: 13, fontWeight: 600,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <Save size={14} />
        Save Settings
      </button>
    </div>
  );
}
