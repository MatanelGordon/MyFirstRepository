import { EventController } from "./eventController";

export class TimerController{
    private currentTimer:NodeJS.Timer = null;
    onUpdate:EventController<any[]>;
    onDispose:EventController<TimerController>;
    fetchTimeFunction:() => number;

    constructor(fetchTimeFunction:() => number){
        this.fetchTimeFunction = fetchTimeFunction;
        this.onUpdate = new EventController();
        this.onDispose = new EventController();
    }

    run(arg?:any){
        this.currentTimer = setTimeout(() => {
            this.onUpdate.invoke(arg);
            this.run(arg);
        },this.fetchTimeFunction());
    }

    dispose(){
        clearTimeout(this.currentTimer);
        this.onDispose.invoke(this);
    }
}