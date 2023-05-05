import express from "express";
import { getUser } from "../controllers/user.controller.js";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const Router = express.Router();
Router.get("/user", verifyToken, getUser);
Router.post("/user-credentials", registerUser);
Router.post("/user-login", loginUser);

export default Router;
