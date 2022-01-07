import { Grid } from "./grid";
import { Snake } from "./snake";

export class Game{
    snake: Snake;
    grid: Grid;
    score: number = 0;
    hasLost: boolean;
    isRunning: boolean = false;
    
    constructor(snake:Snake,grid:Grid,hasLost = false,isRunning = false,score = 0){
        this.snake = snake;
        this.grid = grid;
        this.hasLost = hasLost;
        this.isRunning = isRunning;
        this.score = score;
    }
}