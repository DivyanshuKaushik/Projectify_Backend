import adminData from "../demo/admin.json";
import facultyData from "../dummy/faculty.json";
import facultyAdviserData from "../dummy/fa.json";
import batchData from "../dummy/batches.json";
import studentData from "../dummy/student1.json";
import projectData from "../dummy/projects.json";
import panelData from "../dummy/panel.json";
import panelMemberData from "../dummy/panel-members.json";
import sdgData from "../dummy/sdgs.json";
// models import
import Faculty from "../models/faculty.model";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Batch from "../models/batch.model";
import Project from "../models/project.model";
import Student from "../models/student.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import Sdg from "../models/sdg.model";
import { hash } from ".";

async function addDummyDataToDB() {
  try {
    //   const faculties =  await Promise.all(facultyData.map(async (faculty) => {
    //     let pass = await hash(faculty.password)
    //     return {...faculty,password: pass}
    // }))
    // await Faculty.bulkCreate(adminData);
    
    // await Faculty.bulkCreate(facultyData);
    // await Panel.bulkCreate(panelData);
    // panelMemberData?.forEach(async (panelMember) => {
    //   try {
    //     const f = await Faculty.findOne({
    //       where: { faculty_id: panelMember.faculty_id },
    //     });
    //     if (!f){
    //       console.log(panelMember);
    //     }
    //     await PanelMember.create(panelMember);
    //   } catch (error) {
    //     console.log(panelMember);
    //   }
    // });

    // await PanelMember.bulkCreate(panelMemberData);
    // const batches = await Promise.all(
    //   batchData.map(async (batch) => {
    //     const pm_id = await PanelMember.findOne({
    //       where: { faculty_id: batch.panel_member_id },
    //     });
    //     if(!pm_id.id){
    //       console.log(pm_id,batch);
    //     }
    //     return { ...batch, panel_member_id: pm_id.id ? pm_id.id : 87 };
    //   })
    // );
    // await Batch.bulkCreate(batches);
    // await Project.bulkCreate(projectData);
    // await Student.bulkCreate(studentData);
    // let students = []
    // await Promise.all(studentData.forEach(async (student) => {
    //   try {
    //     await Student.create(student);
    //   } catch (error) {
    //     // console.log(student);
    //     students.push(student)
    //   }
    // }));
    // console.log(students);
    await FacultyAdviser.bulkCreate(facultyAdviserData);
    await Sdg.bulkCreate(sdgData);

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
