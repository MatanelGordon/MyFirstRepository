import * as React from "react";
import { Block, BlockProps } from "./block";

export function GameBlock(props: BlockProps) {
    return <Block {...props} className="block game-block"></Block>;
}

export default GameBlock;
