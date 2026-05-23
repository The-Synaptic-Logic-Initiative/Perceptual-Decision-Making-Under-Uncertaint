import React, { useState, useEffect, useCallback } from 'react';
import { runSimulation } from './utils/simulation';
import Controls from './components/Controls';
import Trajectory from './components/Trajectory';
import RTDistribution from './components/RTDistribution';
import Raster from './components/Raster';
import SDTPanel from './components/SDTPanel';

function App() {
  const [params, setParams] = useState({
    drift: 0.8,
    noise: 0.6,
    threshold: 1.5,
    bias: 0
  });

  const [data, setData] = useState(null);

  const handleRun = useCallback(() => {
    const res = runSimulation(params.drift, params.noise, params.threshold, params.bias, 200);
    setData(res);
  }, [params]);

  useEffect(() => {
    handleRun();
  }, [handleRun]);

  if (!data) return null;

  return (
    <div className="dashboard-container">
      <div className="panel controls-panel">
        <div className="panel-header">Perceptual Decision-Making</div>
        <Controls params={params} setParams={setParams} onRun={handleRun} />
      </div>
      
      <div className="panel trajectory-panel">
        <div className="panel-header">DDM Trajectory (Sample Trials)</div>
        <Trajectory data={data} threshold={params.threshold} />
      </div>

      <div className="panel raster-panel">
        <div className="panel-header">Spiking Accumulator Neurons</div>
        <Raster data={data} threshold={params.threshold} />
      </div>

      <div className="panel rt-panel">
        <div className="panel-header">Reaction Time Distribution</div>
        <RTDistribution data={data} />
      </div>

      <div className="panel sdt-panel">
        <div className="panel-header">Signal Detection Theory Analysis</div>
        <SDTPanel data={data} />
      </div>
    </div>
  );
}

export default App;
