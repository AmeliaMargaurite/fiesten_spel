"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { items } from "../../Components/answer";
import { ItemType } from "../../page";

const MAX_ROUND_NUM = items.length - 1;

type AnswerBoxProps = {
	newLetter: string | null;
	count: number;
	setItem: (ItemType) => void;
	round: number;
	setPlayerWon: (boolean) => void;
	setGameOver: (boolean) => void;
};

export const AnswerBox = ({
	newLetter = null,
	count,
	setItem,
	round,
	setPlayerWon,
	setGameOver,
}: AnswerBoxProps) => {
	const [currentAnswer, setCurrentAnswer] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [currentGuess, setCurrentGuess] = useState(null);
	const [currentPos, setCurrentPos] = useState(0);

	const _ref = {
		currentAnswer,
		currentQuestion,
		currentGuess,
		currentPos,
		round,
	};
	const ref = useRef(_ref);
	ref.current = _ref;

	useEffect(() => {
		const newItem = round <= MAX_ROUND_NUM ? items[round] : items[0];
		setItem(newItem);
		setCurrentQuestion(newItem.question);
		setCurrentAnswer(newItem.answer);
		setCurrentGuess(newItem.answer.replaceAll(/\w/g, "_ "));
		setCurrentPos(0);
		if (round > MAX_ROUND_NUM) {
			setGameOver(true);
		}
	}, [round]);

	useEffect(() => {
		const { currentAnswer, currentGuess, currentPos, round } = ref.current;
		if (
			currentAnswer === null ||
			currentGuess === null ||
			currentQuestion === null
		) {
			setCurrentQuestion(items[round].question);
			setCurrentAnswer(items[round].answer);
			setCurrentGuess(items[round].answer.replaceAll(/\w/g, "_ "));
		} else if (currentGuess.toUpperCase() === currentAnswer.toUpperCase()) {
			setPlayerWon(true);
		} else if (newLetter && currentAnswer[currentPos] === newLetter) {
			setCurrentPos(currentPos + 1);
			setCurrentGuess(currentGuess.replace("_ ", newLetter));
		}
	}, [count]);

	return (
		<div className="answer">
			<span className="question">The Dutch word for {currentQuestion}: </span>
			<span className="guess">{currentGuess}</span>
		</div>
	);
};
