import { createContext, useContext } from "react";
import { GameController } from "../logic/controllers/gameController";
import { getGame } from "../services";

const gameController = getGame();
export const gameControllerContext = createContext<GameController>(gameController);
