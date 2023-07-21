"use client";

import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import "./lanes.scss";

type LanesType = {
	count: number;
	allLetters: (string | null)[][];
	roundOver: boolean;
};

export const Lanes = forwardRef(function Lanes(
	{ count, allLetters, roundOver }: LanesType,
	ref: any
) {
	return (
		<article className="lanes" ref={ref}>
			{allLetters &&
				allLetters[0].map((letters, index) => (
					<Lane
						key={index}
						laneNum={index}
						allLetters={allLetters}
						count={count}
						roundOver={roundOver}
					/>
				))}
		</article>
	);
});

type LaneType = {
	laneNum: number;
	allLetters: (string | null)[][];
	count: number;
	roundOver: boolean;
};

const Lane = ({ laneNum, count, allLetters, roundOver }: LaneType) => {
	const [currentLetters, setCurrentLetters] = useState([]);

	const _refs = { currentLetters, count };
	const refs = useRef(_refs);

	const addLetter = useCallback(() => {
		if (count % 2 === 1 || count === 0) {
			setCurrentLetters([null, ...currentLetters]);
		} else if (count <= allLetters.length * 2 - 1) {
			setCurrentLetters([
				allLetters[count / 2 - 1][laneNum],
				...currentLetters,
			]);
		}
		// else setCurrentLetters([null, ...currentLetters]);
	}, [currentLetters, count, allLetters]);

	useEffect(() => {
		if (roundOver) {
			setCurrentLetters([]);
		} else addLetter();
	}, [count, roundOver]);

	return (
		<div className="lane">
			<span className="lane--title">{laneNum + 1}</span>
			<span className="letters">
				{currentLetters &&
					currentLetters.map((letter, index) => (
						<Letter letter={letter} key={index} />
					))}
			</span>
		</div>
	);
};

const Letter = ({ letter }) => {
	return (
		<p className="letter" data-letter={letter}>
			{letter}
		</p>
	);
};
