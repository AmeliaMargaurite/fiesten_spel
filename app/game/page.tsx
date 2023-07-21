"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Lanes } from "./Components/Lanes/Lanes";
import { Bike } from "./Components/Bike/Bike";
import { COLUMN_MAX, COLUMN_MIN } from "./constants";
import { AnswerBox } from "./Components/AnswerBox/AnswerBox";
import { getGameLetters } from "./getGameLetters";
import { items } from "./Components/answer";

const cols = 5;
const rows = 30;
const MAX_TIME = rows + 10;
const MAX_ROUND_NUM = items.length - 1;

export type ItemType = { question: string; answer: string };

export default function Page() {
	const [count, setCount] = useState<number>(0);
	const [nextCount, setNextCount] = useState<number>(0);
	const [playerWon, setPlayerWon] = useState<boolean>(false);
	const [roundOver, setRoundOver] = useState<boolean>(false);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [restartGame, setRestartGame] = useState<boolean>(false);
	const [round, setRound] = useState<number>(0);
	const [item, setItem] = useState<ItemType | null>(null);
	const [allLetters, setAllLetters] = useState<string[][] | null>(null);
	const [currentLetter, setCurrentLetter] = useState<string | null>(null);

	const vehicleRef = useRef(null);
	const lanesRef = useRef(null);
	const vehiclePosRef = useRef({
		startPos: 3,
		now: 3,
		vehicle: null,
	});

	const _statusRef = { gameOver, playerWon, restartGame, count, round };
	const statusRef = useRef(_statusRef);
	statusRef.current = _statusRef;

	const updateVehiclePos = useCallback(() => {
		vehicleRef.current.style.gridColumn = vehiclePosRef.current.now;
	}, []);

	const getCurrentLetter = useCallback((): string | null => {
		if (lanesRef && lanesRef.current) {
			const lanes = lanesRef.current?.children;
			const currLane = lanes[vehiclePosRef.current.now - 1];
			const letters = currLane.querySelector(".letters");
			return letters?.children[8]?.dataset?.letter ?? null;
		}
		return null;
	}, [count]);

	const getAllLetters = useCallback((item: ItemType) => {
		return getGameLetters(item.answer, cols, rows);
	}, []);

	const keydownHandler = useCallback((event) => {
		const currCol = Number(
			vehicleRef.current.style.gridColumn.split("/")[0] ?? 3
		);

		switch (event.key.toUpperCase()) {
			case "ARROWRIGHT":
				if (currCol < COLUMN_MAX) {
					vehiclePosRef.current.now += 1;
					updateVehiclePos();
				}
				break;
			case "ARROWLEFT":
				if (currCol > COLUMN_MIN) {
					vehiclePosRef.current.now -= 1;
					updateVehiclePos();
				}
				break;
			default:
				break;
		}
	}, []);

	const handleNextClick = useCallback(() => {
		setCount(0);
		setRoundOver(false);
		setPlayerWon(false);
		setAllLetters(getAllLetters(items[round]));
	}, [round]);

	const handleRestartClick = useCallback(() => {
		setRoundOver(false);
		setPlayerWon(false);
		setGameOver(false);
		setRestartGame(true);
	}, []);

	useEffect(() => {
		const { playerWon } = statusRef.current;
		const interval = setInterval(() => setCount(count + 1), 300);
		const ranOutOfTime = count >= MAX_TIME;

		if (ranOutOfTime || playerWon) {
			clearInterval(interval);
			setRoundOver(true);
		} else if (count === 0) {
			setAllLetters(getAllLetters(items[round]));
		} else {
			setNextCount(count);
			setCurrentLetter(getCurrentLetter());
		}

		if (!item) setItem(items[0]);
		return () => {
			clearInterval(interval);
		};
	}, [count]);

	useEffect(() => {
		if (restartGame) {
			setRestartGame(false);
			setRound(0);
			setGameOver(false);
			setPlayerWon(false);
			setAllLetters(getAllLetters(items[0]));
			setCount(0);
		}
	}, [restartGame]);

	useEffect(() => {
		const { round } = statusRef.current;
		if (roundOver) {
			if (round >= MAX_ROUND_NUM) {
				setGameOver(true);
			} else setRound(round + 1);
		}
	}, [roundOver]);

	return (
		<>
			<AnswerBox
				newLetter={currentLetter}
				setItem={setItem}
				round={round}
				count={nextCount}
				setPlayerWon={setPlayerWon}
				setGameOver={setGameOver}
			/>
			{allLetters && (
				<Lanes
					count={nextCount}
					ref={lanesRef}
					allLetters={allLetters}
					roundOver={roundOver}
				/>
			)}
			<Bike keydownHandler={keydownHandler} ref={vehicleRef} />
			{roundOver && (
				<dialog open>
					{!gameOver && playerWon && <p>Congratulations! You won.</p>}
					{!gameOver && !playerWon && <p>Better luck next time.{round}</p>}
					{!gameOver && round < items.length && (
						<button className="next-btn btn" onClick={handleNextClick}>
							Next
						</button>
					)}
					{gameOver && (
						<>
							<p>Game over. Your score is: </p>
							<button className="btn" onClick={handleRestartClick}>
								Start again?
							</button>
						</>
					)}
				</dialog>
			)}
		</>
	);
}
