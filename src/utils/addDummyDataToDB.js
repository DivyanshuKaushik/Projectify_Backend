import facultyData from "../../demo/faculty.json";
import facultyAdviserData from "../../demo/faculty-adviser.json";
import batchData from "../../demo/batches.json";
import studentData from "../../demo/student.json";
import projectData from "../../demo/projects.json";
import panelData from "../../demo/panel.json";
import panelMemberData from "../../demo/panel-members.json";
import Faculty from "../models/faculty.model";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Batch from "../models/batch.model";
import Project from "../models/project.model";
import Student from "../models/student.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import adminData from "../../demo/admin.json";
import studentsData from "../../demo/students.json";
import batchesData from "../../demo/Batchdata.json";
async function addDummyDataToDB() {
  try {
    // await Faculty.bulkCreate(facultyData);
    // await Panel.bulkCreate(panelData);
    // await PanelMember.bulkCreate(panelMemberData);
    // await Batch.bulkCreate(batchData);
    // await Project.bulkCreate(projectData);
    // await Student.bulkCreate(studentData);
    // await Batch.bulkCreate(batchesData);
    // await Student.bulkCreate(studentsData);
    // await FacultyAdviser.bulkCreate(facultyAdviserData);
    // await Faculty.bulkCreate(adminData);
    // console.log("Created Admin Account");
  } catch (err) {
    console.error(err);
  }
}

export default addDummyDataToDB;
