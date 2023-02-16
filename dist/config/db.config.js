"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  HOST: "projectifydb.cztjekqh3yoj.ap-south-1.rds.amazonaws.com",
  PORT: 3306,
  USER: "admin",
  PASSWORD: "projectifydb",
  DB: "projectifydb",
  ssl: "Amazon RDS",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}; // export default {
//   HOST: "localhost",
//   PORT: 3306,
//   USER: "root",
//   PASSWORD: "password",
//   DB: "projectify",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

exports.default = _default;