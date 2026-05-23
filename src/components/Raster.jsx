import React, { useMemo, useEffect, useState } from 'react';
import { generateRasterSpikes } from '../utils/simulation';

export default function Raster({ data, threshold }) {
  const [stepLimit, setStepLimit] = useState(0);

  const { spikes, maxSteps } = useMemo(() => {
    const firstTraj = data.trials.find(t => t.trajectory !== null)?.trajectory;
    const generated = generateRasterSpikes(firstTraj, threshold);
    return { 
      spikes: generated, 
      maxSteps: firstTraj ? firstTraj.length : 0 
    };
  }, [data, threshold]);

  useEffect(() => {
    setStepLimit(0);
    const interval = setInterval(() => {
      setStepLimit(prev => {
        if (prev >= maxSteps) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [maxSteps]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 500 }}>Choice A Population</span>
        <span style={{ color: '#fb7185', fontSize: '0.85rem', fontWeight: 500 }}>Choice B Population</span>
      </div>
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 500 200" 
          preserveAspectRatio="none" 
          style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid #334155' }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`l-${i}`} x1="0" y1={i * 10 + 5} x2="500" y2={i * 10 + 5} stroke="#334155" strokeWidth="0.5" />
          ))}
          
          {spikes.filter(s => (s.t / 0.01) <= stepLimit).map((spike, i) => {
            const cx = (spike.t / 5.0) * 500;
            const cy = spike.neuron * 10 + 5;
            const fill = spike.neuron < 10 ? '#2dd4bf' : '#fb7185';
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill={fill} opacity={0.8} />;
          })}
        </svg>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Time (s)</span>
      </div>
    </div>
  );
}
