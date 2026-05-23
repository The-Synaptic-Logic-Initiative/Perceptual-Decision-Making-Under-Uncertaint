export function randn() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Winitzki's approximation for inverse error function
function erfinv(x) {
  const a = 0.147;
  const ln1minusx2 = Math.log(1 - x * x);
  const part1 = 2 / (Math.PI * a) + ln1minusx2 / 2;
  const part2 = ln1minusx2 / a;
  const sign = x < 0 ? -1 : 1;
  const inner = Math.max(0, part1 * part1 - part2);
  return sign * Math.sqrt(Math.max(0, Math.sqrt(inner) - part1));
}

// Inverse CDF of standard normal
function z(p) {
  p = Math.max(0.001, Math.min(0.999, p));
  return Math.sqrt(2) * erfinv(2 * p - 1);
}

export function runSimulation(driftBase, noise, threshold, bias, numTrials = 200) {
  const dt = 0.01;
  const maxTime = 5.0;
  const sqrtDt = Math.sqrt(dt);
  
  const trials = [];
  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejections = 0;
  
  for (let i = 0; i < numTrials; i++) {
    // 50% signal (+drift), 50% noise (-drift)
    const isSignal = i % 2 === 0;
    const drift = isSignal ? driftBase : -driftBase;
    
    let x = bias;
    let t = 0;
    const trajectory = [];
    if (i < 5) trajectory.push({ t, x });
    
    let choice = 0;
    let rt = maxTime;
    
    while (t < maxTime) {
      x += drift * dt + noise * sqrtDt * randn();
      t += dt;
      if (i < 5) trajectory.push({ t, x });
      
      if (x >= threshold) {
        choice = 1;
        rt = t;
        break;
      } else if (x <= -threshold) {
        choice = -1;
        rt = t;
        break;
      }
    }
    
    if (isSignal) {
      if (choice === 1) hits++;
      else misses++;
    } else {
      if (choice === 1) falseAlarms++;
      else correctRejections++;
    }
    
    trials.push({
      id: i,
      isSignal,
      choice,
      rt,
      trajectory: i < 5 ? trajectory : null,
      correct: (isSignal && choice === 1) || (!isSignal && choice === -1)
    });
  }
  
  const hr = hits / (hits + misses || 1);
  const far = falseAlarms / (falseAlarms + correctRejections || 1);

  const zHR = z(hr);
  const zFAR = z(far);
  const dPrime = zHR - zFAR;
  const criterion = -0.5 * (zHR + zFAR);

  return {
    trials,
    stats: { hits, misses, falseAlarms, correctRejections, hr, far, dPrime, criterion }
  };
}
