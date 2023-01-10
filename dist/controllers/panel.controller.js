"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _panel = _interopRequireDefault(require("../models/panel.model"));

var _panelMember = _interopRequireDefault(require("../models/panel-member.model"));

var _faculty = _interopRequireDefault(require("../models/faculty.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const panelController = {
  async getPanels(req, res) {
    try {
      const data = await _panel.default.findAll({
        include: [_faculty.default, {
          model: _panelMember.default,
          include: [{
            model: _faculty.default,
            attributes: {
              exclude: ["password", "faculty_id"]
            }
          }]
        }]
      });
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getPanelById(req, res) {
    try {
      const data = await _panel.default.findOne({
        where: {
          panel_id: req.params.id
        },
        include: [_faculty.default, {
          model: _panelMember.default,
          include: [{
            model: _faculty.default,
            attributes: {
              exclude: ["password", "faculty_id"]
            }
          }]
        }]
      });
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getPanelByFaculty(req, res) {
    try {
      const data = await _panelMember.default.findOne({
        where: {
          faculty_id: req.params.id
        },
        include: [{
          model: _faculty.default,
          attributes: {
            exclude: ["password", "faculty_id"]
          }
        }]
      });
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createPanels(req, res) {
    try {
      const {
        panels
      } = req.body;

      if (!panels.length) {
        return res.status(400).json((0, _utils.Response)(400, "Empty Panels"));
      }

      await _panel.default.bulkCreate(panels);
      return res.status(200).json((0, _utils.Response)(200, "Panels created successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createPanelMembers(req, res) {
    try {
      const {
        panelMembers
      } = req.body;

      if (!panelMembers.length) {
        return res.status(400).json((0, _utils.Response)(400, "Empty PanelMembers"));
      }

      await _panelMember.default.bulkCreate(panelMembers);
      return res.status(200).json((0, _utils.Response)(200, "PanelMembers created successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = panelController;
exports.default = _default;