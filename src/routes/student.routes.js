import { Router } from "express";
import studentController from "../controllers/student.controller";
import { isFaculty, isStudent } from "../middlewares/auth.middleware";
const router = Router();

router.post("/student/login",studentController.studentLogin);
router.get("/student",isFaculty,studentController.getStudent)
router.get("/student/fa/:id",isFaculty,studentController.getFA)
router.patch("/student/grade/:id",isFaculty,studentController.updateGrade)
router.get("/students/batch/:batchId",isFaculty,studentController.getStudentsByBatch)

export default router;