import { Grid } from "../../models/grid";
import { Position } from "../../models/position";
import { randomPosition } from "../../utils/position";
import { GridController } from "../controllers";

export class GridBuilder{
    grid:Grid;
    gridController:GridController;

    constructor(size: number,
        goThroughWalls: boolean = true,
        obstacles: Position[] = []){
            this.grid = new Grid(size, goThroughWalls,obstacles);
            this.gridController = new GridController(this.grid);
    }

    addObstacle(position:Position):GridBuilder{
        this.gridController.addObstacle(position);
        return this;
    }

    setObstacle(func:((prev:Position[]) => Position[])):GridBuilder{
        this.gridController.setObstaclesWithFunction(func);
        return this;
    }

    setEntity(position:Position):GridBuilder{
        this.gridController.setEntityPosition(position);
        return this;
    }

    setEntityAtRandomPosition():GridBuilder{
        this.gridController.setEntityPosition(randomPosition(this.grid))
        return this;
    }

    getGrid():Grid{
        return this.grid;
    }
}