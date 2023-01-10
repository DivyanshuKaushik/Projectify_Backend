"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _student = _interopRequireDefault(require("../controllers/student.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/student/login", _student.default.studentLogin);
router.get("/student", _auth.isFaculty, _student.default.getStudent);
router.get("/student/fa/:id", _auth.isFaculty, _student.default.getFA);
router.patch("/student/grade/:id", _auth.isFaculty, _student.default.updateGrade);
router.get("/students/batch/:batchId", _auth.isFaculty, _student.default.getStudentsByBatch); // bulk create 

router.post("/students", _student.default.studentBulkRegister);
var _default = router;
exports.default = _default;