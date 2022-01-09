import { remove } from "lodash";
import { Grid, Position } from "../../../models";
import { hasCollided, randomPosition } from "../../../utils/position";
import EventController from "../eventController";

export class GridController {
    grid: Grid;
    onGridChange:EventController<Grid>;
    onEntitiesChange: EventController<Position[]>;

    constructor(grid: Grid) {
        this.grid = grid;
        this.onGridChange = new EventController();
        this.onEntitiesChange = new EventController();
    }

    private invokeGridChange(){
        this.onGridChange.invoke(this.grid);
    }

    addObstacle(position: Position) {
        this.grid.obstacles.push(position);
        this.invokeGridChange();
    }

    setObstacles(newObstacles: Position[]){
        this.grid.obstacles = newObstacles;
        this.invokeGridChange();
    }

    removeObstacle(position:Position){
        const foundPosition = this.grid.obstacles.find(obs => hasCollided(obs, position))
        if(foundPosition){
            remove(this.grid.obstacles, foundPosition)
            this.invokeGridChange();
        }
    }

    setObstaclesWithFunction(func: (prev:Position[]) => Position[]){
        this.grid.obstacles = func(this.grid.obstacles);
        this.invokeGridChange();
    }

    setShouldGoThroughWalls(val:boolean){
        this.grid.shouldGoThroughWalls = val;
        this.invokeGridChange();
    }

    setEntityPosition(position:Position){
        this.grid.entities[0] = position
        this.invokeGridChange();
        this.onEntitiesChange.invoke([...this.grid.entities]);
    }

    setEntities(positions:Position[]){
        this.grid.entities = positions;
        this.invokeGridChange();
        this.onEntitiesChange.invoke([...this.grid.entities]);
    }

    clearGrid(){
        this.grid.obstacles = [];
        this.grid.shouldGoThroughWalls = false;
        this.invokeGridChange();
    }

}
