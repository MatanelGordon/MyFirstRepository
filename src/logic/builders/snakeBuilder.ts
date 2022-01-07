import { Direction } from "../../models/direction";
import { Grid } from "../../models/grid";
import Position from "../../models/position";
import { Snake } from "../../models/snake";
import { EventFunction } from "../controllers/eventController";
import { SnakeController } from "../controllers/snakeController";


export class SnakeBuilder{
    snakeController:SnakeController;

    constructor(grid:Grid, initHeadPosition:Position = null){
        this.snakeController = new SnakeController(new Snake(initHeadPosition), grid);
    }

    addBlock(position:Position): SnakeBuilder{
        this.snakeController.addBlock(position);
        return this;
    }

    move(direction:Direction):SnakeBuilder{
        this.snakeController.move(direction);
        return this;
    }

    addOnSnakeMoveEvent(callback:EventFunction<Snake>):SnakeBuilder{
        this.snakeController.onSnakeMove.addEvent(callback);
        return this;
    }

    finishSnake():Snake{
        return this.snakeController.snake;
    }

    finish():SnakeController{
        return this.snakeController;
    }
}