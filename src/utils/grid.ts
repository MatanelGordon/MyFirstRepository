import { createPosition } from "../logic/factories/position";
import { Grid, Position } from "../models";
import { hasCollided, randomPosition } from "./position";

export function isInGrid(grid: Grid, position: Position) {
	return position.x < grid.size && position.x >= 0 && position.y < grid.size && position.y >= 0;
}

export function getSurroundingPositions(position: Position, grid: Grid): Position[] {
	const positions: Position[] = [];
	for (let i = position.x - 1; i <= position.x + 1; i++) {
		for (let j = position.y - 1; j <= position.y + 1; j++) {
			if (i === position.x && i === position.y) {
				continue;
			}
			positions.push(createPosition(i, j));
		}
	}

	return positions.filter((pos) => isInGrid(grid, pos)); //those who are in grid
}

//just like getSurroundingPositions but without diagonals
export function getSurroundingMovablePositions(position: Position, grid: Grid): Position[] {
	const { x, y } = position;
	const positions: Position[] = [
		createPosition(x - 1, y),
		createPosition(x + 1, y),
		createPosition(x, y - 1),
		createPosition(x, y + 1),
	];

	return positions.filter((pos) => isInGrid(grid, pos)); //those who are in grid
}

export function isOccupiedInGrid(
	grid: Grid,
	position: Position,
	extraExcludedPositions: Position[] = []
): boolean {
	return extraExcludedPositions
		.concat(grid.entities)
		.concat(grid.obstacles)
		.some((pos) => hasCollided(pos, position));
}

export function getEmptyRandomPosition(grid: Grid, extraPositions: Position[] = []) {
	let position = randomPosition(grid);
	while (isOccupiedInGrid(grid, position, extraPositions)) {
		position = randomPosition(grid);
	}
	return position;
}
