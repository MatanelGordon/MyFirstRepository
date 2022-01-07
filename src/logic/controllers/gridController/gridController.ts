import { remove } from "lodash";
import { Grid, Position } from "../../../models";
import { hasCollided } from "../../../utils/position";
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

    addObstacle(position: Position) {
        this.grid.obstacles.push(position);
        this.onGridChange.invoke({...this.grid});
    }

    setObstacles(newObstacles: Position[]){
        this.grid.obstacles = newObstacles;
        this.onGridChange.invoke({...this.grid});
    }

    removeObstacle(position:Position){
        const foundPosition = this.grid.obstacles.find(obs => hasCollided(obs, position))
        if(foundPosition){
            remove(this.grid.obstacles, foundPosition)
            this.onGridChange.invoke({...this.grid});
        }
    }

    setObstaclesWithFunction(func: (prev:Position[]) => Position[]){
        this.grid.obstacles = func(this.grid.obstacles);
        this.onGridChange.invoke({...this.grid});
    }

    setShouldGoThroughWalls(val:boolean){
        this.grid.shouldGoThroughWalls = val;
        this.onGridChange.invoke({...this.grid});
    }

    setEntityPosition(position:Position){
        this.grid.entities[0] = position
        this.onGridChange.invoke({...this.grid});
        this.onEntitiesChange.invoke([...this.grid.entities]);
    }

    setEntities(positions:Position[]){
        this.grid.entities = positions;
        this.onGridChange.invoke({...this.grid});
        this.onEntitiesChange.invoke([...this.grid.entities]);
    }

}
