import { Router } from "express";
import studentController from "../controllers/student.controller";
import { isStudent } from "../middlewares/auth.middleware";
const router = Router();

router.post("/student/login",studentController.studentLogin);
router.get("/student",studentController.getStudent)
router.get("/student/fa/:id",studentController.getFA)
router.patch("/student/grade/:id",studentController.updateGrade)
router.get("/students/batch/:batchId",studentController.getStudentsByBatch)

export default router;