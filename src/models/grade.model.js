import { DataTypes } from "sequelize";
import sequelize from "../db";
import Faculty from "./faculty.model";

const Grade = sequelize.define("Grade", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  grade: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phase: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

});

// Grade.belongsTo(Faculty,{
//     foreignKey: {
//         name: "graded_by",
//         allowNull: true,
//     },
// })

export default Grade;
