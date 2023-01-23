import { Router } from "express";
import reviewController from "../controllers/review.controller";
import { isAdmin, isFaculty } from "../middlewares/auth.middleware";

const router = Router();

router.get("/reviews", isFaculty, reviewController.getAllReviews);

router.get("/review/:id", isFaculty, reviewController.getReviewById);

router.get("/reviews/:batch", isFaculty, reviewController.getReviewByBatch);

router.post("/review", isAdmin, reviewController.createReview);

router.delete("/review/:id", isAdmin, reviewController.deleteReview);

export default router;
