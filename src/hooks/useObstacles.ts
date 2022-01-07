import { useEffect, useState } from "react";
import { Game, Grid, Position } from "../models";
import { useGame } from "./useGame";

export function useObstacles() {
    const gameController = useGame();
    const [obstacles, setObstacles] = useState<Position[]>(gameController.game.grid.obstacles);

    useEffect(() => {
        gameController.onUpdate.addEvent((newGame: Game) => {
            setObstacles([...newGame.grid.obstacles]);
        });

        gameController.gridController.onGridChange.addEvent((grid:Grid) => {
            setObstacles([...grid.obstacles]);
        });

    }, []);

    return obstacles;
}
