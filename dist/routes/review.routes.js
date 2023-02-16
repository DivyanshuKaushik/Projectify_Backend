"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _review = _interopRequireDefault(require("../controllers/review.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/reviews", _auth.isFaculty, _review.default.getAllReviews);
router.get("/review/:id", _auth.isFaculty, _review.default.getReviewById);
router.get("/reviews/:batch", _auth.isFaculty, _review.default.getReviewByBatch);
router.post("/review", _auth.isAdmin, _review.default.createReview);
router.delete("/review/:id", _auth.isAdmin, _review.default.deleteReview);
var _default = router;
exports.default = _default;