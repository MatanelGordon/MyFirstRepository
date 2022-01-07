import { Grid } from "../models/grid";
import { Position } from "../models/position";

export function randomPosition(grid:Grid):Position {
    const calculateRandomPosition = () => (grid.size * Math.random()) | 0;
    return {x:calculateRandomPosition(), y:calculateRandomPosition()}
}

export function hasCollided(position1:Position, position2:Position){
    return position1.x == position2.x && position1.y == position2.y;
}
