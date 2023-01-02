import { Router } from "express";
import projectController from "../controllers/project.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/project/:id",isAuthenticated,projectController.getProjectById);
router.post("/project/comment/:id",isAuthenticated,projectController.comment)

export default router;