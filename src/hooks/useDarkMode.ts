import { useState, useEffect } from "react";

const LOCALSTORAGE_VALUE = "dark";
const LOCALSTORAGE_KEY = "colorMode";
const PREFER_DARK_QUERY = "(prefers-color-scheme: dark)";
export function useDarkMode(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		if (window.localStorage.getItem(LOCALSTORAGE_KEY)) {
			return window.localStorage.getItem(LOCALSTORAGE_KEY) === LOCALSTORAGE_VALUE;
		} else {
			return window.matchMedia(PREFER_DARK_QUERY).matches;
		}
	});

	useEffect(() => {
		console.log(`isDarkMode: ${isDarkMode}`);
		setTimeout(() => {
			document.body.classList.add("dark-mode-transitionable");
		}, 200);
	}, []);

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("isDarkMode");
			window.localStorage.setItem(LOCALSTORAGE_KEY, LOCALSTORAGE_VALUE);
		} else {
			document.body.classList.remove("isDarkMode");
			window.localStorage.setItem(LOCALSTORAGE_KEY, `not-${LOCALSTORAGE_VALUE}`);
		}
	}, [isDarkMode]);
	return [isDarkMode, setIsDarkMode];
}
