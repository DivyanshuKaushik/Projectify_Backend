import { DataTypes } from "sequelize";
import sequelize from "../db";
import Sdg from "./sdg.model";
import Student from "./student.model";

const Project = sequelize.define("Project", {
  id: {
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
  sdg_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "project",
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

Project.hasOne(Sdg, {
  foreignKey: {
    name: "sdg_id",
    allowNull: true,
  },
});

export default Project;
