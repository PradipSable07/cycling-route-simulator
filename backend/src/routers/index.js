import {Router} from "express";
import simulationRouter from "./simulationRouter.js";
import routesRouter from "./routesRouter.js";
const router = Router();


router.use("/routes",routesRouter);
router.use("/simulate",simulationRouter );

export default router;