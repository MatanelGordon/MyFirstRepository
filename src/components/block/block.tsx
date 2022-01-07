import * as React from "react";
import Config from "../../config";
import { Position } from "../../models/position";
import { HTMLAttributes } from "react";

export interface BlockProps extends Position, HTMLAttributes<HTMLDivElement> {}

const Size = 100 / Config.gridSize;

export function Block({ x, y, className, ...rest }: BlockProps): JSX.Element {
    const style: React.CSSProperties = {
        width: `${Size}%`,
        height: `${Size}%`,
        transform: `translate(${x * 100}%, ${y * 100}%)`,
    };

    return (
        <div
            {...rest}
            style={style}
            className={`block ${className ?? ""}`}
        ></div>
    );
}
