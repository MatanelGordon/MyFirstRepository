import { SnakeController } from "./snakeController";
import Direction from "../../../models/direction";
import { Grid } from "../../../models/grid";
import { Snake } from "../../../models/snake";
import { SnakeBuilder } from "../../builders/snakeBuilder";
import { createPosition } from "../../factories/position";

const gridMock = new Grid(10);

test("can grow by one", () => {
    const snake = new SnakeBuilder(gridMock, createPosition(2, 2))
        .addBlock(createPosition(2, 2))
        .move(Direction.DOWN)
        .finishSnake();

    expect(snake.getBody()).toHaveLength(2);
});

test("can move", () => {
    const snake = new SnakeBuilder(gridMock, createPosition(2, 2))
        .move(Direction.DOWN)
        .finishSnake();

    expect<number>(snake.getHead().x).toBe(2);
    expect<number>(snake.getHead().y).toBe(3);
});

test("can't go opposite direction", () => {
    const snake = new SnakeBuilder(gridMock, createPosition(2, 2))
        .addBlock(createPosition(2, 2))
        .move(Direction.DOWN)
        .move(Direction.UP)
        .finishSnake();

    //should go twice downwards
    expect<number>(snake.getHead().x).toBe(2);
    expect<number>(snake.getHead().y).toBe(4);
});

test("can collide to self", () => {
    const snakeController = new SnakeBuilder(gridMock, createPosition(7, 7))
        .addBlock(createPosition(6, 7))
        .addBlock(createPosition(5, 7))
        .addBlock(createPosition(4, 7))
        .addBlock(createPosition(3, 7))
        .addBlock(createPosition(2, 7))
        .addBlock(createPosition(1, 7))
        .addBlock(createPosition(0, 7))
        .move(Direction.UP)
        .move(Direction.LEFT)
        .move(Direction.DOWN)
        .finish();

    expect<boolean>(snakeController.hasCollidedWithItself()).toBe(true);
});

test("can teleport from edge", () => {
    const snake = new Snake(createPosition(0, 0));
    const snakeController = new SnakeController(snake, new Grid(3));
    snakeController.move(Direction.LEFT);
    expect<number>(snake.getHead().x).toBe(2);
    expect<number>(snake.getHead().y).toBe(0);
});

test("onSnakeMove triggered", () => {
    const mockCallback = jest.fn((_: Snake) => {});
    new SnakeBuilder(gridMock, createPosition(2, 2))
        .addOnSnakeMoveEvent(mockCallback)
        .addBlock(createPosition(2, 2))
        .move(Direction.DOWN)
        .move(Direction.UP)
        .finish();

    expect(mockCallback).toBeCalled();
});
