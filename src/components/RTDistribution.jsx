import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RTDistribution({ data }) {
  const { chartData, meanRTCorect, meanRTError } = useMemo(() => {
    const bins = Array.from({ length: 25 }, (_, i) => ({
      bin: (i * 0.2).toFixed(1),
      correct: 0,
      error: 0
    }));

    let sumC = 0, countC = 0;
    let sumE = 0, countE = 0;

    data.trials.forEach(t => {
      const isCorrect = t.correct;
      const rt = t.rt;
      
      if (isCorrect) {
        sumC += rt; countC++;
      } else {
        sumE += rt; countE++;
      }

      const binIndex = Math.min(24, Math.floor(rt / 0.2));
      if (isCorrect) {
        bins[binIndex].correct++;
      } else {
        bins[binIndex].error++;
      }
    });

    return {
      chartData: bins,
      meanRTCorect: countC > 0 ? sumC / countC : 0,
      meanRTError: countE > 0 ? sumE / countE : 0
    };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
        <div style={{ color: '#2dd4bf', fontSize: '0.9rem', fontWeight: 500 }}>Mean Correct: {meanRTCorect.toFixed(2)}s</div>
        <div style={{ color: '#fb7185', fontSize: '0.9rem', fontWeight: 500 }}>Mean Error: {meanRTError.toFixed(2)}s</div>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="bin" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Bar dataKey="correct" name="Correct" fill="#2dd4bf" opacity={0.8} />
            <Bar dataKey="error" name="Error" fill="#fb7185" opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
