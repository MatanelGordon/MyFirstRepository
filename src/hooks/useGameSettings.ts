import { useCallback, useEffect} from "react";
import { Direction } from "../models/direction";
import { configuredSchuduler } from "../config";
import { createGameRunner } from "../logic/factories";
import { useGame } from "./useGame";

export function useGameSettings() {
	//WARNING: INITIALIZE ONLY ONCE IN A GAME
	const gameController = useGame();

	const resetGame = useCallback(() => {
		gameController.resetGame();
	}, []);

	const handleButton = useCallback(() => {
		if (gameController.game.hasLost) {
			gameController.resetGame();
		}
		gameController.setIsRunning(true);
	}, []);

	useEffect(() => {
		window.onkeydown = (evt: KeyboardEvent) => {
			switch (evt.key) {
				case "ArrowUp":
					handleButton();
					gameController.setDirection(Direction.UP);
					break;
				case "ArrowDown":
					handleButton();
					gameController.setDirection(Direction.DOWN);
					break;
				case "ArrowLeft":
					handleButton();
					gameController.setDirection(Direction.LEFT);
					break;
				case "ArrowRight":
					handleButton();
					gameController.setDirection(Direction.RIGHT);
					break;
				case "Enter":
					gameController.resetGame();
					break;
				case " ":
					gameController.resetGame();
					handleButton();
					gameController.direction = Direction.RIGHT;
					break;
				case "Escape":
					gameController.setIsRunning(!gameController.game.isRunning);
					break;
			}
		};

		//run the game
		const gameRunner = createGameRunner(gameController);
        gameRunner.runGame();

		//add difficulties
		const gameScheduler = configuredSchuduler(gameController, gameRunner.speedController);
		gameScheduler.execute();

		return () => {
			gameRunner.dispose();
		};
	}, []);

	return { _game: gameController.game, resetGame };
}
