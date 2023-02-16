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
    name: "id",
    allowNull: true,
  },
});

export default Project;
