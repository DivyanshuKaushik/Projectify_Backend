import { Router } from "express";
import facultyControllers from "../controllers/faculty.controller";
import { isFaculty } from "../middlewares/auth.middleware";

const router = Router();
// faculty auth routes 
router.post("/faculty/login",facultyControllers.facultyLogin)
router.post("/faculty/register",facultyControllers.facultyRegister)
router.post("/faculty/bulkRegister",facultyControllers.facultyBulkRegister)
router.patch("/faculty/changePassword",facultyControllers.changePassword)

// get faculty details
router.get("/faculty",isFaculty,facultyControllers.getFaculty);

// get faculty batch details including students 
router.get("/faculty/batches",isFaculty,facultyControllers.getBatches);

// get student details by faculty advisor

router.get("/faculty/students",isFaculty,facultyControllers.getStudentsByFaculty);


export default router;