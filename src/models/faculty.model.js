import { DataTypes } from "sequelize";
import sequelize from "../db";
import Batch from "./batch.model";

const Faculty = sequelize.define("Faculty", {
    username: {
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
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// defining one to many relation between faculty and batches table
Faculty.hasMany(Batch, {
    foreignKey: {
        name: "facultyId",
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
    },
});

export default Faculty;
