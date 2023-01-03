import { DataTypes } from "sequelize";
import sequelize from "../db";

const Review = sequelize.define("Review", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    deadline:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});


export default Review;
