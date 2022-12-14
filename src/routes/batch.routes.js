import { Router } from "express";
import batchController from "../controllers/batch.controller";
import { isAdmin, isFaculty } from "../middlewares/auth.middleware";
const router = Router();

router.get("/batch/student/:studentId",isFaculty,batchController.getStudentBatch);
router.get("/batch/:id",isFaculty,batchController.getBatch);
router.get("/batch",isFaculty,batchController.getAllBatches);
router.patch("/batch/grade",isFaculty,batchController.gradeBatch);

// bulk create 
router.post("/batches",isAdmin,batchController.createBatches)

export default router;