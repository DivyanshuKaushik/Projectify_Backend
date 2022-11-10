import { Router } from "express";
import facultyControllers from "../controllers/faculty.controller";
import { isFaculty } from "../middlewares/auth.middleware";

const router = Router();
// faculty login 
router.post("/faculty/login",facultyControllers.facultyLogin)

// get faculty details
router.get("/faculty",isFaculty,facultyControllers.getFaculty);

// get faculty batch details including students 
router.get("/faculty/batches",isFaculty,facultyControllers.getBatches);



export default router;