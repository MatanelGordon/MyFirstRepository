import * as React from "react";
import { render } from "react-dom";
import "./scss/index.scss";
import { GameFrame } from "./components/game-frame";
import { MainProvider } from "./context/mainProvider";

function App() {
	return (
		<React.StrictMode>
			<MainProvider>
					<div className="title-section">
						<div className="title-wrapper">
							<h1>THE SIMPLE SNAKE GAME</h1>
						</div>
					</div>
					<GameFrame></GameFrame>
			</MainProvider>
		</React.StrictMode>
	);
}

render(<App></App>, document.querySelector("#root"));
