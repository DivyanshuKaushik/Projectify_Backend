"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _panel = _interopRequireDefault(require("../controllers/panel.controller"));

var _auth = require("../middlewares/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/panel', _auth.isAdmin, _panel.default.getPanels);
router.get('/panel/:id', _auth.isPanelHead, _panel.default.getPanelById);
router.get('/panelByFacultyId/:id', _auth.isPanelHead, _panel.default.getPanelByFaculty); // bulk create 

router.post("/panels", _auth.isAdmin, _panel.default.createPanels);
router.post("/panel/members", _auth.isAdmin, _panel.default.createPanelMembers);
var _default = router;
exports.default = _default;