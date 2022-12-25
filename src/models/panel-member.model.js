import { DataTypes } from "sequelize";
import sequelize from "../db";
import Batch from "./batch.model";
import Faculty from "./faculty.model";

const PanelMember = sequelize.define("PanelMember", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
export default PanelMember;

// each panel member belongs to a faculty 
PanelMember.belongsTo(Faculty, {
    foreignKey: {
        name: "faculty_id",
    },
});

// panel member can have many batches 
PanelMember.hasMany(Batch,{
    foreignKey: {
        name: "panel_member_id",
    },
})

