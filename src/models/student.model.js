import { DataTypes } from "sequelize";
import sequelize from "../db";

const Student = sequelize.define("Student", {
    student_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default Student;
