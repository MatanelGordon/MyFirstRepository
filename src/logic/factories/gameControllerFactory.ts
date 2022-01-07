import Config from "../../config";
import { Game, Snake } from "../../models";
import { GridBuilder } from "../builders/gridBuilder";
import { GameController } from "../controllers";
import { createPosition } from "./position";

export function createGame(
    providedGame: Game = null,
) {
    let gameModel:Game = providedGame;
    if(!providedGame){
        const grid = new GridBuilder(Config.gridSize, Config.shouldGoThroughWalls)
            .setEntityAtRandomPosition()
            .addObstacle(createPosition(0,0))
            .addObstacle(createPosition(Config.gridSize - 1,0))
            .addObstacle(createPosition(0,Config.gridSize - 1))
            .addObstacle(createPosition(Config.gridSize - 1,Config.gridSize - 1))
            .getGrid();
        gameModel =  new Game(new Snake(), grid)
    }
   
    const game: GameController = new GameController(gameModel);
    return game;
}

