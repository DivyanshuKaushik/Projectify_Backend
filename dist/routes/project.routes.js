"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _project = _interopRequireDefault(require("../controllers/project.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/project/:id", _auth.isAuthenticated, _project.default.getProjectById);
router.post("/project/comment/:id", _auth.isAuthenticated, _project.default.comment); // bulk create 

router.post("/projects", _auth.isAdmin, _project.default.createProjects);
var _default = router;
exports.default = _default;