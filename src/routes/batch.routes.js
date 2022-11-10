import { Router } from "express";
import batchController from "../controllers/batch.controller";
import { isFaculty } from "../middlewares/auth.middleware";
const router = Router();

router.patch("/batch/grade",isFaculty,batchController.gradeBatch);

export default router;