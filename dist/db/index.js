"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../config/db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.Sequelize(_db.default.DB, _db.default.USER, _db.default.PASSWORD, {
  host: _db.default.HOST,
  dialect: _db.default.dialect,
  operatorsAliases: 0,
  pool: {
    max: _db.default.pool.max,
    min: _db.default.pool.min,
    acquire: _db.default.pool.acquire,
    idle: _db.default.pool.idle
  }
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // await sequelize.sync({ force: true })

    console.log("database synced"); // const users = await sequelize.query("SELECT * FROM `clients`", { type: QueryTypes.SELECT });
    // console.log(users);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

var _default = sequelize;
exports.default = _default;