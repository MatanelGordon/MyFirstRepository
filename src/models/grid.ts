import { Position } from "./position";

export class Grid {
    size: number;
    shouldGoThroughWalls: boolean;
    obstacles: Position[];
    entities: Position[];
    constructor(
        size: number,
        goThroughWalls: boolean = true,
        obstacles: Position[] = [],
        entities:Position[] = []
    ) {
        this.size = size;
        this.shouldGoThroughWalls = goThroughWalls;
        this.obstacles = obstacles;
        this.entities = entities;
    }
}
