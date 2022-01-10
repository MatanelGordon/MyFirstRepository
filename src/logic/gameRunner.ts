import { GameController } from "./controllers/gameController";
import { SpeedController } from "./controllers/speedControllers";
import { TimerController } from "./controllers/timerController";

export class GameRunner {
	timerController: TimerController;
	gameController: GameController;
	speedController: SpeedController;
	constructor(gameController: GameController, speedController: SpeedController) {
		this.gameController = gameController;
		this.speedController = speedController;
		this.timerController = new TimerController(() => speedController.getTimeFunction());
	}

	runGame() {
		this.gameController.update();

		this.timerController.onUpdate.addEvent((arg: any) => {
			const gameController = arg as GameController;
			gameController.update();
		});
		this.timerController.run(this.gameController);
		this.gameController.onStart.invoke(this.gameController.game);
	}

	dispose() {
		this.timerController.dispose();
	}
}
