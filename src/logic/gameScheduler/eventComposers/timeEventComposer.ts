import { Game } from "../../../models";
import { EventController, GameController, TimerController } from "../../controllers";
import { EventFunction } from "../../controllers/eventController";

import { SchedulerEventComposerBase, SchedulerEventType } from "./schedulerEventComposerBase"

export interface TimeEventProps{
    intervalFunc?:() => number,
    durationFunc?:() => number,
    shouldEventRunFunction:(game:Game) => boolean,
    debounce?:boolean
}
export class TimeEventComposer extends SchedulerEventComposerBase{
    protected onIntervalEnd:EventController<GameController>;
    protected timeProps:TimeEventProps
    protected timerController:TimerController;
    protected onIntervalEndSetTimeOut: NodeJS.Timer
    constructor(timeProps:TimeEventProps){
        super();
        this.timeProps = {
            ...timeProps,
            durationFunc: timeProps?.durationFunc ??  (() => 0),
            intervalFunc: timeProps?.intervalFunc ??  (() => 0),
            debounce:  timeProps?.debounce ??  false
        };
        this.onIntervalEnd = new EventController();
        this.timerController = new TimerController(timeProps.intervalFunc);
        this.onIntervalEndSetTimeOut = null;
    }

    addOnIntervalEnd(func: EventFunction<GameController> ):TimeEventComposer{
        this.onIntervalEnd.addEvent(func);
        return this;
    }

    setEvent(eventFunction:SchedulerEventType):TimeEventComposer{
        super.setEvent(eventFunction);
        return this;
    }

    dispose():void{
        this.timerController.dispose();
        if(this?.onIntervalEndSetTimeOut){
            clearTimeout(this.onIntervalEndSetTimeOut)
        }
    }

    //runs once
    compose(): SchedulerEventType {
        return (gameController:GameController) => {

            this.timerController.onUpdate.addEvent(_ => {
                if(!this.shouldEventRun(() => this.timeProps.shouldEventRunFunction(gameController.game), gameController)) return;

                this.eventFunction(gameController);

                if(this.timeProps.debounce && this.onIntervalEndSetTimeOut){
                    clearTimeout(this.onIntervalEndSetTimeOut)
                }

                this.onIntervalEndSetTimeOut = setTimeout(() => {
                    this.onIntervalEnd.invoke(gameController);
                },this.timeProps.durationFunc())
            })

            this.timerController.run();
        }
        
    }
}