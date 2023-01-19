"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _student = _interopRequireDefault(require("./student.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Project = _db.default.define("Project", {
  id: {
    type: _sequelize.DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  comments: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  }
});

Project.hasMany(_student.default, {
  foreignKey: {
    name: "project_id",
    allowNull: true // onDelete: "CASCADE",
    // onUpdate: "CASCADE",

  }
});
var _default = Project;
exports.default = _default;