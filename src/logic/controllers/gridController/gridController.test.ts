import { Grid } from "../../../models/grid";
import { createPosition } from "../../factories/position";
import { GridController } from "./gridController";

test("can Add Obstacle", () => {
    const grid = new Grid(6, false);
    const gridController = new GridController(grid);

    gridController.addObstacle(createPosition(0, 0));
    gridController.addObstacle(createPosition(1, 0));
    gridController.addObstacle(createPosition(0, 1));

    expect(grid.obstacles).toHaveLength(3);
});

test("can set Obstacles array", () => {
    const grid = new Grid(6, false);
    const gridController = new GridController(grid);

    gridController.setObstacles([createPosition(0, 0), createPosition(1, 0)]);

    expect(grid.obstacles).toHaveLength(2);
});

test("can set entities array", () => {
    const grid = new Grid(6, false);
    const gridController = new GridController(grid);

    gridController.setEntities([createPosition(0, 0), createPosition(1, 0)]);

    expect(grid.entities).toHaveLength(2);
})

test("onGridChange event works properly", () => {
    const mockEvent = jest.fn((grid:Grid) => {}) 
    const grid = new Grid(6, false);
    const gridController = new GridController(grid);
    gridController.onGridChange.addEvent(mockEvent);
    
    gridController.addObstacle(createPosition(2, 2));
    gridController.setObstacles([createPosition(0, 0), createPosition(1, 0)]);

    expect(mockEvent).toBeCalledTimes(2);
});
