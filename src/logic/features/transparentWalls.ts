import { GameController } from "../controllers";
import { EventFunction } from "../controllers/eventController";
import { ScoreEventComposer } from "../gameScheduler/eventComposers";

export function transparentWalls(initialWallsState:boolean, shouldStartFunction:(score:number) => boolean): EventFunction<GameController>{
    return new ScoreEventComposer(shouldStartFunction)  
    .addOnStart(gameController => {
        gameController.gridController.setShouldGoThroughWalls(!initialWallsState)
    })
    .addOnEnd(gameController => {
        gameController.gridController.setShouldGoThroughWalls(initialWallsState)
    })
    .compose()
}
