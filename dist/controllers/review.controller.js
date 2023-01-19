"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _review = _interopRequireDefault(require("../models/review.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reviewController = {
  async getAllReviews(req, res) {
    try {
      const data = await _review.default.findAll();
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getReviewById(req, res) {
    try {
      const data = await _review.default.findByPk(req.params.id);
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createReview(req, res) {
    try {
      const {
        deadline,
        batch,
        phase
      } = req.body;
      const data = await _review.default.create({
        deadline,
        batch,
        phase,
        fields
      });
      return res.json((0, _utils.Response)(200, "Review created successfully", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getReviewByBatch(req, res) {
    try {
      //   console.log(req.params);
      const data = await _review.default.findAll({
        where: {
          batch: req.params.batch
        }
      });
      return res.json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = reviewController;
exports.default = _default;