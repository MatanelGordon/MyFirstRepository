import { GameController } from "../../controllers";
import { EventFunction } from "../../controllers/eventController";
import { SchedulerEventComposerBase } from "./schedulerEventComposerBase";

export class ScoreEventComposer extends SchedulerEventComposerBase {
	shouldRunEventFunction: (score: number) => boolean;

	constructor(shouldRunEventFunction: (score: number) => boolean) {
		super();
		this.shouldRunEventFunction = shouldRunEventFunction;
	}

    //runs once
	compose(): EventFunction<GameController> {

		return (gameController: GameController) => {
			gameController.onScoreChange.addEvent(score => {
				if(!this.shouldEventRun(() => this.shouldRunEventFunction(score), gameController)) return;

				this.eventFunction(gameController);
			})
		};
	}
}

