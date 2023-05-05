import "./FormQuestions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
	const navigate = useNavigate();
	function handleSubmit(event: any) {
		event.preventDefault();
		const email = event.target.elements.email.value;
		const password = event.target.elements.password.value;
		axios
			.post(
				"http://localhost:5000/user-login",
				{ email, password },
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((res: any) => {
				window.localStorage.clear();
				window.localStorage.setItem(
					"TOKEN",
					JSON.stringify(res.data.accessToken)
				);
				navigate("/questions-form");
			})
			.catch((err) => {
				alert("password atau username salah");
			});
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-lg px-5 py-7 max-w-lg w-full flex flex-col gap-y-2"
		>
			<h4 className="font-semibold text-2xl text-center">LOGIN</h4>
			<div className="form-input-wrapper">
				<label htmlFor="time">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="number_questions">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
				/>
			</div>

			<div className="flex items-center gap-x-3">
				<button
					type="submit"
					className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
				>
					Start Quiz
				</button>
				<Link
					to={"/signup"}
					className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
				>
					Signup
				</Link>
			</div>
		</form>
	);
}

export default Login;
