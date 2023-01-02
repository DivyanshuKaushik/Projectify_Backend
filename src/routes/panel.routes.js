import { Router } from "express";
import panelController from "../controllers/panel.controller";
import { isAdmin, isFaculty, isPanelHead } from "../middlewares/auth.middleware";
const router = Router();

router.get('/panel',isAdmin,panelController.getPanels)

router.get('/panel/:id',isPanelHead,panelController.getPanelById)

router.get('/panelByFacultyId/:id',isPanelHead,panelController.getPanelByFaculty)

export default router;