import { DataTypes } from "sequelize";
import sequelize from "../db";

const Sdg = sequelize.define("Sdg", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  objective: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
export default Sdg;
