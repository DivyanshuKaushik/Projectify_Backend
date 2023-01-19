"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _batch = _interopRequireDefault(require("./batch.model"));

var _faculty = _interopRequireDefault(require("./faculty.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PanelMember = _db.default.define("PanelMember", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

var _default = PanelMember; // each panel member belongs to a faculty 

exports.default = _default;
PanelMember.belongsTo(_faculty.default, {
  foreignKey: {
    name: "faculty_id"
  }
}); // panel member can have many batches 

PanelMember.hasMany(_batch.default, {
  foreignKey: {
    name: "panel_member_id"
  }
});