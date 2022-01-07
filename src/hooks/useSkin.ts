import { useContext } from "react";
import { skinContext, SkinReducer } from "../context/skinContext";

export const useSkin:() => SkinReducer = () => useContext(skinContext);