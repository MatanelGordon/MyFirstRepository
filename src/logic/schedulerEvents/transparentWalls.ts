import { ScoreEvent } from "../gameScheduler/eventComposers";
import { SchedulerEventType } from "../gameScheduler/eventComposers/schedulerEventComposerBase";

export function transparentWalls(initialWallsState:boolean, shouldStartFunction:(score:number) => boolean): SchedulerEventType{
    return new ScoreEvent(shouldStartFunction)  
    .addOnStart(gameController => {
        gameController.gridController.setShouldGoThroughWalls(!initialWallsState)
    })
    .addOnEnd(gameController => {
        gameController.gridController.setShouldGoThroughWalls(initialWallsState)
    })
    .compose()
}
