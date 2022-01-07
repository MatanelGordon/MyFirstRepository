import { useEffect, useState } from "react";
import { Position } from "../models/position";
import { Game, Snake } from "../models";
import { useGame } from "./useGame";

export function useSnake() {
	const gameController = useGame();
	const [body, setBody] = useState<Position[]>(gameController.game.snake.getBody());

	useEffect(() => {
		gameController.snakeController.onSnakeMove.addEvent((newSnake: Snake) => {
			setBody(newSnake.getBody());
		});

		gameController.onStart.addEvent((game: Game) => {
			setBody(game.snake.getBody());
		});
	}, []);

	return { body };
}
