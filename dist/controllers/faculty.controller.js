"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _batch = _interopRequireDefault(require("../models/batch.model"));

var _student = _interopRequireDefault(require("../models/student.model"));

var _project = _interopRequireDefault(require("../models/project.model"));

var _faculty = _interopRequireDefault(require("../models/faculty.model"));

var _panelMember = _interopRequireDefault(require("../models/panel-member.model"));

var _facultyAdviser = _interopRequireDefault(require("../models/faculty-adviser.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const facultyControllers = {
  async facultyLogin(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const faculty = await _faculty.default.findOne({
        where: {
          email
        }
      });

      if (!faculty) {
        return res.json((0, _utils.Response)(400, "User doesn't exist"));
      }

      const isPasswordValid = await (0, _utils.verifyHash)(password, faculty.password);

      if (!isPasswordValid) {
        return res.json((0, _utils.Response)(400, "Invalid Credentials"));
      }

      const accessToken = (0, _utils.generateToken)({
        faculty_id: faculty.faculty_id,
        email: faculty.email,
        role: faculty.role
      });
      const data = faculty.dataValues;
      return res.json((0, _utils.Response)(200, "Login successful", _objectSpread(_objectSpread({}, data), {}, {
        accessToken
      })));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async facultyRegister(req, res) {
    try {
      let {
        faculty_id,
        email,
        password,
        name,
        mobile,
        designation,
        role
      } = req.body;
      const faculty = await _faculty.default.findOne({
        where: {
          faculty_id
        }
      });

      if (faculty) {
        return res.json((0, _utils.Response)(400, "User already exists"));
      }

      password = await (0, _utils.hash)(password);
      const newFaculty = await _faculty.default.create({
        faculty_id,
        email,
        password,
        name,
        mobile,
        designation,
        role
      });
      return res.json((0, _utils.Response)(201, "Registration successful"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async facultyBulkRegister(req, res) {
    try {
      let {
        faculties
      } = req.body;
      faculties = await Promise.all(faculties.map(async faculty => {
        let pass = await (0, _utils.hash)(faculty.password);
        return _objectSpread(_objectSpread({}, faculty), {}, {
          password: pass
        });
      }));
      await _faculty.default.bulkCreate(faculties);
      return res.json((0, _utils.Response)(201, "Registration successful"));
    } catch (error) {
      console.log(error);
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async createFacultyAdvisers(req, res) {
    try {
      const {
        facultyAdvisers
      } = req.body;

      if (!facultyAdvisers.length) {
        return res.status(400).json((0, _utils.Response)(400, "Empty facultyAdvisers"));
      }

      await _facultyAdviser.default.bulkCreate(facultyAdvisers);
      return res.status(200).json((0, _utils.Response)(200, "facultyAdvisers created successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async changePassword(req, res) {
    try {
      const {
        facultyId,
        oldPassword,
        newPassword
      } = req.body;
      const faculty = await _faculty.default.findOne({
        where: {
          faculty_id: facultyId
        }
      });

      if (!faculty) {
        return res.json((0, _utils.Response)(400, "User doesn't exist"));
      }

      const verifyOldPassword = await (0, _utils.verifyHash)(oldPassword, faculty.password);

      if (!verifyOldPassword) {
        return res.json((0, _utils.Response)(400, "Invalid Credentials"));
      }

      const newHashedPassword = await (0, _utils.hash)(newPassword);
      await _faculty.default.update({
        password: newHashedPassword
      }, {
        where: {
          faculty_id: facultyId
        }
      });
      return res.json((0, _utils.Response)(201, "Password Updated successfully"));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getFaculty(req, res) {
    try {
      const {
        facultyId
      } = req.query;
      const data = await _faculty.default.findByPk(facultyId);
      return res.status(200).json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getBatches(req, res) {
    try {
      const {
        facultyId
      } = req.query;
      const data = await _panelMember.default.findAll({
        where: {
          faculty_id: facultyId
        },
        include: [{
          model: _batch.default,
          include: [_student.default]
        }]
      });
      return res.status(200).json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  },

  async getStudentsByFaculty(req, res) {
    try {
      const {
        facultyId
      } = req.query;
      const data = await _facultyAdviser.default.findAll({
        where: {
          faculty_id: facultyId
        },
        include: [{
          model: _student.default,
          attributes: {
            exclude: ["password"]
          }
        }]
      });
      return res.status(200).json((0, _utils.Response)(200, "Success", data));
    } catch (error) {
      return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
    }
  }

};
var _default = facultyControllers;
exports.default = _default;