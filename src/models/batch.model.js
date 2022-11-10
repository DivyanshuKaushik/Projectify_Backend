import { DataTypes } from "sequelize";
import sequelize from "../db";
import Student from "./student.model";

const Batch = sequelize.define("Batch", {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    report: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// defining one to many relation between faculty and batches table
Batch.hasMany(Student, {
    foreignKey: {
        name: "batchId",
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
    },
});

export default Batch;
