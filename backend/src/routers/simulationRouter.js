import { Router } from "express";
import * as simulationController from "../controllers/simulateControllers.js"


const router = Router()

router.post('/start', simulationController.startSimulation);

router.post('/pause', simulationController.pauseSimulation);

router.post('/reset', simulationController.resetSimulation);

router.get('/status', simulationController.simulationStatus);

export default router