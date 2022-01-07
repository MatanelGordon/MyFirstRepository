import { useState, useEffect } from "react";
import { useGame } from "./useGame";

export function useScore():number{
    const gameController = useGame();
    const [score, setScore] = useState<number>(gameController.game.score);
    useEffect(() => {
        gameController.onScoreChange.addEvent(newScore => {
            setScore(newScore);
        })
    }, []);
    return score;
}