import { DataTypes } from "sequelize";
import sequelize from "../db";
import Batch from "./batch.model";
import FacultyAdviser from "./faculty-adviser.model";

const Faculty = sequelize.define("Faculty", {
    faculty_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// // defining one to many relation between faculty and batches table
// Faculty.hasMany(Batch, {
//     foreignKey: {
//         name: "facultyId",
//         allowNull: true,
//         // onDelete: "CASCADE",
//         // onUpdate: "CASCADE",
//     },
// });

// one facuty adviser can have many students - populate faculty_adviser table
Faculty.hasMany(FacultyAdviser,{
    foreignKey: {
        name: "faculty_id",
    },
})

export default Faculty;
