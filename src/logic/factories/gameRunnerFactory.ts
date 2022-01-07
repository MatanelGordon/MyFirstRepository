import SpeedController, { ScoreBasedSpeedController } from "../controllers/speedControllers";
import { GameRunner } from "../gameRunner";
import Config from "../../config";
import { GameController } from "../controllers";

export function createGameRunner(gameController:GameController, providedSpeedController:SpeedController = null){
    const speedController:SpeedController = 
    providedSpeedController ??
    new ScoreBasedSpeedController(
        Config.minSnakeSpeed,
        Config.maxSnakeSpeed,
        Config.maxSpeedScore,
        0
    );
    
    const gameRunner = new GameRunner(gameController,speedController);
    return gameRunner;
}