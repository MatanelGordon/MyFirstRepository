import { hasCollided } from "../../../utils/position";
import { EventController } from "../eventController";
import { randomPosition } from "../../../utils/position";
import { isInGrid } from "../../../utils/grid";
import { Direction, Grid, Position, Snake } from "../../../models";

export class SnakeController {
	private lastDirection: Direction | null;
	snake: Snake;
	onSnakeMove: EventController<Snake>;
	grid: Grid;

	constructor(snake: Snake, grid: Grid) {
		this.snake = snake;
		this.grid = grid;
		this.onSnakeMove = new EventController();
		this.lastDirection = null;

		//position snake's head
		if (this.snake.body.length == 0) {
			this.snake.setHeadPosition(randomPosition(this.grid));
		}
	}

	setBody(positions: Position[]) {
		this.snake.body = positions;
		this.onSnakeMove.invoke(this.snake);
	}

	move(direction: Direction) {
		const lastBodyState = this.snake.getBody();
		const headPosition = this.snake.getHead();

		let chosenDirection: Direction = direction;

		//canceling going to the other direction
		const opposingDirections: Direction[][] = [
			[Direction.DOWN, Direction.UP],
			[Direction.LEFT, Direction.RIGHT],
		];
		if (this.lastDirection !== null && this.snake.getBody().length > 1) {
			const shouldIgnoreDirection = opposingDirections
				.map<boolean[]>((opDir) =>
					opDir.map<boolean>(
						(_, i) => direction === opDir[i] && this.lastDirection === opDir[1 - i]
					)
				)
				.flat<boolean[][], 1>()
				.some((boolVal) => boolVal);
			if (shouldIgnoreDirection) {
				chosenDirection = this.lastDirection;
			}
		}
		this.lastDirection = chosenDirection;

		switch (chosenDirection) {
			case Direction.UP:
				headPosition.y -= 1;
				break;
			case Direction.DOWN:
				headPosition.y += 1;
				break;
			case Direction.LEFT:
				headPosition.x -= 1;
				break;
			case Direction.RIGHT:
				headPosition.x += 1;
				break;
		}

		if (this.grid.shouldGoThroughWalls) {
			//reached the edge?
			if (headPosition.y >= this.grid.size) {
				headPosition.y = 0;
			} else if (headPosition.y < 0) {
				headPosition.y = this.grid.size - 1;
			}

			if (headPosition.x >= this.grid.size) {
				headPosition.x = 0;
			} else if (headPosition.x < 0) {
				headPosition.x = this.grid.size - 1;
			}
		}

		this.snake.body = [headPosition].concat(
			this.snake.body.slice(0, this.snake.body.length - 1)
		);

		this.onSnakeMove.invoke(this.snake);
	}

	addBlock(position: Position) {
		this.snake.body.push(position);
	}

	hasCollidedWithItself(): boolean {
		const head = this.snake.getHead();
		const bodyWithoutHead = this.snake.getBody().slice(1);
		return bodyWithoutHead.some((pos) => hasCollided(pos, head));
	}

	resetSnake() {
		this.snake.body = [randomPosition(this.grid)];
		this.onSnakeMove.invoke(this.snake);
	}

	isOutGrid(): boolean {
		return this.snake
            .getBody()
            .some((block) => !isInGrid(this.grid, block));
	}
}
