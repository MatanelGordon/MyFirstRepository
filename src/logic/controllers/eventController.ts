export type EventFunction<Tin, Tout = void | Promise<void>> = (value:Tin) => Tout;

export class EventController<Tin, Tout = void | Promise<void>>{
    protected functions: EventFunction<Tin, Tout>[];
    constructor(){
        this.functions = [];
    }
    invoke(value:Tin){
        this.functions.forEach(func => {
            func(value);
        })
    }
    addEvent(func:EventFunction<Tin,Tout>):number{
        this.functions.push(func);
        return this.functions.length - 1;
    }
}

export default EventController;