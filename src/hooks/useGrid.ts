import { useEffect, useState } from "react";
import { useGame } from "./useGame";

export function useGrid(){
    const gameController = useGame();
    const grid = gameController.game.grid;
    const gridController = gameController.gridController;
    const [shouldGoThroughWalls, setShouldGoThroughWalls] = useState(grid.shouldGoThroughWalls);
    
    useEffect(() => {
        gridController.onGridChange.addEvent(newGrid => {
            setShouldGoThroughWalls(newGrid.shouldGoThroughWalls);
        })
    }, [])

    return {shouldGoThroughWalls};
}