import * as React from 'react';
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const darkModeContext =
	createContext<[boolean, Dispatch<SetStateAction<boolean> | undefined>]>(null);

export const DarkModeContextProvider: React.FC = (props) => {
	const [isDarkMode, setisDarkMode] = useState(false);
	return <darkModeContext.Provider value={[isDarkMode, setisDarkMode]}>{props.children}</darkModeContext.Provider>;
};
