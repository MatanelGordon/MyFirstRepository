import { useEffect, useState } from "react";
import { useGame } from "./useGame";

export function useHasLostStatus() {
	const gameController = useGame();
	const [hasLost, setHasLost] = useState<boolean>(false);

	useEffect(() => {
		gameController.onUpdate.addEvent((game) => {
			setHasLost(game.hasLost);
		});
	}, []);

	return hasLost;
}
