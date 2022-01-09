import { createPosition } from "../logic/factories/position";
import { Grid, Position } from "../models";

export function XShape(grid: Grid): Position[] {
	const size = grid.size;
	const positions: Position[] = [];

	for (let i = 0; i < size / 4; i++) {
		positions.push(createPosition(i, i));
		positions.push(createPosition(i, size - 1 - i));
        positions.push(createPosition(size - 1 - i, size - 1 - i));
        positions.push(createPosition(size - 1 - i, i));

	}

    const mid = size/2;
    if(size % 2 == 0){
        positions.push(createPosition(mid, mid));
        positions.push(createPosition(mid, mid - 1));
        positions.push(createPosition(mid -1, mid));
        positions.push(createPosition(mid - 1, mid - 1));
    }
    else{
        positions.push(createPosition(mid, mid));
    }


	return positions;
}


export default {XShape}