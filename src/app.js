import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from 'serverless-http'
import { connectDB } from "./db";
import Batch from "./models/batch.model";
import Faculty from "./models/faculty.model";
import Project from "./models/project.model";
import Student from "./models/student.model";
import facultyRouter from "./routes/faculty.routes";
import projectRouter from "./routes/project.routes";
import batchRouter from "./routes/batch.routes";
import studentRouter from "./routes/student.routes";
import panelRouter from "./routes/panel.routes";
import reviewRouter from "./routes/review.routes";

import Panel from "./models/panel.model";
import addDummyDataToDB from "./utils/addDummyDataToDB";
import PanelMember from "./models/panel-member.model";
import FacultyAdviser from "./models/faculty-adviser.model";

const app = express();

// connect to database
connectDB();

// add dummy data to db
// addDummyDataToDB();

// parse request - incoming data
app.use(express.json());

// cors config
app.use(cors());

// dotenv config - loading env secrets
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use("/api", facultyRouter);
app.use("/api", projectRouter);
app.use("/api", batchRouter);
app.use("/api", studentRouter);
app.use("/api", panelRouter);
app.use("/api", reviewRouter);

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
  const panel_1 = await Panel.findOne({
    where: { panel_id: 1 },
    include: [
      Faculty,
      {
        model: PanelMember,
        include: [
          {
            model: Faculty,
            attributes: { exclude: ["password", "faculty_id"] },
          },
          {model:Batch,include:[Student]}
        ],
      },
    ],
  });
  res.json({ status: true, message: "Our node.js app works", panel_1 });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
// "build": "rimraf dist && babel src --out-dir dist  --copy-files",
// "build": "rm -rf dist && webpack --mode development",

export default handler = serverless(app)