import { Router } from "express";
import projectController from "../controllers/project.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/project/:id",isAuthenticated,projectController.getProjectById);

export default router;