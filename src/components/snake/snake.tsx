import * as React from "react";
import { Position } from "../../models/position";
import { SnakeBlock } from "../block/";
import { useSnake } from "../../hooks";


export default function Snake() {
    const {body} = useSnake();
    return (<>
        {body.map((block:Position, i:number) =>
            <SnakeBlock {...block} key={i}></SnakeBlock>
        )}
    </>)
}
