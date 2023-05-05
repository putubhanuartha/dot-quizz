import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUser = async (req, res) => {
	try {
		res.json({ valid: true });
	} catch (err) {
		res.json({ valid: false, msg: err });
	}
};

export const registerUser = async (req, res) => {
	const { username, email, password, confirm_password } = req.body;
	if (password != confirm_password) {
		res
			.status(400)
			.json({ message: "password and confirm password not equal" });
	}
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		await User.create({
			username: username,
			password: hashPassword,
			email: email,
		});
		res
			.status(200)
			.json({ message: "data credential user berhasil ditambahkan" });
	} catch (err) {
		console.log(err);
	}
};

export const loginUser = async (req, res) => {
	try {
		const user = await User.findAll({ where: { email: req.body.email } });
		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (!match)
			return res.status(404).json({ message: "email atau password salah" });
		const userId = user[0].id_user;
		const username = user[0].username;
		const email = user[0].email;
		const accessToken = jwt.sign(
			{ email, userId, username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(404).json({ message: "email atau password salah" });
	}
};

export const logoutUser = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.sendStatus(401);
	const user = await User.findAll({
		where: {
			refresh_token: refreshToken,
		},
	});
	if (!user[0]) return res.sendStatus(204);
	const userId = user[0].id_user;
	await User.update(
		{ refresh_token: null },
		{
			where: {
				id_user: userId,
			},
		}
	);
	res.clearCookie("refreshToken");
	return res.sendStatus(200);
};
