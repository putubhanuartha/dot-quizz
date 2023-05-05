import { DataTypes } from "sequelize";
import db from "../config/database.js";
const User = db.define(
	"user",
	{
		id_user: {
			primaryKey: true,
			allowNull: false,
			unique: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		refresh_token: {
			type: DataTypes.TEXT,
		},
	},
	{ initialAutoIncrement: 100, freezeTableName: true }
);
User.sync({ alter: true }).then(() => {
	console.log("User table sync ...");
});
export default User;
