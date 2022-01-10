import { Direction, Game, Grid, Position, Snake } from "../../models";
import { GameController } from "../controllers";

export class GameControllerManipulator {
	gameController: GameController;

	constructor(snake: Snake, grid: Grid) {
		this.gameController = new GameController(new Game(snake, grid));
	}

	setEntity(position: Position): GameControllerManipulator {
		this.gameController.game.grid.entities = [position];
		this.gameController.gridController.onEntitiesChange.invoke(
			this.gameController.game.grid.entities
		);
		return this;
	}

	move(direction: Direction): GameControllerManipulator {
		this.gameController.setDirection(direction);
		this.gameController.update();
		return this;
	}

	setIsRunning(val: boolean): GameControllerManipulator {
		this.gameController.setIsRunning(val);
		return this;
	}

	resetGame(): GameControllerManipulator {
		this.gameController.resetGame();
		return this;
	}

	getGame(): Game {
		return this.gameController.game;
	}

	getController(): GameController {
		return this.gameController;
	}

	manipulateInstance(callback: (game: GameController) => void): GameControllerManipulator {
		callback(this.gameController);
		return this;
	}
}
