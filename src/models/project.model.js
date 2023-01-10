import { DataTypes } from "sequelize";
import sequelize from "../db";
import Student from "./student.model";

const Project = sequelize.define("Project", {
  id:{
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Project.hasMany(Student, {
  foreignKey: {
    name: "project_id",
    allowNull: true,
    // onDelete: "CASCADE",
    // onUpdate: "CASCADE",
  },
});

export default Project;
