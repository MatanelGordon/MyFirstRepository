import * as React from "react";
import { render } from "react-dom";
import "./scss/index.scss";
import { GameFrame } from "./components/game-frame";

function App() {
    return (
        <>
            <div className="title-section">
                <div className="title-wrapper">
                    <h1>THE SIMPLE SNAKE GAME</h1>
                </div>
            </div>
            <GameFrame></GameFrame>
        </>
    );
}

render(<App></App>, document.querySelector("#root"));
