"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _faculty = _interopRequireDefault(require("./faculty.model"));

var _panelMember = _interopRequireDefault(require("./panel-member.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Panel = _db.default.define("Panel", {
  panel_id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true
  }
});

var _default = Panel; // panel has one panel head that belongsTo Faculty

exports.default = _default;
Panel.belongsTo(_faculty.default, {
  foreignKey: {
    name: "panel_head_id"
  }
}); // panel has many members 

Panel.hasMany(_panelMember.default, {
  foreignKey: {
    name: "panel_id"
  }
});