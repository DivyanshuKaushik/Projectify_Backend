"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Review = _db.default.define("Review", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  batch: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  phase: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  deadline: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  fields: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  }
});

var _default = Review;
exports.default = _default;