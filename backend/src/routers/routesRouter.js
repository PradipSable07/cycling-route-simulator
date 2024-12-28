import {Router} from "express";
import * as routesController from "../controllers/routesControllers.js";
  

const router = Router();


router.get("/", routesController.getAllRoutesHandler);
router.post("/", routesController.createNewRoute);
router.get("/:id",routesController.getRouteByIdHandler );
router.put("/:id", routesController.updateRouteHandler);
router.delete("/:id", routesController.deleteRouteHandler);


export default router;