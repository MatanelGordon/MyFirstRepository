import { Direction, Game, Grid, Position, Snake } from "../../models";
import { GameController } from "../controllers";

export class GameControllerManipulatorBuilder {
	gameController: GameController;

	constructor(snake: Snake, grid: Grid) {
		this.gameController = new GameController(new Game(snake, grid));
	}

	setEntity(position: Position): GameControllerManipulatorBuilder {
		this.gameController.game.grid.entities = [position];
		this.gameController.gridController.onEntitiesChange.invoke(
			this.gameController.game.grid.entities
		);
		return this;
	}

	move(direction: Direction): GameControllerManipulatorBuilder {
		this.gameController.setDirection(direction);
		this.gameController.update();
		return this;
	}

	setIsRunning(val: boolean): GameControllerManipulatorBuilder {
		this.gameController.setIsRunning(val);
		return this;
	}

	resetGame(): GameControllerManipulatorBuilder {
		this.gameController.resetGame();
		return this;
	}

	getGame(): Game {
		return this.gameController.game;
	}

	getController(): GameController {
		return this.gameController;
	}

	manipulateInstance(callback: (game: GameController) => void): GameControllerManipulatorBuilder {
		callback(this.gameController);
		return this;
	}
}
