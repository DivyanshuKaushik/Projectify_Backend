"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authControllers = {
  async loginFaculty(req, res) {
    try {} catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error
      });
    }
  },

  async registerFaculty(req, res) {
    try {} catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error
      });
    }
  }

};
var _default = authControllers;
exports.default = _default;