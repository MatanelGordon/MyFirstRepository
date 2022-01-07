import * as React from "react";
import { PropsWithChildren, HTMLAttributes } from "react";

export interface ModalProps extends HTMLAttributes<Element> {
    show: boolean;
}

export default function Modal({show,...props}: PropsWithChildren<ModalProps>) {
    return (
        <>
            {show && (
                <div {...props} className={`modal ${props?.className ?? ""}`}>
                    <div className="modal-bg"></div>
                    <div className="modal-text">
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}
