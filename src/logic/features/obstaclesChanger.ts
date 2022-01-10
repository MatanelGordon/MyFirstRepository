import { TimeEventComposer } from "../gameScheduler/eventComposers";
import { Game, Position } from "../../models";
import { TimeEventProps } from "../gameScheduler/eventComposers/timeEventComposer";
import { getSurroundingPositions, isOccupiedInGrid } from "../../utils/grid";
import { hasCollided } from "../../utils/position";
import { last } from "lodash";
import { EventFunction } from "../controllers/eventController";
import { GameController } from "../controllers";

export function obstaclesChanger(
	timeProps: TimeEventProps,
	wantedShape: Position[]
): EventFunction<GameController> {
	let shouldReverse = false;
	const shape = [...wantedShape];
	return new TimeEventComposer(timeProps)
		.setEvent((gameController) => {
			const { gridController, game } = gameController;
			const { grid, snake } = game;
			if (!shouldReverse) {
				const chosenPos: Position = findNextEmptyPositionFrom(game, shape);

				if (chosenPos) {
					const overridedSnakeBlock = snake
						.getBody()
						.find((pos) => hasCollided(pos, chosenPos));
					if (overridedSnakeBlock) {
						const overridedBlockIndex: number = snake
							.getBody()
							.indexOf(overridedSnakeBlock);
						gameController.snakeController.setBody(
							snake.getBody().slice(overridedBlockIndex + 1)
						);
					}

					gridController.addObstacle(chosenPos);
				}

				if (grid.obstacles.length === shape.length) {
					shouldReverse = true;
				}
			} else {
				const chosenPos: Position = last(grid.obstacles);

				if (chosenPos) {
					gridController.removeObstacle(chosenPos);
				}

				if (grid.obstacles.length === 0) {
					shouldReverse = false;
				}
			}
		})
		.compose();
}

//finds free random position NOT INCLUDING THE SNAKE'S BODY (but includes his head)
function findNextEmptyPositionFrom(game: Game, positions: Position[]): Position {
    const head = game.snake.getHead();
	return positions.find((pos) => !isOccupiedInGrid(game.grid, pos, [head, ...getSurroundingPositions(head, game.grid)]));
}
