import { Router } from "express";
import studentController from "../controllers/student.controller";
import { isStudent } from "../middlewares/auth.middleware";
const router = Router();

router.post("/student/login",studentController.studentLogin);
router.get("/student",isStudent,studentController.getStudent)

router.get("/student/batch/:batchId",isStudent,studentController.getStudentBatch)

export default router;