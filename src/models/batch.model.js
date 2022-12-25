import { DataTypes } from "sequelize";
import sequelize from "../db";
import Student from "./student.model";

const Batch = sequelize.define("Batch", {
    batch_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    remarks:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// defining one to many relation between faculty and batches table
Batch.hasMany(Student, {
    foreignKey: {
        name: "batch_id",
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
    },
});

export default Batch;
