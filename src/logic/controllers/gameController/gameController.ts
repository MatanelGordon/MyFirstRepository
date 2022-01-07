import { Direction, Game, Position } from "../../../models";
import { getEmptyRandomPosition, isOccupiedInGrid } from "../../../utils/grid";
import { hasCollided, randomPosition } from "../../../utils/position";
import { EventController } from "../eventController";
import { GridController } from "../gridController/gridController";
import { SnakeController } from "../snakeController";


export class GameController {
    game:Game
    snakeController: SnakeController;
    gridController: GridController;
    direction: Direction;
    
    onStart: EventController<Game>;
    onScoreChange: EventController<number>;
    onUpdate: EventController<Game>;
    constructor(
        game:Game
    ) {
        //properties
        this.game = game;
        this.gridController = new GridController(game.grid);

        this.snakeController = new SnakeController(this.game.snake, this.game.grid);
        this.direction = Direction.UP;

        //events
        this.onStart = new EventController();
        this.onScoreChange = new EventController();
        this.onUpdate = new EventController();

        //console.log("gameController created! this should occur once");
    }

    private findCollidedPositionWithHead(positions: Position[]): Position {
        const head: Position = this.game.snake.getHead();
        const collided = positions.find((pos) => hasCollided(pos, head));
        return collided;
    }

    private addScore(value: number = 1) {
        this.game.score += value;
        this.onScoreChange.invoke(this.game.score);
    }

    update() {
        if (!this.game.isRunning || this.game.hasLost) return;
        const lastSnakeBody: Position[] = this.game.snake.getBody();
        this.snakeController.move(this.direction);
        const collidedEntity = this.findCollidedPositionWithHead(this.game.grid.entities);
        const collidedObstacle = this.findCollidedPositionWithHead(
            this.game.grid.obstacles
        );

        if (collidedEntity) {
            this.snakeController.addBlock(collidedEntity);
            this.gridController.setEntityPosition(getEmptyRandomPosition(this.game.grid));
            this.addScore();
        } else if (this.snakeController.isOutGrid() || collidedObstacle) {
            //reverse the moving forward
            this.snakeController.setBody(lastSnakeBody);
            this.lose(false);
        } else if (this.snakeController.hasCollidedWithItself()) {
            this.lose(false);
        }
        this.onUpdate.invoke(this.game);
    }

    setDirection(direction: Direction): void {
        this.direction = direction;
    }

    resetGame() {
        this.game.score = 0;
        this.snakeController.resetSnake();
        this.game.hasLost = false;
        this.game.isRunning = false;
        this.onUpdate.invoke(this.game);
        this.onScoreChange.invoke(this.game.score);
    }

    lose(shouldUpdate:boolean = true) {
        this.game.hasLost = true;
        this.game.isRunning = false;
        if(shouldUpdate){
            this.onUpdate.invoke(this.game);
        }
    }

    setIsRunning(value:boolean){
        this.game.isRunning = value;
        this.onUpdate.invoke(this.game);
    }
}
