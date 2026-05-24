# 🧠 Perceptual Decision-Making Under Uncertainty

An interactive React dashboard that models how the brain integrates noisy sensory evidence to make decisions. This computational neuroscience simulation combines the **Drift-Diffusion Model (DDM)**, **Spiking Neural Networks (SNN)**, and **Signal Detection Theory (SDT)** into a single, real-time visual environment.

![React](https://img.shields.io/badge/UI-React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)
![Recharts / D3](https://img.shields.io/badge/Charts-Recharts_%2F_D3-22b5bf)
![Math](https://img.shields.io/badge/Math-In--Browser-brightgreen)

> *The brain doesn't just check evidence once—it accumulates it. This project visualizes how sensory noise, evidence accumulation, and neural firing rates dictate both the speed and accuracy of human choices.*

---

## 🎯 What is this?

When you look at a blurry shape in the fog, how does your brain decide if it's a tree or a person? This project models that exact process. It moves away from simple "input-output" black boxes and instead visualizes decision-making as a dynamic process unfolding over time.

### The Three Core Concepts:

1. **Drift-Diffusion Model (DDM):** A mathematical framework where a "decision variable" accumulates evidence over time, drifting toward one of two choice thresholds while being buffered by random sensory noise. It perfectly captures the classic trade-off between speed (reaction time) and accuracy.
2. **Spiking Neural Networks (SNN):** We bridge the abstract math of DDM to biological reality. You can watch discrete spikes fire in a modeled neuron population, showing how evidence accumulation emerges physically from firing rates.
3. **Signal Detection Theory (SDT):** A framework to separate a system's sheer sensory sensitivity (how good the raw data is) from the agent's internal bias (how cautious or trigger-happy they are).

---

## ✨ Features

* **Interactive DDM Trajectory:** Tweak the drift rate, noise level, and decision thresholds, and watch the evidence accumulation trajectory animate live.
* **Reaction Time & Accuracy Distributions:** Instantly see how changing your parameters alters the shape of the reaction time curve and the ultimate accuracy rate.
* **Live Spiking Rasters:** A visual raster plot showing the discrete firing of the underlying accumulator neurons.
* **Real-time SDT Metrics:** Live calculations of Sensitivity ($d'$) and Response Criterion ($\beta$).
* **Zero Backend:** All complex integrations and mathematical models run instantly in the browser.

---

## 🔬 The Science (The Math Under the Hood)

### 1. The Drift-Diffusion Process
The core of the simulation updates the decision variable $x$ over time $t$ using a stochastic differential equation:

$$dx = A \cdot dt + c \cdot dW$$

* $A$ is the **drift rate** (the strength of the actual evidence).
* $c$ is the **diffusion coefficient** (the magnitude of the noise).
* $dW$ represents standard Wiener noise (a random walk).
The decision is made the exact millisecond $x$ crosses the upper or lower boundary threshold ($a$ or $-a$).

### 2. Signal Detection Theory (SDT)
The dashboard calculates the system's ability to distinguish signal from noise using $d'$ (d-prime):

$$d' = Z(\text{Hit Rate}) - Z(\text{False Alarm Rate})$$

Where $Z$ is the inverse of the cumulative normal distribution. A higher $d'$ means the agent has a cleaner sensory signal, separate from their threshold placements.

---

## 🚀 Getting Started

This project is built using React and Vite for blazing-fast development.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/perceptual-decision-making.git](https://github.com/yourusername/perceptual-decision-making.git) 

2.Navigate to the directory:
  
    '''bash
    cd perceptual-decision-making

3. Install the dependencies:

       '''Bash
       npm install

4. Start the local development server:

       '''Bash
       npm run dev

5. Open your browser to the local host address provided by Vite.

## 🛠️ Tech Stack
Framework: React + Vite

Visualizations: Recharts / D3.js for high-performance graphs and raster plots.

Styling: CSS / Tailwind (or preferred styling solution) for a clean, scientific dashboard UI.

Logic: Pure JavaScript mathematical modeling (Euler-Maruyama method for stochastic integration).

## 📝 License
This project is MIT licensed. ![MIT]([https://img.shields.io/badge/UI-React-61DAFB?logo=react&logoColor=black](https://choosealicense.com/licenses/mit/))
