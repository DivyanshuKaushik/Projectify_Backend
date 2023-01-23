import { DataTypes } from "sequelize";
import sequelize from "../db";
import FacultyAdviser from "./faculty-adviser.model";
import Grade from "./grade.model";

const Student = sequelize.define("Student", {
  student_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // grade: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // graded_by: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  batch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;

// Student.hasOne(FacultyAdviser,{
//     foreignKey: {
//         name: "student_id",
//         allowNull: true,
//     },
// })

Student.hasMany(Grade,{
    foreignKey: {
        name: "student_id",
        allowNull: true,
    },
})