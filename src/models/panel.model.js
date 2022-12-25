import { DataTypes } from "sequelize";
import sequelize from "../db";
import Faculty from "./faculty.model";
import PanelMember from "./panel-member.model";

const Panel = sequelize.define("Panel", {
    panel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});
export default Panel;

// panel has one panel head that belongsTo Faculty
Panel.belongsTo(Faculty, {
    foreignKey: {
        name: "panel_head_id",
    },
});

// panel has many members 
Panel.hasMany(PanelMember,{
    foreignKey: {
        name: "panel_id",
    },
})

