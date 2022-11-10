import { DataTypes } from "sequelize";
import sequelize from "../db";

const Student = sequelize.define("Student", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sec:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Student;
