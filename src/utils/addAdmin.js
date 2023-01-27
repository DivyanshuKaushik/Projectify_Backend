import adminData from "../demo/admin.json";
// models import
import Faculty from "../models/faculty.model";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Batch from "../models/batch.model";
import Project from "../models/project.model";
import Student from "../models/student.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import { hash } from ".";

async function addAdmin() {
  try {
    await Faculty.bulkCreate(adminData);
    console.log("Created Admin Account");
  } catch (err) {
    console.error(err);
  }
}

export default addAdmin;
