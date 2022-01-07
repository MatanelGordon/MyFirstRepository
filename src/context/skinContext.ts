import { createContext, Reducer } from "react";

export interface SkinContextProps {
	className: string;
	name: string;
}

export interface SkinContextReducerAction {
	name: string;
}

export type SkinReducer = Reducer<SkinContextProps, SkinContextReducerAction>;

export const skinContext = createContext<SkinReducer>(null);
