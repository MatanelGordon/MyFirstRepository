import "./scss/index.scss";
import * as React from "react";
import { GameFrame } from "./components/game-frame";
import { render } from "react-dom";

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
