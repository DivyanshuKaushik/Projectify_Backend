"use strict";

var _express = _interopRequireWildcard(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _serverlessHttp = _interopRequireDefault(require("serverless-http"));

var _db = require("./db");

var _batch = _interopRequireDefault(require("./models/batch.model"));

var _faculty = _interopRequireDefault(require("./models/faculty.model"));

var _project = _interopRequireDefault(require("./models/project.model"));

var _student = _interopRequireDefault(require("./models/student.model"));

var _faculty2 = _interopRequireDefault(require("./routes/faculty.routes"));

var _project2 = _interopRequireDefault(require("./routes/project.routes"));

var _batch2 = _interopRequireDefault(require("./routes/batch.routes"));

var _student2 = _interopRequireDefault(require("./routes/student.routes"));

var _panel = _interopRequireDefault(require("./routes/panel.routes"));

var _review = _interopRequireDefault(require("./routes/review.routes"));

var _panel2 = _interopRequireDefault(require("./models/panel.model"));

var _addDummyDataToDB = _interopRequireDefault(require("./utils/addDummyDataToDB"));

var _panelMember = _interopRequireDefault(require("./models/panel-member.model"));

var _facultyAdviser = _interopRequireDefault(require("./models/faculty-adviser.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const app = (0, _express.default)(); // connect to database

(0, _db.connectDB)(); // add dummy data to db
// addDummyDataToDB();
// parse request - incoming data

app.use(_express.default.json()); // cors config

app.use((0, _cors.default)()); // dotenv config - loading env secrets

_dotenv.default.config();

const PORT = process.env.PORT || 4000;
app.use("/api", _faculty2.default);
app.use("/api", _project2.default);
app.use("/api", _batch2.default);
app.use("/api", _student2.default);
app.use("/api", _panel.default);
app.use("/api", _review.default);
app.get("/", async (req, res) => {
  // await Faculty.create({ username: "faculty", password: "password", name: "Divyanshu",department:'cse',designation:'hod' });
  // await Batch.create({ status: "status", report: "report", facultyId:2 });
  // await Project.create({ name: "ProjectX1",comments:'comments' },{include:[Student]});
  // await Student.create({ username: "abhijeet", password: "password", name: "Abhijeet",sec:'A',batchId:1,projectId:1 });
  // const student = await Student.findAll();
  // const faculty = await Faculty.findAll();
  // const batch = await Batch.findAll();
  // const project = await Project.findAll();
  // // console.log("Jane's auto-generated ID:", jane.id);
  // res.json({ status: true, message: "Our node.js app works",faculty ,batch,student,project});
  // const p  = await Panel.findAll();
  // console.log(p);
  const panel_1 = await _panel2.default.findOne({
    where: {
      panel_id: 1
    },
    include: [_faculty.default, {
      model: _panelMember.default,
      include: [{
        model: _faculty.default,
        attributes: {
          exclude: ["password", "faculty_id"]
        }
      }, {
        model: _batch.default,
        include: [_student.default]
      }]
    }]
  });
  res.json({
    status: true,
    message: "Our node.js app works",
    panel_1
  });
});
app.listen(PORT, () => console.log(`App listening at port ${PORT}`)); // "build": "rimraf dist && babel src --out-dir dist  --copy-files",
// "build": "rm -rf dist && webpack --mode development",
// export default handler = serverless(app)