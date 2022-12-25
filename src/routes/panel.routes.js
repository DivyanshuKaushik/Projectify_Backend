import { Router } from "express";
import panelController from "../controllers/panel.controller";
import { isFaculty } from "../middlewares/auth.middleware";
const router = Router();

router.get('/panel',panelController.getPanel)

export default router;