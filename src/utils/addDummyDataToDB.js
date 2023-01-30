import adminData from "../demo/admin.json";
import facultyData from "../dummy/faculty.json";
import facultyAdviserData from "../dummy/faculty-adviser.json";
import batchData from "../dummy/batches.json";
import studentData from "../dummy/students.json";
import projectData from "../dummy/projects.json";
import panelData from "../dummy/panel.json";
import panelMemberData from "../dummy/panel-members.json";
// models import
import Faculty from "../models/faculty.model";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Batch from "../models/batch.model";
import Project from "../models/project.model";
import Student from "../models/student.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import { hash } from ".";

async function addDummyDataToDB() {
  try {
    //   const faculties =  await Promise.all(facultyData.map(async (faculty) => {
    //     let pass = await hash(faculty.password)
    //     return {...faculty,password: pass}
    // }))
    // await Faculty.bulkCreate(adminData);
    await Faculty.bulkCreate(facultyData);
    await Panel.bulkCreate(panelData);
    await PanelMember.bulkCreate(panelMemberData);
    const batches = await Promise.all(
      batchData.map(async (batch) => {
        const pm_id = await PanelMember.findOne({
          where: { faculty_id: batch.panel_member_id },
        });
        return { ...batch, panel_member_id: pm_id.id };
      })
    );
    await Batch.bulkCreate(batches);
    await Project.bulkCreate(projectData);
    await Student.bulkCreate(studentData);
    await FacultyAdviser.bulkCreate(facultyAdviserData);
    // await Promise.all( facultyAdviserData.forEach(async (facultyAdviser) => {
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

export default addDummyDataToDB;
