import { Direction, Grid, Snake } from "../../../models";
import { GameControllerManipulatorBuilder } from "../../builders/gameControllerManipulatorBuilder";
import { createPosition } from "../../factories/position";

test("snake grows after eating", () => {
    const grid = new Grid(10);
    const snake = new Snake(createPosition(2, 2));
    new GameControllerManipulatorBuilder(snake,grid)
        .setEntity(createPosition(3, 2))
        .setIsRunning(true)
        .move(Direction.RIGHT)

    expect(snake.getBody()).toHaveLength(2);
});

test("lose after colliding to self", () => {
    const grid = new Grid(10);
    const snake = new Snake(createPosition(2, 2));

    const game = new GameControllerManipulatorBuilder(snake, grid)
        .setEntity(createPosition(3, 2))
        .setIsRunning(true)
        .move(Direction.RIGHT)
        .setEntity(createPosition(4, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(5, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(6, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(7, 2))
        .move(Direction.RIGHT)
        .move(Direction.UP)
        .move(Direction.LEFT)
        .move(Direction.DOWN)
        .getGame();

    expect(game.hasLost).toBe(true);
});


test("resets game successfully", () => {
    //play -> lose -> reset - see if its good
    const grid = new Grid(10);
    const snake = new Snake(createPosition(2, 2));
    const game = new GameControllerManipulatorBuilder(snake, grid)
        .setEntity(createPosition(3, 2))
        .setIsRunning(true)
        .move(Direction.RIGHT)
        .setEntity(createPosition(4, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(5, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(6, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(7, 2))
        .move(Direction.RIGHT)
        .move(Direction.UP)
        .move(Direction.LEFT)
        .move(Direction.DOWN) //at this point i've lost (proven on tests above)
        .resetGame()
        .getGame();

    expect(game.isRunning).toBe(false);
    expect(game.hasLost).toBe(false);
    expect(snake.getBody()).toHaveLength(1);
});

test("all events are responding", () => {
    const onEntitiesChangeMock = jest.fn((_) => {});
    const onScoreChangeMock = jest.fn((_) => {});
    const onUpdateMock = jest.fn((_) => {});

    const grid = new Grid(10);
    const snake = new Snake(createPosition(2, 2));
    new GameControllerManipulatorBuilder(snake, grid)
        .manipulateInstance((gameCont) => {
            gameCont.gridController.onEntitiesChange.addEvent(onEntitiesChangeMock);
            gameCont.onScoreChange.addEvent(onScoreChangeMock);
            gameCont.onUpdate.addEvent(onUpdateMock);
        })
        .setEntity(createPosition(3, 2))
        .setIsRunning(true)
        .move(Direction.RIGHT)
        .setEntity(createPosition(4, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(5, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(6, 2))
        .move(Direction.RIGHT)
        .setEntity(createPosition(7, 2))
        .move(Direction.RIGHT)
        .move(Direction.UP)
        .move(Direction.LEFT)
        .move(Direction.DOWN) //at this point i've lost (proven on tests above)
        .resetGame();

    expect(onEntitiesChangeMock).toBeCalledTimes(10) // 5 position + 5 destruction
    expect(onScoreChangeMock).toBeCalledTimes(6) //5 points game + reset
    expect(onUpdateMock).toBeCalledTimes(10) //8 moves + reset + setIsRunning
});
