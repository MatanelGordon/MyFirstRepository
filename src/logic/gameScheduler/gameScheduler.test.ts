import { GameScheduler } from ".";
import { Game } from "../../models";
import Direction from "../../models/direction";
import { Grid } from "../../models/grid";
import { Snake } from "../../models/snake";
import { GameControllerManipulatorBuilder } from "../builders/gameControllerManipulatorBuilder";
import { GameController } from "../controllers";
import { createPosition } from "../factories/position";
import { ScoreEvent, TimeEvent } from "./eventComposers";

test("starts function after one score", () => {
	const mockFunc = jest.fn();

	const grid = new Grid(10);
	const snake = new Snake(createPosition(2, 2));

	new GameControllerManipulatorBuilder(snake, grid)
		.manipulateInstance((game) => {
			new GameScheduler(game)
				.addEvent(
					new ScoreEvent((score) => score >= 1)
						.setEvent((_) => {
							mockFunc();
						})
						.compose()
				)
				.execute();
		})
		.setEntity(createPosition(3, 2))
		.setIsRunning(true)
		.move(Direction.RIGHT)
		.getGame();

	expect(snake.getBody()).toHaveLength(2);
	expect(mockFunc).toBeCalled();
});

test("starts function after one score every 10ms", () => {
	const mockFunc = jest.fn();

	const grid = new Grid(10);
	const snake = new Snake(createPosition(2, 2));
	jest.useFakeTimers();

	new GameControllerManipulatorBuilder(snake, grid)
		.manipulateInstance((gameController) => {
			const timeEvent = new TimeEvent({
				intervalFunc: () => 10,
				shouldEventRunFunction: (game: Game) => game.score >= 1,
			})
            .setEvent((_) => {
				mockFunc();
				setTimeout(() => {
					timeEvent.dispose();
				}, 20);
			});

			new GameScheduler(gameController).addEvent(timeEvent.compose()).execute();
		})
		.setIsRunning(true)
		.setEntity(createPosition(3, 2))
		.move(Direction.RIGHT)
		.getGame();

	jest.runAllTimers();
	expect(mockFunc).toBeCalled();
});
