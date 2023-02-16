"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _faculty = _interopRequireDefault(require("../controllers/faculty.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // faculty auth routes

router.post("/faculty/login", _faculty.default.facultyLogin);
router.post("/faculty/register", _faculty.default.facultyRegister); // bulk create

router.post("/faculty/bulkRegister", _auth.isAdmin, _faculty.default.facultyBulkRegister);
router.post("/faculty/advisers", _auth.isAdmin, _faculty.default.createFacultyAdvisers); // bulk create end

router.patch("/faculty/changePassword", _faculty.default.changePassword); // get faculty details

router.get("/faculty", _auth.isFaculty, _faculty.default.getFaculty); // get faculty batch details including students

router.get("/faculty/batches", _auth.isFaculty, _faculty.default.getBatches); // get student details by faculty advisor

router.get("/faculty/students", _auth.isFaculty, _faculty.default.getStudentsByFaculty);
router.patch("/admin/data/flush", _auth.isFaculty, _faculty.default.flushDatabase);
router.patch("/admin/data/clear", _auth.isFaculty, _faculty.default.clearDatabase);
var _default = router;
exports.default = _default;