import { letterFrequency } from "./Components/letterFrequency";

export const getGameLetters = (answer: string, cols: number, rows: number) => {
	const allLetters = [];

	const getRandCol = () => Math.ceil(Math.random() * cols);
	const getRandNum = (max) => Math.floor(Math.random() * max);

	const numNeeded = cols * rows;
	const fillerLetters = [];
	const letterKeys = Object.keys(letterFrequency);
	const answerArr = answer.split("");

	/**
	 * Building filler characters and nulls
	 */
	let count = 0;

	for (let i = 0; count < numNeeded; i++) {
		const letter = letterKeys[i];
		console.log(answer);
		const countInAnswer =
			answerArr.filter((l) => l.toLowerCase() === letter.toLowerCase())
				.length ?? 0;
		const numLetter =
			(numNeeded * letterFrequency[letter]) / 100 - countInAnswer;
		for (let n = 0; n < numLetter; n++) {
			fillerLetters.push(letter);
			count++;
		}
	}

	/**
	 * Building  nested array of total letters
	 */

	for (let row = 0; row < rows; row++) {
		if (!allLetters[row]) allLetters.push([]);
		const ansLetterCol = getRandCol();
		for (let col = 0; col < cols; col++) {
			if (col === ansLetterCol - 1) {
				if (row >= answer.length) {
					const newIndex = row % answer.length;

					const newLetter = answer[newIndex];
					allLetters[row].push(newLetter);
				} else {
					allLetters[row].push(answer[row ?? 0]);
				}
			} else if (getRandNum(5) > 1) {
				allLetters[row].push(null);
			} else {
				allLetters[row].push(fillerLetters[getRandNum(numNeeded)]);
			}
		}
	}
	return allLetters;
};
