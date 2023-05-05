import express from "express";
import db from "./config/database.js";
import Router from "./routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const port = 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Router);
app.get("/", (req, res) => {
	res.send("Hello World");
});

db.authenticate()
	.then(async () => {
		app.listen(port, () => {
			console.log("server is running ...");
		});
	})
	.catch((err) => {
		console.log(err);
	});
