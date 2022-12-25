import { Router } from "express";
import projectController from "../controllers/project.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/project/:id",projectController.getProjectById);
router.post("/project/comment/:id",projectController.comment)

export default router;