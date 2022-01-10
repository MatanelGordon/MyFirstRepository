import { GameController } from "../controllers";
import EventController, { EventFunction } from "../controllers/eventController";

export class GameScheduler {
	gameController: GameController;
	private events: EventController<GameController>;

	constructor(gameController: GameController) {
		this.gameController = gameController;
		this.events = new EventController();
	}

	execute(){
		this.events.invoke(this.gameController);
	}

	addFeature(
		eventFunction: EventFunction<GameController>
	): GameScheduler {
		this.events.addEvent(eventFunction);
		return this;
	}
}
