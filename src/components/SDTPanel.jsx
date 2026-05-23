import React from 'react';

function getGaussianPath(mu, sigma, width, height, xMin, xMax) {
  const points = [];
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
    
    const px = ((x - xMin) / (xMax - xMin)) * width;
    const py = height - (y / 0.45) * height;
    
    points.push(`${px},${py}`);
  }
  return `M ${points.join(' L ')}`;
}

export default function SDTPanel({ data }) {
  const { stats } = data;
  const { dPrime, criterion } = stats;

  const width = 500;
  const height = 150;
  const xMin = -4;
  const xMax = 4;

  const noisePath = getGaussianPath(0, 1, width, height, xMin, xMax);
  const signalPath = getGaussianPath(dPrime, 1, width, height, xMin, xMax);

  const cx = ((criterion - xMin) / (xMax - xMin)) * width;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="sdt-stats">
        <div className="stat-box" style={{ flex: 1 }}>
          <div className="stat-label">Sensitivity (d')</div>
          <div className="stat-value">{dPrime.toFixed(2)}</div>
        </div>
        <div className="stat-box" style={{ flex: 1 }}>
          <div className="stat-label">Criterion (c)</div>
          <div className="stat-value coral">{criterion.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, position: 'relative', marginTop: '10px' }}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`} 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <path d={`${noisePath} L ${width} ${height} L 0 ${height} Z`} fill="rgba(251, 113, 133, 0.2)" />
          <path d={noisePath} fill="none" stroke="#fb7185" strokeWidth="2" />

          <path d={`${signalPath} L ${width} ${height} L 0 ${height} Z`} fill="rgba(45, 212, 191, 0.2)" />
          <path d={signalPath} fill="none" stroke="#2dd4bf" strokeWidth="2" />

          <line x1={cx} y1={0} x2={cx} y2={height} stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1={0} y1={height} x2={width} y2={height} stroke="#334155" strokeWidth="1" />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#fb7185', borderRadius: '2px' }}></div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Noise</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#2dd4bf', borderRadius: '2px' }}></div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Signal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '2px', borderBottom: '2px dashed #e2e8f0' }}></div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Criterion (c)</span>
        </div>
      </div>
    </div>
  );
}
