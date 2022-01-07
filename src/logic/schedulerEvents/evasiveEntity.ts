import { sample } from "lodash";
import { Game } from "../../models";
import { isOccupiedInGame } from "../../utils/game";
import { getSurroundingMovablePositions } from "../../utils/grid";
import { GameController } from "../controllers";
import { SchedulerEventType } from "../gameScheduler/eventComposers/schedulerEventComposerBase";
import { TimeEvent } from "../gameScheduler/eventComposers";

export function evasiveEntity(intervalFunc:() => number, minScore:number, maxScore?:number) :SchedulerEventType{
    return new TimeEvent({
        intervalFunc:intervalFunc,
        shouldEventRunFunction: (game:Game) => game.score >= minScore && game.score <= maxScore
    })
    .setEvent((gameController:GameController) => {
        const grid = gameController.game.grid;
        const oldPosition = grid.entities[0];
        const newPosition = sample(
            getSurroundingMovablePositions(oldPosition, grid)
                .filter(pos => !isOccupiedInGame(gameController.game, pos))
            );
        gameController.gridController.setEntityPosition(newPosition)
    })
    .compose()
}

