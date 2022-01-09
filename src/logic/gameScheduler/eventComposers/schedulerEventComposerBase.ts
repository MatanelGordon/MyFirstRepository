import { GameController } from "../../controllers";
import EventController, { EventFunction } from "../../controllers/eventController";


export abstract class SchedulerEventComposerBase{
    protected eventFunction:EventFunction<GameController>;
    protected hasEventStarted:boolean;
    onEnd:EventController<GameController>;
    onStart:EventController<GameController>;

    //compose() function runs once at runtime, 
    //its our job inside the compose() function to figure out the wanted timing
    abstract compose():EventFunction<GameController>;

    constructor(){
        this.onEnd = new EventController();
        this.onStart = new EventController();
        this.hasEventStarted = false;
        this.eventFunction = _ => {};
    }

    setEvent(eventFunction:EventFunction<GameController>):SchedulerEventComposerBase{
        this.eventFunction = eventFunction;
        return this;
    }


    // sees if event should run, and invokes onStart and onEnd when needed.
    // returns true if event should run, otherwise returns false.
    protected shouldEventRun(shouldStartFunction:() => boolean, gameController:GameController){
        if(!gameController.game.isRunning) return;
        
        if (!shouldStartFunction()){
            if(this.hasEventStarted){
                this.onEnd.invoke(gameController);
            }
            this.hasEventStarted = false;
            return false;
        };
        
        if(!this.hasEventStarted){
            this.onStart.invoke(gameController);
        }
        
        this.hasEventStarted = true;
        return true;
    }

    addOnEnd(func:EventFunction<GameController>){
        this.onEnd.addEvent(func);
        return this;
    }

    addOnStart(func:EventFunction<GameController>){
        this.onStart.addEvent(func);
        return this;
    }
    
}

/*
    //example of how it should look at the end
    new SomeSchedulerEvent(score => score > 4)
        .registerEvent(gameController => {
            //event content here
        })
        .onEnd(gameController => {
            clg("event has ended")
        })
        .onStart(gameController => {
            clg("event has started")
        })
        .compose();
*/