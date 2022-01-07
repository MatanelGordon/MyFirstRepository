import { useState, useEffect } from "react";
import { Position } from "../models/position";
import { Grid } from "../models";
import { useGame } from "./useGame";
export function useEntities(){
    const gameController = useGame();
    const [entities, setEntities] = useState(gameController.game.grid.entities)
    
    useEffect(() => {
        gameController.gridController.onEntitiesChange.addEvent((new_entities:Position[]) => {
            setEntities(new_entities);
        });

        gameController.gridController.onGridChange.addEvent((grid:Grid) => {
            setEntities(grid.entities);
        });
    },[])

    return entities;
}