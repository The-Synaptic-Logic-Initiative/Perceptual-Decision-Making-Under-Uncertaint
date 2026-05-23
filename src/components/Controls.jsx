import React from 'react';

export default function Controls({ params, setParams, onRun }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="control-group">
        <div className="control-label">
          <span>Drift Rate (μ)</span>
          <span>{params.drift.toFixed(2)}</span>
        </div>
        <input 
          type="range" name="drift" className="control-slider"
          min="0.0" max="2.0" step="0.05" value={params.drift} onChange={handleChange} 
        />
        <div className="control-hint">Signal strength (evidence accumulation rate)</div>
      </div>
      
      <div className="control-group">
        <div className="control-label">
          <span>Noise (σ)</span>
          <span>{params.noise.toFixed(2)}</span>
        </div>
        <input 
          type="range" name="noise" className="control-slider"
          min="0.1" max="2.0" step="0.1" value={params.noise} onChange={handleChange} 
        />
        <div className="control-hint">Sensory / internal noise level</div>
      </div>

      <div className="control-group">
        <div className="control-label">
          <span>Threshold (θ)</span>
          <span>{params.threshold.toFixed(2)}</span>
        </div>
        <input 
          type="range" name="threshold" className="control-slider"
          min="0.5" max="3.0" step="0.1" value={params.threshold} onChange={handleChange} 
        />
        <div className="control-hint">Decision boundary (caution level)</div>
      </div>

      <div className="control-group">
        <div className="control-label">
          <span>Bias (β)</span>
          <span>{params.bias.toFixed(2)}</span>
        </div>
        <input 
          type="range" name="bias" className="control-slider"
          min="-1.0" max="1.0" step="0.1" value={params.bias} onChange={handleChange} 
        />
        <div className="control-hint">Starting point offset (prior preference)</div>
      </div>

      <button className="btn-primary" onClick={onRun}>
        Run Simulation
      </button>
    </div>
  );
}
