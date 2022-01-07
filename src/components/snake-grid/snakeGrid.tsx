import * as React from "react";
import { useEntities } from "../../hooks/useEntities";
import { Position } from "../../models/position";
import { Snake } from "../snake";
import { GameBlock } from "../block/gameBlock";
import { Modal } from "../modal";
import { useHasLostStatus } from "../../hooks/useHasLostStatus";
import { useIsRunningStatus } from "../../hooks/useIsRunningStatus";
import { useScore } from "../../hooks/useScore";
import { ObsticleBlock } from "../block";
import { useObstacles } from "../../hooks/useObstacles";
import { useGrid } from "../../hooks/useGrid";
import { useDirection } from "../../hooks";


export default function snakeGrid() {
	const entities = useEntities();
	const obstacles = useObstacles();
	const hasLost = useHasLostStatus();
	const isRunning = useIsRunningStatus();
	const grid = useGrid();
	const score = useScore();
	const direction = useDirection();

	return (
		<div
			className={`
                snake-grid 
                ${`snake-direction-${direction?.name}`} 
                ${grid.shouldGoThroughWalls ? "can-go-through-walls" : ""}
            `.trim()}
		>
			<Snake></Snake>
			{entities.map((entity: Position, i: number) => (
				<GameBlock {...entity} key={i}></GameBlock>
			))}
			{obstacles.map((obstacle: Position, i: number) => (
				<ObsticleBlock {...obstacle} key={i} />
			))}

			<Modal show={!isRunning} className="lost-modal">
				{hasLost && `score: ${score}`}
				<br />
				Press any arrow button to continue
			</Modal>
		</div>
	);
}
