import * as React from "react";
import { JSXElementConstructor, PropsWithChildren } from "react";

type ComponentWithChildren<T = {}> = JSXElementConstructor<PropsWithChildren<T>>;

export interface GlobalProviderProps {
	providers: ComponentWithChildren[];
}

export const ProviderUniter: React.FC<PropsWithChildren<GlobalProviderProps>> = (props) => {
	const { providers } = props;

	const Provider = providers.reduce(
		(Acc: ComponentWithChildren, Curr: ComponentWithChildren): ComponentWithChildren =>
			({ children }) =>
				(
					<Acc>
						<Curr>{children}</Curr>
					</Acc>
				)
	);

	return <Provider>{props.children}</Provider>
};
