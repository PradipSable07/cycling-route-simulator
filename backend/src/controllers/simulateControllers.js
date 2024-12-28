import { Observable } from 'rxjs';

import io from '../server.js';
import redis from '../utils/radies.js';

let simulationInterval = null;
let simulationState = {
  isRunning: false,
  isPaused: false,
  currentStep: 0,
  route: [],
  totalSteps: 0,
};

// Store simulation state in Redis
const setSimulationState = async (key, value) => {
  await redis.set(key, JSON.stringify(value));
};

// Get simulation state from Redis
const getSimulationState = async (key) => {
  const state = await redis.get(key); 
  return state ? JSON.parse(state) : null; 
};

const Simulation = () => {
  return new Observable((observer) => {
    let step = 0;
    simulationInterval = setInterval(async () => {
      const state = await getSimulationState('simulationState'); 

      if (state.isPaused) {
        clearInterval(simulationInterval);
        return;
      }

      step++;
      if (step >= state.totalSteps) {
        clearInterval(simulationInterval);
        state.isRunning = false;
        state.currentStep = state.totalSteps - 1;
        await setSimulationState('simulationState', state);  // Save updated state in Redis
        io.emit('simulationComplete', { message: 'Simulation completed!' }); // Emit to WebSocket clients
        observer.complete();
      } else {
        state.currentStep = step;
        await setSimulationState('simulationState', state);  // Save updated state in Redis
        io.emit('simulationStep', { currentStep: step });  // Emit current step to clients via WebSocket
        observer.next(state.currentStep);
      }
    }, 1000);
  });
};


const  startSimulation = async (req, res, next) => {
    if (simulationState.isRunning) {
      return res.status(400).json({ message: 'Simulation already running' });
    }

    const { route } = req.body;

    if (!Array.isArray(route) || route.length === 0) {
        return res.status(400).json({ message: "Invalid or missing 'route' property in request body" });
      }
    simulationState.route = route;
    simulationState.totalSteps = route.length;
    simulationState.isRunning = true;
    simulationState.isPaused = false;
    simulationState.currentStep = 0;

    // Store initial state in Redis
    await setSimulationState('simulationState', simulationState);

    res.setHeader('Content-Type', 'application/json');
    res.flushHeaders();

    Simulation().subscribe({
      next: async (step) => {
        console.log(`Simulation step: ${step}`);
        res.write(JSON.stringify({ currentStep: step }));
      },
      complete: () => {
        res.end();
        console.log('Simulation completed.');
      },
    });
  }

 const pauseSimulation= async (req, res, next) => {
    if (!simulationState.isRunning) {
      return res.status(400).json({ message: 'Simulation is not running' });
    }

    simulationState.isPaused = true;
    clearInterval(simulationInterval);
    await setSimulationState('simulationState', simulationState); // Update Redis
    res.status(200).json({ message: 'Simulation paused' });
  }

const  resetSimulation= async (req, res, next) => {
    clearInterval(simulationInterval);
    simulationState = {
      isRunning: false,
      isPaused: false,
      currentStep: 0,
      route: [],
      totalSteps: 0,
    };
    await setSimulationState('simulationState', simulationState); // Reset Redis
    res.status(200).json({ message: 'Simulation reset' });
  }

 const simulationStatus= async (req, res, next) => {
    const state = await getSimulationState('simulationState'); // Fetch current state from Redis
    res.status(200).json({
      isRunning: state.isRunning,
      currentStep: state.currentStep,
    });
  }


export {startSimulation,pauseSimulation,resetSimulation,simulationStatus};
