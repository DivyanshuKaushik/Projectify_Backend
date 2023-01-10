"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _batch = _interopRequireDefault(require("../controllers/batch.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/batch/student/:studentId", _auth.isFaculty, _batch.default.getStudentBatch);
router.get("/batch/:id", _auth.isFaculty, _batch.default.getBatch);
router.get("/batch", _auth.isFaculty, _batch.default.getAllBatches);
router.patch("/batch/grade", _auth.isFaculty, _batch.default.gradeBatch); // bulk create 

router.post("/batches", _auth.isAdmin, _batch.default.createBatches);
var _default = router;
exports.default = _default;