import { GameController } from "../../controllers";
import { SchedulerEventComposerBase } from "./schedulerEventComposerBase";

export class ScoreEventComposer extends SchedulerEventComposerBase {
	shouldRunEventFunction: (score: number) => boolean;

	constructor(shouldRunEventFunction: (score: number) => boolean) {
		super();
		this.shouldRunEventFunction = shouldRunEventFunction;
	}

    //runs once
	compose(): (gameController: GameController) => void | Promise<void> {

		return (gameController: GameController) => {
			gameController.onScoreChange.addEvent(score => {
				if(!this.shouldEventRun(() => this.shouldRunEventFunction(score), gameController)) return;

				this.eventFunction(gameController);
			})
		};
	}
}

