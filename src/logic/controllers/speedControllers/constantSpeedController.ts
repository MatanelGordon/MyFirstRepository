import { SpeedController } from "./speedControlller";

export class ConstantSpeedController extends SpeedController{
    speed:number;
    constructor(speed:number){
        super();
        this.speed = speed;
    }

    getTimeFunction(): number {
        return 1000 / this.speed;
    }
}