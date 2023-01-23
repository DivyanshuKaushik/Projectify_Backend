import { DataTypes } from "sequelize";
import sequelize from "../db";
import Faculty from "./faculty.model";
import Student from "./student.model";

const Batch = sequelize.define("Batch", {
    batch_id:{
        type: DataTypes.STRING,
        primaryKey: true,
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

Batch.belongsTo(Faculty,{
    as: "guide",
    foreignKey: {
        name: "guide_id",
        allowNull: true,
    }
})

export default Batch;
