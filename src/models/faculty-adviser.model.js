import { DataTypes } from "sequelize";
import sequelize from "../db";
import Student from "./student.model";

const FacultyAdviser = sequelize.define("FacultyAdviser", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

export default FacultyAdviser;

// each student has one faculty adviser 
FacultyAdviser.belongsTo(Student,{
    foreignKey: {
        name: "student_id",
    },
})

