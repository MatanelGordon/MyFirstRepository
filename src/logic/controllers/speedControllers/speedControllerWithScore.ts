import { GameController } from "../gameController";
import { SpeedController } from "./speedControlller";

export class ScoreBasedSpeedController extends SpeedController {
    minSpeed: number;
    maxSpeed: number;
    maxSpeedScore: number;
    score: number;

    constructor(
        minSpeed: number,
        maxSpeed: number,
        maxSpeedScore: number,
        score: number = 0
    ) {
        super();
        this.score = score;
        this.maxSpeed = maxSpeed;
        this.minSpeed = minSpeed;
        this.maxSpeedScore = maxSpeedScore;
    }

    private getTimeInterval(score: number): number {
        const speedCovarage: number = Math.min(1, score / this.maxSpeedScore);
        const speed: number =
            this.minSpeed + (this.maxSpeed - this.minSpeed) * speedCovarage;
        return 1000 / speed;
    }

    subscribeToGameScore(gameController: GameController) {
        gameController.onScoreChange.addEvent((score) => {
            this.score = score;
        });
    }

    getTimeFunction(): number {
        return this.getTimeInterval(this.score);
    }
}
