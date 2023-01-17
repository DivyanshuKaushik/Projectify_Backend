import { DataTypes } from "sequelize";
import sequelize from "../db";
import Faculty from "./faculty.model";
import Student from "./student.model";

const Grade = sequelize.define("Grade", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  grade: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  graded_by: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

Grade.hasOne(Student,{
    foreignKey: {
        name: "grade_id",
    },
})
export default Grade;
