import { FC } from "react";
import { IMyProps } from "../pages/Quiz";

const Question: FC<IMyProps> = (props: IMyProps): JSX.Element => {
	const {
		setAnsweredQuestions,
		setIndexQuestions,
		indexQuestions,
		answeredQuestions,
	} = props.stateFunc;
	function handleButtonAnswer(el: string): void | any {
		setAnsweredQuestions([
			...answeredQuestions,
			{
				index: indexQuestions,
				answered: el,
				correct: props.question_part.correct_answer,
			},
		]);
		setIndexQuestions((indexQuestions: number) => indexQuestions + 1);
	}

	return (
		<div className="max-w-lg bg-white py-8 px-4 rounded-lg shadow-md w-full">
			<div className="flex justify-between items-center">
				<p className="font-semibold">
					{indexQuestions + 1} / {props.number_questions}
				</p>
				<p className="font-semibold text-xl bg-slate-400 w-16 rounded-md py-1 text-center text-slate-100">
					{props.digitalTime}
				</p>
			</div>
			<p className="max-w-full">{props.question_part.question}</p>
			<div className="flex flex-col mt-3 gap-y-2">
				{props.question_part.shuffledAnswer.map((el: string, index: number) => {
					return (
						<button
							onClick={() => {
								handleButtonAnswer(el);
							}}
							key={index}
							className="py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 hover:shadow-lg transition-all  duration-200"
						>
							{el}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Question;
