"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

var _student = _interopRequireDefault(require("./student.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FacultyAdviser = _db.default.define("FacultyAdviser", {
  id: {
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true
  },
  section: {
    type: _sequelize.DataTypes.STRING
  }
});

var _default = FacultyAdviser; // each student has one faculty adviser
// FacultyAdviser.belongsTo(Student,{
//     foreignKey: {
//         name: "student_id",
//         allowNull: true,
//     },
// })

exports.default = _default;