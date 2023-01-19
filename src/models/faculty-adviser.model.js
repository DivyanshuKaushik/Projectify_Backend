import { DataTypes } from "sequelize";
import sequelize from "../db";
import Student from "./student.model";

const FacultyAdviser = sequelize.define("FacultyAdviser", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    section: {
        type: DataTypes.STRING,
    },
});

export default FacultyAdviser;

// each student has one faculty adviser
// FacultyAdviser.belongsTo(Student,{
//     foreignKey: {
//         name: "student_id",
//         allowNull: true,
//     },
// })
