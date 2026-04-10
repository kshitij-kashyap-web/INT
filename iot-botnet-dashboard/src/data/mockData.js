// Mock device data
export const devices = [
  { id: 'DEV-001', name: 'Front CCTV', type: 'Camera', ip: '192.168.1.10', mac: 'A4:C3:F0:11:22:33', status: 'infected', threat: 'Mirai Variant', risk: 95, traffic: 8420, lastSeen: '2s ago', location: 'Main Entrance' },
  { id: 'DEV-002', name: 'Smart Router', type: 'Router', ip: '192.168.1.1', mac: 'B8:27:EB:44:55:66', status: 'suspicious', threat: 'Port Scan', risk: 62, traffic: 3120, lastSeen: '5s ago', location: 'Server Room' },
  { id: 'DEV-003', name: 'Office Thermostat', type: 'Sensor', ip: '192.168.1.45', mac: 'DC:A6:32:77:88:99', status: 'safe', threat: null, risk: 8, traffic: 240, lastSeen: '12s ago', location: 'Floor 2' },
  { id: 'DEV-004', name: 'Smart Bulb Hub', type: 'Hub', ip: '192.168.1.52', mac: 'E4:5F:01:AA:BB:CC', status: 'suspicious', threat: 'Unusual Traffic', risk: 55, traffic: 1890, lastSeen: '3s ago', location: 'Meeting Room' },
  { id: 'DEV-005', name: 'Parking CCTV', type: 'Camera', ip: '192.168.1.18', mac: 'F0:9F:C2:DD:EE:FF', status: 'infected', threat: 'C2 Comm', risk: 88, traffic: 6100, lastSeen: '1s ago', location: 'Parking B1' },
  { id: 'DEV-006', name: 'Access Control', type: 'Security', ip: '192.168.1.77', mac: '98:DA:C4:10:20:30', status: 'safe', threat: null, risk: 12, traffic: 380, lastSeen: '20s ago', location: 'Main Gate' },
  { id: 'DEV-007', name: 'NAS Server', type: 'Storage', ip: '192.168.1.200', mac: '00:11:32:40:50:60', status: 'safe', threat: null, risk: 18, traffic: 1240, lastSeen: '8s ago', location: 'Server Room' },
  { id: 'DEV-008', name: 'Smart Printer', type: 'Printer', ip: '192.168.1.35', mac: '3C:97:0E:70:80:90', status: 'suspicious', threat: 'DNS Anomaly', risk: 44, traffic: 920, lastSeen: '15s ago', location: 'Floor 1' },
  { id: 'DEV-009', name: 'Lobby Camera', type: 'Camera', ip: '192.168.1.22', mac: '70:B3:D5:A1:B2:C3', status: 'safe', threat: null, risk: 5, traffic: 2100, lastSeen: '4s ago', location: 'Lobby' },
  { id: 'DEV-010', name: 'IP Phone', type: 'VoIP', ip: '192.168.1.88', mac: 'AC:BC:32:D4:E5:F6', status: 'safe', threat: null, risk: 9, traffic: 560, lastSeen: '22s ago', location: 'Floor 3' },
];

// Traffic history (last 24 hours, per hour)
export const trafficHistory = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2,'0')}:00`,
  normal: Math.floor(1200 + Math.random() * 800),
  suspicious: Math.floor(Math.random() * 400),
  blocked: Math.floor(Math.random() * 120),
}));

// Threat events log
export const threatEvents = [
  { id: 1, time: '14:32:11', device: 'Front CCTV', ip: '192.168.1.10', type: 'Mirai Botnet', severity: 'critical', action: 'Quarantined', details: 'C2 server communication detected on port 48101' },
  { id: 2, time: '14:28:45', device: 'Parking CCTV', ip: '192.168.1.18', type: 'C2 Communication', severity: 'critical', action: 'Blocked', details: 'Outbound traffic to known botnet IP 185.220.101.x' },
  { id: 3, time: '14:19:02', device: 'Smart Router', ip: '192.168.1.1', type: 'Port Scan', severity: 'high', action: 'Flagged', details: 'Sequential port scan on 1024–2048 range detected' },
  { id: 4, time: '14:11:33', device: 'Smart Bulb Hub', ip: '192.168.1.52', type: 'Unusual Traffic', severity: 'medium', action: 'Monitoring', details: 'Spike in UDP broadcast traffic, 3x above baseline' },
  { id: 5, time: '13:58:17', device: 'Smart Printer', ip: '192.168.1.35', type: 'DNS Anomaly', severity: 'medium', action: 'Flagged', details: 'Repeated DNS queries to unregistered domain: a8f2k.cn' },
  { id: 6, time: '13:44:09', device: 'Smart Router', ip: '192.168.1.1', type: 'Brute Force', severity: 'high', action: 'Blocked', details: 'SSH brute force attempt from 45.33.32.156' },
  { id: 7, time: '13:30:00', device: 'NAS Server', ip: '192.168.1.200', type: 'Auth Failure', severity: 'low', action: 'Logged', details: 'Multiple failed login attempts via SMB protocol' },
];

// Attack type distribution
export const attackTypes = [
  { name: 'DDoS', value: 34, color: '#e02424' },
  { name: 'C2 Comm', value: 28, color: '#c27803' },
  { name: 'Port Scan', value: 18, color: '#1a56db' },
  { name: 'DNS Abuse', value: 12, color: '#7c3aed' },
  { name: 'Brute Force', value: 8, color: '#0891b2' },
];

// Weekly detection counts
export const weeklyDetections = [
  { day: 'Mon', detections: 12, blocked: 10 },
  { day: 'Tue', detections: 8, blocked: 7 },
  { day: 'Wed', detections: 19, blocked: 16 },
  { day: 'Thu', detections: 6, blocked: 6 },
  { day: 'Fri', detections: 23, blocked: 20 },
  { day: 'Sat', detections: 15, blocked: 13 },
  { day: 'Sun', detections: 9, blocked: 8 },
];

// Network flow data
export const networkFlow = [
  { time: '00:00', inbound: 420, outbound: 380 },
  { time: '02:00', inbound: 280, outbound: 240 },
  { time: '04:00', inbound: 190, outbound: 160 },
  { time: '06:00', inbound: 540, outbound: 480 },
  { time: '08:00', inbound: 1200, outbound: 1050 },
  { time: '10:00', inbound: 1800, outbound: 1620 },
  { time: '12:00', inbound: 2200, outbound: 1980 },
  { time: '14:00', inbound: 2800, outbound: 2450 },
  { time: '16:00', inbound: 2100, outbound: 1890 },
  { time: '18:00', inbound: 1600, outbound: 1420 },
  { time: '20:00', inbound: 1100, outbound: 980 },
  { time: '22:00', inbound: 720, outbound: 640 },
];

export const stats = {
  totalDevices: 10,
  infected: 2,
  suspicious: 3,
  safe: 5,
  threatsToday: 7,
  blockedAttacks: 80,
  networkHealth: 68,
  uptime: '99.7%',
};
