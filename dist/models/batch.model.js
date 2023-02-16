"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _faculty = _interopRequireDefault(require("./faculty.model"));

var _student = _interopRequireDefault(require("./student.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Batch = _db.default.define("Batch", {
  batch_id: {
    type: _sequelize.DataTypes.STRING,
    primaryKey: true
  },
  remarks: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}); // defining one to many relation between faculty and batches table


Batch.hasMany(_student.default, {
  foreignKey: {
    name: "batch_id",
    allowNull: true // onDelete: "CASCADE",
    // onUpdate: "CASCADE",

  }
});
Batch.belongsTo(_faculty.default, {
  as: "guide",
  foreignKey: {
    name: "guide_id",
    allowNull: true
  }
});
var _default = Batch;
exports.default = _default;