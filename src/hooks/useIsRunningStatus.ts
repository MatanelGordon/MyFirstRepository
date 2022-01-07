import { useEffect, useState } from "react";
import { useGame } from "./useGame";

export function useIsRunningStatus() {
	const gameController = useGame();
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
        gameController.game.isRunning = isRunning;
    },[isRunning])
	
	useEffect(() => {
		gameController.onUpdate.addEvent((game) => {
			setIsRunning(game.isRunning);
		});
	}, []);

	return isRunning;
}
