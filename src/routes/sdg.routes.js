import { Router } from "express";
import sdgController from "../controllers/sdg.controller";
import {
  isAdmin,
  isAuthenticated,
  isFaculty,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/sdg", isAuthenticated, sdgController.getSdg);
router.delete("/sdg/:id", isAdmin, sdgController.deleteSdg);
router.post("/sdg", isAdmin, sdgController.createSdg);
router.put("/sdg", isAdmin, sdgController.updateSdg);

export default router;
