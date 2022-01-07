import { Reducer, useEffect, useReducer } from "react";
import { Direction } from "../models";
import { useGame } from "./useGame";

export interface DirectionHookResult {
	name: string;
	direction: Direction;
}

interface DirectionReducerAction {
	direction: Direction;
}

const DIRECTIONS: DirectionHookResult[] = [
	{
		direction: Direction.UP,
		name: "up",
	},
	{
		direction: Direction.DOWN,
		name: "down",
	},
	{
		direction: Direction.LEFT,
		name: "left",
	},
	{
		direction: Direction.RIGHT,
		name: "right",
	},
];

const directionReducer: Reducer<DirectionHookResult, DirectionReducerAction> = (_, payload) => ({
	...DIRECTIONS.find((dir) => dir.direction === payload.direction),
});

export function useDirection() {
	const gameController = useGame();
	const [direction, directionDispach] = useReducer(directionReducer, DIRECTIONS[0]);

	useEffect(() => {
		gameController.onUpdate.addEvent((_) => {
			directionDispach({ direction: gameController.direction });
		});
	}, []);

	return direction;
}
