import { useContext } from "react";
import { gameControllerContext } from "../context/gameControllerContext";
import { GameController } from "../logic/controllers";

export const useGame = ():GameController => useContext<GameController>(gameControllerContext);
