export type EventFunction<Tin, Tout = void | Promise<void>> = (evt:Tin) => Tout;

export class EventController<Tin, Tout = void | Promise<void>>{
    protected functions: EventFunction<Tin, Tout>[];
    constructor(){
        this.functions = [];
    }
    invoke(evt:Tin){
        this.functions.forEach(func => {
            func(evt);
        })
    }
    addEvent(func:EventFunction<Tin,Tout>):number{
        this.functions.push(func);
        return this.functions.length - 1;
    }
}

export default EventController;