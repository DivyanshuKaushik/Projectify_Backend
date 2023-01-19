"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _faculty = _interopRequireDefault(require("./faculty.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Grade = _db.default.define("Grade", {
  id: {
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true
  },
  grade: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  phase: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  }
});

Grade.belongsTo(_faculty.default, {
  foreignKey: {
    name: "graded_by",
    allowNull: true
  }
});
var _default = Grade;
exports.default = _default;