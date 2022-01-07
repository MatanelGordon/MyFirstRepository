import { sample } from "lodash";
import { Game, Position } from "../models";
import { isOccupiedInGrid } from "./grid";

export function isOccupiedInGame(
	game: Game,
	position: Position,
	extraPositios: Position[] = []
): boolean {
	return isOccupiedInGrid(game.grid, position, game.snake.getBody().concat(extraPositios));
}

export function getEmptyRandomPositionFrom(game: Game, positions: Position[]): Position {
	return sample(positions.filter((pos) => !isOccupiedInGame(game, pos)));
}
