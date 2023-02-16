import { Router } from "express";
import projectController from "../controllers/project.controller";
import {
  isAdmin,
  isAuthenticated,
  isFaculty,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/project/:id", isAuthenticated, projectController.getProjectById);
router.post("/project/comment/:id", isAuthenticated, projectController.comment);

// bulk create
router.post("/projects", isAdmin, projectController.createProjects);
router.put("/projects/name", isFaculty, projectController.updateProjectName);
router.put("/projects/sdg", isFaculty, projectController.updateProjectSdg);

export default router;
