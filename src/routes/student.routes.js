import { Router } from "express";
import studentController from "../controllers/student.controller";
import { isAdmin, isFaculty, isStudent } from "../middlewares/auth.middleware";
const router = Router();

router.post("/student/login",studentController.studentLogin);
router.get("/student",isFaculty,studentController.getStudent)
router.get("/student/fa/:id",isFaculty,studentController.getFA)
router.post("/student/grade/:studentId",isFaculty,studentController.grade)
router.put("/student/grade/update/:id",isFaculty,studentController.updateGrade)
router.get("/students/batch/:batchId",isFaculty,studentController.getStudentsByBatch)

// bulk create 
router.post("/students",studentController.studentBulkRegister)

export default router;