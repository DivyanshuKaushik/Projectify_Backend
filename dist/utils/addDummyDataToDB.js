"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _faculty = _interopRequireDefault(require("../dummy/faculty.json"));

var _facultyAdviser = _interopRequireDefault(require("../dummy/faculty-adviser.json"));

var _batches = _interopRequireDefault(require("../dummy/batches.json"));

var _students = _interopRequireDefault(require("../dummy/students.json"));

var _projects = _interopRequireDefault(require("../dummy/projects.json"));

var _panel = _interopRequireDefault(require("../dummy/panel.json"));

var _panelMembers = _interopRequireDefault(require("../dummy/panel-members.json"));

var _faculty2 = _interopRequireDefault(require("../models/faculty.model"));

var _panel2 = _interopRequireDefault(require("../models/panel.model"));

var _panelMember = _interopRequireDefault(require("../models/panel-member.model"));

var _batch = _interopRequireDefault(require("../models/batch.model"));

var _project = _interopRequireDefault(require("../models/project.model"));

var _student = _interopRequireDefault(require("../models/student.model"));

var _facultyAdviser2 = _interopRequireDefault(require("../models/faculty-adviser.model"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function addDummyDataToDB() {
  try {
    //   const faculties =  await Promise.all(facultyData.map(async (faculty) => {
    //     let pass = await hash(faculty.password)
    //     return {...faculty,password: pass}
    // }))
    await _faculty2.default.bulkCreate(_faculty.default);
    await _panel2.default.bulkCreate(_panel.default);
    await _panelMember.default.bulkCreate(_panelMembers.default);
    const batches = await Promise.all(_batches.default.map(async batch => {
      const pm_id = await _panelMember.default.findOne({
        where: {
          faculty_id: batch.panel_member_id
        }
      });
      return _objectSpread(_objectSpread({}, batch), {}, {
        panel_member_id: pm_id.id
      });
    }));
    await _batch.default.bulkCreate(batches);
    await _project.default.bulkCreate(_projects.default);
    await _student.default.bulkCreate(_students.default);
    await _facultyAdviser2.default.bulkCreate(_facultyAdviser.default); // await Promise.all( facultyAdviserData.forEach(async (facultyAdviser) => {
    //   try {
    //     await FacultyAdviser.create(facultyAdviser)
    //   } catch (error) {
    //       console.log(facultyAdviser);
    //   }
    // }))
    // console.log("Created Admin Account");
  } catch (err) {
    console.error(err);
  }
}

var _default = addDummyDataToDB;
exports.default = _default;