import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import Question from "../components/Question";
import axios from "axios";
export interface IMyProps {
	question_part: {
		question: string;
		shuffledAnswer: [];
		correct_answer: string;
	};
	number_questions: number;
	stateFunc: {};
	digitalTime: string;
}
export interface ObjAnswer {
	index: number;
	answered: string;
	correct: string;
}

function Quiz() {
	const navigate = useNavigate();
	let state = useLocation().state;
	if (state) {
		window.localStorage.setItem("STATE", JSON.stringify(state));
	}
	if (state == null) {
		state = JSON.parse(window.localStorage.getItem("STATE"));
	}
	console.log(state);
	const [time, setTime] = useState(
		Number(JSON.parse(window.localStorage.getItem("TIME")))
	);
	let fetchResponse: { resData: {}; isLoading: boolean; isError: {} };
	fetchResponse = useFetch(
		`https://opentdb.com/api.php?amount=${state.number_questions}&&category=${state.category}&&difficulty=${state.difficulty}&&type=${state.type}`
	);

	// React Hooks

	const [indexQuestions, setIndexQuestions] = useState(0);
	const [cleanedData, setCleanedData] = useState([]);
	const [answeredQuestions, setAnsweredQuestions] = useState<ObjAnswer[]>([]);
	useEffect(() => {
		let sti: number;
		if (!fetchResponse.isLoading) {
			if (time > 0) {
				sti = setInterval(() => {
					const seconds = Number(
						JSON.parse(window.localStorage.getItem("TIME"))
					);
					window.localStorage.setItem("TIME", JSON.stringify(seconds - 1));
					setTime((time) => time - 1);
				}, 1000);
			}
			return () => {
				clearInterval(sti);
			};
		}
	}, [fetchResponse.isLoading]);

	// local storage management
	useEffect(() => {
		const data = window.localStorage.getItem("ARRAY_QUESTIONS");
		const answered = window.localStorage.getItem("ANSWERED_QUESTIONS");
		if (data) {
			setCleanedData(JSON.parse(data));
		}
		if (answered) {
			setAnsweredQuestions(JSON.parse(answered));
			setIndexQuestions(JSON.parse(answered).length);
		}
		
	}, []);

	useEffect(() => {
		if (
			!fetchResponse.isLoading &&
			fetchResponse.resData &&
			window.localStorage.getItem("ARRAY_QUESTIONS") == null
		) {
			window.localStorage.setItem(
				"ARRAY_QUESTIONS",
				JSON.stringify(mapShuffleQuestions())
			);
			setCleanedData(mapShuffleQuestions());
		}
	}, [fetchResponse.isLoading, fetchResponse.resData]);
	useEffect(() => {
		if (answeredQuestions.length > 0) {
			window.localStorage.setItem(
				"ANSWERED_QUESTIONS",
				JSON.stringify(answeredQuestions)
			);
		}
	}, [answeredQuestions]);

	// function
	function mapShuffleQuestions() {
		const data = fetchResponse.resData.results.map((el: any): {} => {
			return {
				...el,
				shuffledAnswer: shuffleArray([
					...el.incorrect_answers,
					el.correct_answer,
				]),
			};
		});
		return data;
	}
	function shuffleArray(array: any): [] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	function digitalTime(time: number): string {
		const second = time % 60;
		const minute = Math.floor(time / 60);
		return `${minute} : ${second}`;
	}

	// handle render and redirect
	if (fetchResponse.isError.isError) {
		return <p>Error ...</p>;
	}
	if (fetchResponse.isLoading || cleanedData.length === 0) {
		return <p>Loading ...</p>;
	}
	if (indexQuestions == state.number_questions || time === 0) {
		setTimeout(() => {
			navigate("/result", {
				state: { answeredQuestions, number_questions: state.number_questions },
				replace: true,
			});
		}, 1000);
		return <p>Redirecting ...</p>;
	}

	return (
		<>
			<Question
				number_questions={state.number_questions}
				question_part={cleanedData[indexQuestions]}
				digitalTime={digitalTime(time)}
				stateFunc={{
					setAnsweredQuestions,
					setIndexQuestions,
					indexQuestions,
					answeredQuestions,
				}}
			/>
		</>
	);
}

export default Quiz;
