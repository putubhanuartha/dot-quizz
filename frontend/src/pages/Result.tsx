import { useLocation } from "react-router-dom";
import "./Result.css";
import { useEffect } from "react";
function Result() {

	const { state } = useLocation();
	
	function countResult(answeredQuestions: any, number_questions: number) {
		let correctAnswer = 0;
		for (let i = 0; i < answeredQuestions.length; i++) {
			if (answeredQuestions[i].answered === answeredQuestions[i].correct) {
				correctAnswer++;
			}
		}
		return {
			correctAnswer,
			wrongAnswer: answeredQuestions.length - correctAnswer,
			emptyAnswer: number_questions - answeredQuestions.length,
		};
	}
	const { correctAnswer, wrongAnswer, emptyAnswer } = countResult(
		state.answeredQuestions,
		Number(state.number_questions)
	);

	return (
		<div
			id="result-card"
			className="max-w-lg w-full bg-white rounded-md shadow-md py-7 px-5"
		>
			<h4 className="text-center font-semibold text-2xl">Your Result Score</h4>
			<div className="mt-4 flex flex-col gap-y-2 ">
				<p>
					Correct Answer : <span>{correctAnswer}</span>
				</p>
				<p>
					Wrong Answer : <span>{wrongAnswer}</span>
				</p>
				<p>
					Not Answered : <span>{emptyAnswer}</span>
				</p>
			</div>
		</div>
	);
}

export default Result;
