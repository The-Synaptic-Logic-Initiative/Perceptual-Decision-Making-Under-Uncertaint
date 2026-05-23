import React, { useEffect, useState, useRef } from 'react';

export default function Trajectory({ data, threshold }) {
  const canvasRef = useRef(null);
  const [stepLimit, setStepLimit] = useState(0);
  
  const sampleTrials = data.trials.filter(t => t.trajectory !== null);
  const maxSteps = Math.max(...sampleTrials.map(t => t.trajectory.length));
  
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
  }, [data, maxSteps]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxTime = 5.0; // from simulation maxTime
    const padX = 40;
    const padY = 20;
    const drawW = width - padX * 2;
    const drawH = height - padY * 2;
    
    const yMax = Math.max(3.0, threshold + 0.5);
    
    const mapX = (t) => padX + (t / maxTime) * drawW;
    const mapY = (val) => padY + (1 - (val + yMax) / (2 * yMax)) * drawH;

    // Draw zero line
    ctx.beginPath();
    ctx.strokeStyle = '#334155'; // border-color
    ctx.lineWidth = 1;
    ctx.moveTo(mapX(0), mapY(0));
    ctx.lineTo(mapX(maxTime), mapY(0));
    ctx.stroke();

    // Draw thresholds
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#94a3b8'; // text-muted
    
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(threshold));
    ctx.lineTo(mapX(maxTime), mapY(threshold));
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(-threshold));
    ctx.lineTo(mapX(maxTime), mapY(-threshold));
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter';
    ctx.fillText('+θ', 15, mapY(threshold) + 4);
    ctx.fillText('-θ', 15, mapY(-threshold) + 4);
    ctx.fillText('0', 20, mapY(0) + 4);
    ctx.fillText('Time (s)', width / 2, height - 5);

    // Draw trajectories
    sampleTrials.forEach(trial => {
      const traj = trial.trajectory;
      const len = Math.min(traj.length, stepLimit);
      if (len === 0) return;
      
      ctx.beginPath();
      ctx.moveTo(mapX(traj[0].t), mapY(traj[0].x));
      
      for (let i = 1; i < len; i++) {
        ctx.lineTo(mapX(traj[i].t), mapY(traj[i].x));
      }
      
      // Determine color
      let color = '#64748b'; // gray if still running
      if (len === traj.length) {
        if (trial.choice === 1) color = '#2dd4bf'; // teal
        else if (trial.choice === -1) color = '#fb7185'; // coral
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [data, threshold, stepLimit, sampleTrials]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={340} 
        style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
}
