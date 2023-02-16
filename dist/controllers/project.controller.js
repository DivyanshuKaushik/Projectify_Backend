"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _project = _interopRequireDefault(require("../models/project.model"));

var _sdg = _interopRequireDefault(require("../models/sdg.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const projectController = {
  async getProjectById(req, res) {
    try {
      const {
        id
      } = req.params;
      const project = await _project.default.findByPk(id, {
        include: {
          model: _sdg.default
        }
      });
      return res.status(200).json((0, _utils.Response)(200, "Success", project));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async comment(req, res) {
    try {
      const {
        id
      } = req.params;
      const project = await _project.default.update({
        comments: req.body.comments
      }, {
        where: {
          id
        }
      });
      return res.status(200).json((0, _utils.Response)(200, "Success", project));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createProjects(req, res) {
    try {
      const {
        projects
      } = req.body;

      if (!projects.length) {
        return res.status(400).json((0, _utils.Response)(400, "Empty projects"));
      }

      await _project.default.bulkCreate(projects);
      return res.status(200).json((0, _utils.Response)(200, "projects created successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async updateProjectName(req, res) {
    try {
      const {
        id,
        name
      } = req.body;

      if (!id, !name) {
        return res.status(400).json((0, _utils.Response)(400, "Id and name are required"));
      }

      const project = await _project.default.update({
        name
      }, {
        where: {
          id
        }
      });
      return res.status(200).json((0, _utils.Response)(200, "Project name updated successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async updateProjectSdg(req, res) {
    try {
      const {
        id,
        sdg_id
      } = req.body;

      if (!id, !sdg_id) {
        return res.status(400).json((0, _utils.Response)(400, "Id and sdg_id are required"));
      }

      const project = await _project.default.update({
        sdg_id
      }, {
        where: {
          id
        }
      });
      return res.status(200).json((0, _utils.Response)(200, "Project sdg_id updated successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = projectController;
exports.default = _default;