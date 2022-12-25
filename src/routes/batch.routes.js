import { Router } from "express";
import batchController from "../controllers/batch.controller";
import { isFaculty } from "../middlewares/auth.middleware";
const router = Router();

router.get("/batch/student/:studentId",batchController.getStudentBatch);
router.get("/batch/:id",batchController.getBatch);
router.get("/batch",batchController.getAllBatches);
router.patch("/batch/grade",isFaculty,batchController.gradeBatch);

export default router;