import { GameController } from "../logic/controllers";
import { createGame } from "../logic/factories";

const gameController:GameController = createGame();
export const getGame = () => gameController;
