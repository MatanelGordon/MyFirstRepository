import { createContext, useContext } from "react";
import { GameController } from "../logic/controllers/gameController";
import {createGame} from "../logic/factories/gameControllerFactory"

const gameController = createGame();
export const gameControllerContext = createContext<GameController>(gameController);
export const GameContextProvider = gameControllerContext.Provider;

export default GameContextProvider;