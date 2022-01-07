import { GameController } from "../controllers";
import EventController from "../controllers/eventController";

export type GameSchedulerEvent = (gameController: GameController) => void | Promise<void>;

export class GameScheduler {
	onDispose: EventController<void>;
	gameController: GameController;
	private events: EventController<GameController>;

	constructor(gameController: GameController) {
		this.gameController = gameController;
		this.onDispose = new EventController();
		this.events = new EventController();
	}

	execute(): GameScheduler {
		this.events.invoke(this.gameController);
		return this;
	}

	addEvent(
		eventFunction: GameSchedulerEvent
	): GameScheduler {
		this.events.addEvent(eventFunction);
		return this;
	}
}
