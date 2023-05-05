import { Sequelize } from "sequelize";
const db = new Sequelize("db_quiz_dot", "root", "", {
	host: "localhost",
	dialect: "mariadb",
});
export default db;
