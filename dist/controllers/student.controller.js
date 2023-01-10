"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _batch = _interopRequireDefault(require("../models/batch.model"));

var _facultyAdviser = _interopRequireDefault(require("../models/faculty-adviser.model"));

var _faculty = _interopRequireDefault(require("../models/faculty.model"));

var _student = _interopRequireDefault(require("../models/student.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const studentController = {
  async studentLogin(req, res) {
    try {
      const {
        username,
        password
      } = req.body;
      const student = await _student.default.findOne({
        where: {
          username
        }
      });

      if (!student) {
        return res.json((0, _utils.Response)(400, "User doesn't exist"));
      }

      const isPasswordValid = await (0, _utils.verifyHash)(password, student.password);

      if (!isPasswordValid) {
        return res.json((0, _utils.Response)(400, "Invalid username or password"));
      }

      const accessToken = (0, _utils.generateToken)({
        id: student.id,
        username: student.username,
        role: "student"
      });
      const data = student.dataValues;
      return res.json((0, _utils.Response)(200, "Login successful", _objectSpread(_objectSpread({}, data), {}, {
        accessToken
      })));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async studentBulkRegister(req, res) {
    try {
      let {
        students
      } = req.body;
      students = await Promise.all(students.map(async student => {
        let pass = await (0, _utils.hash)(student.password);
        return _objectSpread(_objectSpread({}, student), {}, {
          password: pass
        });
      }));
      await _student.default.bulkCreate(students);
      return res.json((0, _utils.Response)(201, "Registration successful"));
    } catch (error) {
      console.log(error);
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getStudent(req, res) {
    try {
      const {
        studentId
      } = req.query;
      const user = await _student.default.findByPk(studentId);

      if (!user) {
        return res.json((0, _utils.Response)(400, "User doesn't exist"));
      }

      return res.json((0, _utils.Response)(200, "Success", user));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getStudentsByBatch(req, res) {
    try {
      const {
        batchId
      } = req.params;
      const batch = await _student.default.findAll({
        where: {
          batch_id: batchId
        }
      });
      return res.json((0, _utils.Response)(200, "Success", batch));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getFA(req, res) {
    try {
      const {
        id
      } = req.params;
      const data = await _facultyAdviser.default.findOne({
        where: {
          student_id: id
        }
      });
      const fa = await _faculty.default.findOne({
        where: {
          faculty_id: data.faculty_id
        }
      });
      return res.json((0, _utils.Response)(200, "Success", {
        fa: data,
        faculty: fa
      }));
    } catch (error) {
      console.log(error);
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async updateGrade(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        grade
      } = req.body;
      const data = await _student.default.update({
        grade
      }, {
        where: {
          student_id: id
        }
      });
      return res.json((0, _utils.Response)(200, "Updated grade successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = studentController;
exports.default = _default;