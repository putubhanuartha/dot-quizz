import "./FormQuestions.css";
import useFetch from "../useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function FormQuestions() {
	const navigate = useNavigate();
	const { resData, isLoading } = useFetch(
		"https://opentdb.com/api_category.php"
	);
	useEffect(() => {
		const token = JSON.parse(window.localStorage.getItem("TOKEN"));
		if (token) {
			axios
				.get("http://localhost:5000/user", {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					if (!res.data.valid) {
						navigate("/login");
					}
				})
				.catch((err) => {
					navigate("/login");
				});
		} else {
			navigate("/login");
		}
	}, []);
	function handleSubmit(event: any): void {
		event.preventDefault();
		setTimeout(() => {
			navigate("/quiz", {
				state: {
					time: event.target.elements.time.value || 10,
					number_questions: event.target.elements.number_questions.value || 10,
					category: event.target.elements.category.value,
					difficulty: event.target.elements.difficulty.value,
					type: event.target.elements.type.value,
				},
			});
		}, 100);
		window.localStorage.clear();
		window.localStorage.setItem(
			"TIME",
			JSON.stringify(Number(event.target.elements.time.value) * 60)
		);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-lg px-5 py-7 max-w-lg w-full flex flex-col gap-y-2"
		>
			<div className="form-input-wrapper">
				<label htmlFor="time">Quiz Time (Minute)</label>
				<input
					type="number"
					name="time"
					id="time"
					defaultValue={10}
					min={1}
					max={20}
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="number_questions">Number of Questions</label>
				<input
					type="number"
					name="number_questions"
					id="number_questions"
					defaultValue={10}
					min={5}
					max={20}
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="category">Select Category :</label>
				{isLoading ? (
					<div className="pulse bg-slate-300 w-full h-9 rounded-md"></div>
				) : (
					<select
						name="category"
						id="category"
						required
					>
						<option
							value=""
							selected
							disabled
						>
							Any Category
						</option>
						{resData.trivia_categories.map((el: any, index: number) => {
							return (
								<option
									key={index}
									value={el.id}
								>
									{el.name}
								</option>
							);
						})}
					</select>
				)}
			</div>

			<div className="form-input-wrapper">
				<label htmlFor="difficulty">Select Difficulty :</label>
				<select
					name="difficulty"
					id="difficulty"
					required
				>
					<option
						value=""
						selected
						disabled
					>
						Any Difficulty
					</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="type">Select Type :</label>
				<select
					name="type"
					id="type"
					required
				>
					<option
						value=""
						selected
						disabled
					>
						Any Type
					</option>
					<option value="multiple">Multiple</option>
					<option value="boolean">True / False</option>
				</select>
			</div>
			<button
				type="submit"
				className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
				disabled={isLoading}
			>
				Start Quiz
			</button>
		</form>
	);
}

export default FormQuestions;
