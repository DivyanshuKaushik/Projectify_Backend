"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _batch = _interopRequireDefault(require("../models/batch.model"));

var _faculty = _interopRequireDefault(require("../models/faculty.model"));

var _panelMember = _interopRequireDefault(require("../models/panel-member.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const batchController = {
  async getStudentBatch(req, res) {
    try {
      const {
        studentId
      } = req.params;
      const batch = await _batch.default.findOne({
        where: {
          student_id: studentId
        }
      });
      return res.json((0, _utils.Response)(200, "Success", batch));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getBatch(req, res) {
    try {
      const {
        id
      } = req.params;
      const batch = await _batch.default.findOne({
        where: {
          batch_id: id
        }
      });
      const panelMember = await _panelMember.default.findOne({
        where: {
          id: batch.panel_member_id
        },
        include: {
          model: _faculty.default,
          attributes: {
            exclude: ["password", "faculty_id"]
          }
        }
      });
      return res.json((0, _utils.Response)(200, "Success", {
        batch,
        panelMember
      }));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getAllBatches(req, res) {
    try {
      const batches = await _batch.default.findAll();
      return res.json((0, _utils.Response)(200, "Success", batches));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async gradeBatch(req, res) {
    try {
      const {
        id,
        status
      } = req.body;
      const batch = await _batch.default.findByPk(id);

      if (!batch) {
        return res.status(400).json((0, _utils.Response)(400, "Batch not found"));
      }

      batch.status = status;
      await batch.save();
      return res.status(200).json((0, _utils.Response)(200, "Batch graded successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createBatches(req, res) {
    try {
      const {
        batches
      } = req.body;

      if (!batches.length) {
        return res.status(400).json((0, _utils.Response)(400, "Empty Batches"));
      }

      await _batch.default.bulkCreate(batches);
      return res.status(200).json((0, _utils.Response)(200, "Batches created successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = batchController;
exports.default = _default;