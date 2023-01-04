import { DataTypes } from "sequelize";
import sequelize from "../db";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  batch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Review;
