import * as React from "react";
import { Block, BlockProps } from "./block";

export default function SnakeBlock(props: BlockProps) {
    return <Block {...props} className="block snake-block"></Block>;
}
