"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _batch = _interopRequireDefault(require("./batch.model"));

var _facultyAdviser = _interopRequireDefault(require("./faculty-adviser.model"));

var _grade = _interopRequireDefault(require("./grade.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Faculty = _db.default.define("Faculty", {
  faculty_id: {
    type: _sequelize.DataTypes.STRING,
    primaryKey: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  designation: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}); // defining one to many relation between faculty and batches table as guide
// Faculty.hasMany(Batch, {
//     foreignKey: {
//         name: "guide_id",
//     },
// });
// Faculty.hasOne(Grade,{
//     foreignKey: {
//         name: "graded_by",
//         allowNull: true,
//     },
// })


_grade.default.belongsTo(Faculty, {
  foreignKey: {
    name: "graded_by",
    allowNull: true
  }
}); // one facuty adviser can have many students - populate faculty_adviser table


Faculty.hasMany(_facultyAdviser.default, {
  foreignKey: {
    name: "faculty_id"
  }
});
var _default = Faculty;
exports.default = _default;