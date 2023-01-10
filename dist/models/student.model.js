"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Student = _db.default.define("Student", {
  student_id: {
    type: _sequelize.DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  grade: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  batch: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});

var _default = Student;
exports.default = _default;