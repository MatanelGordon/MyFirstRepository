import * as React from "react";
import Button from "@mui/material/Button";
import { Switch } from "@mui/material";
import { useDarkMode, useGameSettings, useScore } from "../../hooks";
import { useCallback } from "react";
import { SnakeGrid } from "../snake-grid";


export default function GameFrame() {
    const { resetGame } = useGameSettings();
    const score = useScore();
    const [darkMode, setDarkMode] = useDarkMode();
    const onSwitchChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setDarkMode(evt.target.checked);
        },
        [darkMode]
    );
    

    return (
        <div className="game-frame container">
            <SnakeGrid></SnakeGrid>

            <div className="game-sub-bar">
                <div className="score-text">score : {score}</div>
                <div>
                    <Switch
                        onChange={onSwitchChange}
                        checked={darkMode}
                        aria-label="dark mode"
                    />
                     <Button variant="outlined" onClick={resetGame}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
